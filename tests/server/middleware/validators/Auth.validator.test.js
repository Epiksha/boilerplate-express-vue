const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../../../config/server');
const { DATABASE_URL } = require('../../../../config');
const User = require('../../../../models/User.model');
const { AuthValidator } = require('../../../../middleware/validators');

describe('Auth Request Validators', () => {
    test('setTokenResponseError()', () => {
        const errorOne = AuthValidator.setTokenResponseError('jwt expired');
        const errorTwo = AuthValidator.setTokenResponseError('random token error');

        expect(errorOne).toBe('Token has expired.');
        expect(errorTwo).toBe('Invalid token.');
    });

    describe('validateLogin()', () => {
        test('Correct request body passes', () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
            
            const response = {
                status(statusCode) {
                    status = statusCode;
                },
                send(data) {
                    data = data;
                },
            };

            AuthValidator.validateLogin(request, response, () => {});

            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('No request body fails', () => {
            const request = {};
    
            let status;
            let data;
            
            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };

            AuthValidator.validateLogin(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });

        test('Invalid email in request body fails', () => {
            const request = {
                body: {
                    email: 'test',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
            
            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };

            AuthValidator.validateLogin(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.email).toBeTruthy();
        });

        test('Invalid password in request body fails', () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    password: 'hey',
                },
            };
    
            let status;
            let data;
            
            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };

            AuthValidator.validateLogin(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.password).toBeTruthy();
        });
    });
    
    describe('validateToken()', () => {
        beforeEach(done => {
            mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => done());
        });
        
        afterEach(done => {
            mongoose.connection.db.dropDatabase(() => {
                mongoose.connection.close(() => done());
            });
        });

        test('Valid token passes', async () => {
            const userData = {
                email: 'test@test.com',
                first_name: 'Jonathan',
                last_name: 'Smithson',
                password: 'hello123',
            };
        
            const user = await supertest(createServer())
                .post('/api/users')
                .send(userData)
                .expect(201)
                .then(async (response) => {
                    expect(response.body.id).toBeTruthy();
                    
                    const user = await User.findOne({ _id: response.body.id });
                    expect(response.body.email).toBe(user.email);
                    expect(response.body.first_name).toBe(user.first_name);
                    expect(response.body.last_name).toBe(user.last_name);
                    expect(response.body.full_name).toBe(`${user.first_name} ${user.last_name}`);
        
                    expect(user).toBeTruthy();

                    return response.body;
                });

            const request = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            let status;
            let data;

            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            await AuthValidator.validateToken(request, response, () => {});

            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('Invalid token fails', async () => {
            const request = {
                headers: { Authorization: 'Bearer asdfagfasfasf32432423asdfsaf' },
            };

            let status;
            let data;

            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            await AuthValidator.validateToken(request, response, () => {});

            expect(status).toBe(401);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.length).toBeTruthy();
        });
        
        test('No token fails', async () => {
            const request = {};

            let status;
            let data;

            const response = {
                status(statusCode) {
                    status = statusCode;

                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            await AuthValidator.validateToken(request, response, () => {});

            expect(status).toBe(401);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.length).toBeTruthy();
        });
    });
});