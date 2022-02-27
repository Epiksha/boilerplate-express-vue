const UserService = require('../services/User.service');

class UserController {
    async createUser(request, response) {
        const payload = await UserService.createUser(request);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }
    
    async deleteUser(request, response) {
        const payload = await UserService.deleteUser(request.params.id);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }

    async getAllUsers(request, response) {
        const payload = await UserService.getAllUsers();

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }

    async getUser(request, response) {
        const payload = await UserService.getUser(request.params.id);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }
    
    async updateUser(request, response) {
        const payload = await UserService.updateUser(request);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }
}

module.exports = new UserController;