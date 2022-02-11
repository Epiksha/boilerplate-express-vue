const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.model');
const { JWT_SECRET } = require('../config');

class AuthService {
    constructor() {
        this.passwordExpiry = '2 minutes';
    }

    async login(request) {
        const responseBody = {};

        try {
            const user = await UserModel.findOne({ email: request.body.email });

            if (!user) {
                responseBody.statusCode = 422;
                responseBody.errors = {
                    default: ['Invalid credentials.'],
                };

                return responseBody;
            }

            const isPasswordCorrect = await bcrypt.compare(request.body.password, user.password);

            if (!isPasswordCorrect) {
                responseBody.statusCode = 422;
                responseBody.errors = {
                    default: ['Invalid credentials.'],
                };

                return responseBody;
            }

            const token = jwt.sign(
                { user_id: user._id, email: request.body.email },
                JWT_SECRET,
                { expiresIn: this.passwordExpiry }
            );
        
            user.token = token;

            responseBody.statusCode = 200;
            responseBody.data = {
                email: user.email,
                first_name: user.first_name,
                full_name: user.full_name,
                last_name: user.last_name,
                token: user.token
            };
        } catch (error) {
            console.error(error);
            responseBody.statusCode = 500;
            responseBody.errors = {
                default: ['There was an issue connecting to the server. Please wait a moment and try again.'],
            };
        }

        return responseBody;
    }
    
    async validate(request) {
        const responseBody = {};

        try {
            responseBody.message = 'Token is valid.';
            responseBody.statusCodeCode = 200;
            responseBody.data = {
                token: request.user.token,
            };
        } catch (error) {
            console.error(error.details);
            responseBody.message = 'The server encountered an error.';
            responseBody.statusCodeCode = 500;
        }

        return responseBody;
    }
}

module.exports = new AuthService;