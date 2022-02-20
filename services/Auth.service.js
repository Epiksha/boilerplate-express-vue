const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.model');
const { JWT_SECRET } = require('../config');

class AuthService {
    constructor() {
        this.passwordExpiry = '2 minutes';
    }

    async login(request, isTest = false) {
        const responseBody = {};

        try {
            if (isTest) {
                throw new Error('Testing error handling.');
            }

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

            const token = this.signToken(user._id, request.body.email);
        
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

    signToken(user_id, email) {
        return jwt.sign(
            { user_id, email },
            JWT_SECRET,
            { expiresIn: this.passwordExpiry }
        );
    }
    
    async validate(request, isTest = false) {
        const responseBody = {};

        try {
            if (isTest) {
                throw new Error('Testing error handling.');
            }

            responseBody.statusCode = 200;
            responseBody.data = {
                token: request.user.token,
            };
        } catch (error) {
            console.error(error.details);
            responseBody.statusCode = 500;
            responseBody.errors = {
                default: ['There was an issue connecting to the server. Please wait a moment and try again.'],
            };
        }

        return responseBody;
    }
}

module.exports = new AuthService;