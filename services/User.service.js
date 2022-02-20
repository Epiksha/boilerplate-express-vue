const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const User = require('../models/User.model');

class UserService {
    async createUser(request) {
        const responseBody = {};
        const full_name = `${request.body.first_name} ${request.body.last_name}`;
        const userData = {...request.body, full_name};

        try {
            const isUserFound = await User.findOne({ 'email': request.body.email });

            if (isUserFound) {
                responseBody.statusCode = 409;
                responseBody.data = {
                    errors: { default: 'There was an error creating user. Please try again.' },
                };
                
                return responseBody;
            }

            const encryptedPassword = await this.encryptPassword(request.body.password);
            userData.password = encryptedPassword;

            const user = await User.create(userData);
            const token = this.signToken(user._id, request.body.email);
            
            user.token = token;

            responseBody.statusCode = 201;
            responseBody.data = {
                email: user.email,
                first_name: user.first_name,
                full_name: user.full_name,
                id: user._id,
                last_name: user.last_name,
                token: user.token,
            };
        } catch (error) {
            console.error(error);

            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: 'There was an error creating user. Please try again.' },
            };
        }

        return responseBody;
    }

    async encryptPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    signToken(id, email) {
        return jwt.sign(
            { user_id: id, email: email },
            JWT_SECRET,
            { expiresIn: '2 minutes' }
        );
    }

    async deleteUser(id) {
        const responseBody = {};

        try {
            const isUserFound = await User.findById(id);

            if (!isUserFound) {
                responseBody.message = 'Could not find user to delete';
                responseBody.statusCode = 404;
                return responseBody;
            }

            await User.deleteOne({ _id: id });

            responseBody.message = 'Successfully deleted user.';
            responseBody.statusCode = 200;
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }
    
    async getAllUsers() {
        const responseBody = {};

        try {
            const result = await User.find();
    
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);

            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: 'There was an error getting users. Please try again.' },
            };
        }

        return responseBody;
    }

    async getUser(id) {
        const responseBody = {};

        try {
            const result = await User.findById(id);
    
            if (!result) {
                responseBody.statusCode = 404;
                responseBody.data = {
                    errors: { default: 'Could not get user information. Please try again.' },
                };

                return responseBody;
            }
           
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);

            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: 'Could not get user information. Please try again.' },
            };
        }

        return responseBody;
    }
    
    async updateUser(request) {
        const responseBody = {};

        try {
            const isUserFound = await User.findById(request.params.id);

            if (!isUserFound) {
                responseBody.statusCode = 404;
                responseBody.data = {
                    errors: { default:  'Could not find a user with the provided id.' },
                };

                return responseBody;
            }

            const result = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });

            if (!result) {
                responseBody.statusCode = 500;
                responseBody.data = {
                    errors: { default: 'Could not update user information. Please try again.' },
                };

                return responseBody;
            }
           
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);

            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: 'Could not update user information. Please try again.' },
            };
        }

        return responseBody;
    }
}

module.exports = new UserService;