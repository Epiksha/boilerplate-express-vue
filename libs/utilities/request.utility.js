const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../config');

module.exports = {
    extractToken(request) {
        let foundToken = request?.body?.token || request?.query?.token || request.headers?.["x-access-token"];

        if (foundToken) {
            return foundToken;
        }

        if (request.headers?.authorization && request.headers?.authorization?.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        }
        
        if (request.headers?.Authorization && request.headers?.Authorization?.split(' ')[0] === 'Bearer') {
            return request.headers.Authorization.split(' ')[1];
        }

        return null;
    },

    setJoiErrors(error, responseErrors) {
        error.details.forEach(({ message }) => {
            if (message.toLowerCase().indexOf('email') > -1) {
                if (!responseErrors.email) {
                    responseErrors.email = [];
                }

                responseErrors.email.push(message);
            } else if (message.toLowerCase().indexOf('password') > -1) {
                if (!responseErrors.password) {
                    responseErrors.password = [];
                }

                responseErrors.password.push(message);
            } else if (message.toLowerCase().indexOf('last_name') > -1) {
                if (!responseErrors.last_name) {
                    responseErrors.last_name = [];
                }

                responseErrors.last_name.push(message);
            } else if (message.toLowerCase().indexOf('first_name') > -1) {
                if (!responseErrors.first_name) {
                    responseErrors.first_name = [];
                }

                responseErrors.first_name.push(message);
            } else {
                if (!responseErrors.default) {
                    responseErrors.default = [];
                }

                responseErrors.default.push(message);
            }
        });
    },

    signToken(id, email) {
        return jwt.sign(
            { user_id: id, email: email },
            JWT_SECRET,
            { expiresIn: '2 minutes' }
        );
    },
};