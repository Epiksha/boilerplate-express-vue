module.exports = {
    extractToken(request) {
        let foundToken = request?.body?.token || request?.query?.token || request.headers?.["x-access-token"];

        if (foundToken) {
            return foundToken;
        }

        if (request.headers?.authorization && request.headers?.authorization?.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        }

        return null;
    },
};