const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.model');
const { JWT_SECRET } = require('../config');

class AuthService {
    async login(requestBody) {
        const responseBody = {};

        try {
            const user = await UserModel.findOne({ email: requestBody.email });

            if (!user) {
                responseBody.message = 'Could not create token.';
                responseBody.statusCode = 422;

                return responseBody;
            }

            if (user && (await bcrypt.compare(requestBody.password, user.password))) {
                const token = jwt.sign(
                    { user_id: user._id, email: requestBody.email },
                    JWT_SECRET,
                    { expiresIn: "2 minutes" }
                );
          
                user.token = token;
            }

            responseBody.message = 'Successfully created token.';
            responseBody.statusCode = 200;
            responseBody.data = {
                token: user.token
            };
        } catch (error) {
            console.error(error);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }
    
    async validate(request) {
        const responseBody = {};

        try {
            responseBody.message = 'Token is valid.';
            responseBody.statusCode = 200;
            responseBody.data = {
                token: request.user.token,
            };
        } catch (error) {
            console.error(error.details);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCode = 500;
        }

        return responseBody;
    }
}

module.exports = new AuthService;