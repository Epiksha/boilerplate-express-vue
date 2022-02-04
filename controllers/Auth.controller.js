const AuthService = require('../services/Auth.service');

class AuthController {
    async createToken(request, response) {
        const payload = await AuthService.login(request);

        response.status(payload.statusCode).send(payload);
    }

    async validate(request, response) {
        const payload = await AuthService.validate(request, response);

        response.status(payload.statusCode).send(payload);
    }
}

module.exports = new AuthController;