const AuthService = require('../services/Auth.service');

class AuthController {
    async createToken(request, response) {
        const responseBody = await AuthService.login(request.body);

        response.status(responseBody.statusCode).json(responseBody);
    }

    async validate(request, response) {
        const responseBody = await AuthService.validate(request);

        response.status(responseBody.statusCode).json(responseBody);
    }
}

module.exports = new AuthController;