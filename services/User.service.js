const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const { request: requestUtility } = require('../libs/utilities');
const mongoose = require('mongoose');

class UserService {
    async createUser(request) {
        const responseBody = {};
        
        try {
            if (!mongoose.connection.readyState) {
                throw new Error();
            }
            
            if (!request.body) {
                responseBody.statusCode = 422;
                responseBody.data = {
                    errors: {  default: ['No data sent with request.'] },
                };
    
                return responseBody;
            }
    
            const full_name = `${request.body.first_name} ${request.body.last_name}`;
            const userData = {...request.body, full_name};

            const isUserFound = await User.findOne({ 'email': request.body.email });

            if (isUserFound) {
                responseBody.statusCode = 409;
                responseBody.data = {
                    errors: { default: ['There was an error creating user. Please try again.'] },
                };
                
                return responseBody;
            }

            const encryptedPassword = await this.encryptPassword(request.body.password);
            userData.password = encryptedPassword;

            const user = await User.create(userData);
            const token = requestUtility.signToken(user._id, request.body.email);
            
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
            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: ['There was an error creating user. Please try again.'] },
            };
        } finally {
            return responseBody;
        }
    }

    async encryptPassword(password) {
        if (!password) {
            throw new Error('No password provided.');
        }

        return await bcrypt.hash(password, 10);
    }

    async deleteUser(id) {
        const responseBody = {};

        try {
            const isUserFound = await User.findById(id);

            if (!isUserFound) {
                responseBody.statusCode = 404;
                responseBody.data = {
                    errors: { default: ['Could not find user to delete.'] },
                };

                return responseBody;
            }

            await User.deleteOne({ _id: id });

            responseBody.statusCode = 200;
            responseBody.data = {
                message: 'Successfully deleted user.',
            };
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: ['The server encountered an error.'] },
            };
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
            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: ['There was an error getting users. Please try again.'] },
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
                    errors: { default: ['Could not get user information. Please try again.'] },
                };

                return responseBody;
            }
           
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: ['Could not get user information. Please try again.'] },
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
                    errors: { default: ['Could not find a user with the provided id.'] },
                };

                return responseBody;
            }

            const result = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });

            if (!result) {
                responseBody.statusCode = 500;
                responseBody.data = {
                    errors: { default: ['Could not update user information. Please try again.'] },
                };

                return responseBody;
            }
           
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.data = {
                errors: { default: ['Could not update user information. Please try again.'] },
            };
        }

        return responseBody;
    }
}

module.exports = new UserService;