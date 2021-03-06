const AuthService = require('../services/Auth.service');

class AuthController {
    async createToken(request, response) {
        const payload = await AuthService.login(request);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }

    async validate(request, response) {
        const payload = await AuthService.validate(request);

        response.status(payload.statusCode).send(payload.data || payload.errors);
    }
}

module.exports = new AuthController;