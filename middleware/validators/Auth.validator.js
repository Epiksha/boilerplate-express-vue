const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../config');
const utilities = require('../../libs/utilities');

const loginSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(5).max(40).required(),
});

class AuthValidator {
    validateLogin(request, response, next) {
        const { error } = loginSchema.validate(request.body);

        if (error) {
            response.status(422).send({
                message: error.details.map(({ message }) => message),
                data: request.body,
            });
        }

        next();
    }

    async validateToken(request, response, next) {
        const token = utilities.request.extractToken(request);

        if (!token) {
            response.status(401).send({
                data: request.body,
                message: 'No token passed in with request.',
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            request.user = decoded;

            next();
        } catch (error) {
            let message;

            if (error.message === 'jwt expired') {
                message = 'Token has expired.';
            } else {
                message = 'Invalid token.'
            }

            response.status(401).send({
                data: request.body,
                message,
            });
        }
    }
}

module.exports = new AuthValidator;