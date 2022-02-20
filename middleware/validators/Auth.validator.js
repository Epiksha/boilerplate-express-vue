const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../config');
const { request: requestUtility } = require('../../libs/utilities');

const loginSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(5).max(40).required(),
});

class AuthValidator {
    validateLogin(request, response, next) {
        if (!request.body) {
            const responseBody = {
                errors: { default: 'No data passed in with the body of the request' },
            };

            response.status(422).send(responseBody);
        }
        
        const { error } = loginSchema.validate(request.body);

        if (error) {
            const responseBody = {
                errors: {},
            };

            requestUtility.setJoiErrors(error, responseBody.errors);

            response.status(422).send(responseBody);
        }

        next();
    }

    async validateToken(request, response, next) {
        const token = requestUtility.extractToken(request);

        if (!token) {
            response.status(401).send({
                errors: [{ default: 'No token passed in with request.' }],
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            request.user = decoded;

            next();
        } catch (error) {
            const message = this.setTokenResponseError(error.message);

            response.status(401).send({
                errors: [{ default: message }],
            });
        }
    }

    setTokenResponseError(message) {
        return message === 'jwt expired' ? 'Token has expired.' : 'Invalid token.';
    }
}

module.exports = new AuthValidator;