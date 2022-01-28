const UserModel = require('../models/User.model');

class UserService {
    async createUser(requestBody) {
        const responseBody = {};

        const full_name = `${requestBody.first_name} ${requestBody.last_name}`;
        const userData = {...requestBody, full_name};

        try {
            const isUserFound = await UserModel.findOne({ 'email': requestBody.email });

            if (isUserFound) {
                responseBody.message = 'Could not create new account.';
                responseBody.statusCode = 409;
                return responseBody;
            }

            const result = await UserModel.create(userData);

            responseBody.message = 'Successfully created user.';
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }

    async deleteUser(id) {
        const responseBody = {};

        try {
            const isUserFound = await UserModel.findOne({ '_id': id });

            if (!isUserFound) {
                responseBody.message = 'Could not find user to delete';
                responseBody.statusCode = 404;
                return responseBody;
            }

            await UserModel.deleteOne({ _id: id });

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
            const result = await UserModel.find();
    
            responseBody.message = 'Successfully queried all users.';
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }

    async getUser(id) {
        const responseBody = {};

        try {
            const result = await UserModel.findById(id);
    
            if (!result) {
                responseBody.message = 'Could not find user with provided id.';
                responseBody.statusCode = 404;

                return responseBody;
            }
           
            responseBody.message = 'Successfully found user.';
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }
    
    async updateUser(id, info) {
        const responseBody = {};

        try {
            const isUserFound = await UserModel.findOne({ '_id': id });

            if (!isUserFound) {
                responseBody.message = 'Could not find a user with the given id.';
                responseBody.statusCode = 404;
                return responseBody;
            }

            const result = await UserModel.findByIdAndUpdate(id, info);
    
            if (!result) {
                responseBody.message = 'Could not find user with provided id.';
                responseBody.statusCode = 404;

                return responseBody;
            }
           
            responseBody.message = 'Successfully updated user.';
            responseBody.statusCode = 200;
            responseBody.data = result;
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }
}

module.exports = new UserService;