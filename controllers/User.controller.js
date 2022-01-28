const UserService = require('../services/User.service');

class UserController {
    async createUser(request, response) {
        const responseBody = await UserService.createUser(request.body);

        response.status(201).json(responseBody);
    }
    
    async deleteUser(request, response) {
        const { id } = request.params;

        const responseBody = await UserService.deleteUser(id);

        response.status(responseBody.statusCode).json(responseBody);
    }

    async getAllUsers(request, response) {
        const responseBody = await UserService.getAllUsers();

        response.status(responseBody.statusCode).json(responseBody);
    }

    async getUser(request, response) {
        const { id } = request.params;

        try {
            const responseBody = await UserService.getUser(id);

            response.status(responseBody.statusCode).json(responseBody);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Server encountered an error looking up user' });
        }
    }
    
    async updateUser(request, response) {
        const { id } = request.params;

        const responseBody = await UserService.updateUser(id, request.body);

        response.status(responseBody.statusCode).json(responseBody);
    }
}

module.exports = new UserController;