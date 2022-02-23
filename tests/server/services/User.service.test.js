const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../../config/server');
const { DATABASE_URL } = require('../../../config');
const User = require('../../../models/User.model');
const UserService = require('../../../services/User.service');

describe('UserService', () => {
    beforeEach(done => {
        mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => done());
    });
    
    afterEach(done => {
        if (!mongoose.connection.readyState) {
            done();
        } else {
            mongoose.connection.db.dropDatabase(() => {
                mongoose.connection.close(() => done());
            });
        }
    });

    it('encryptPassword', () => {
        const token = UserService.encryptPassword('helloworld');

        expect(token).toBeTruthy();
    });

    describe('createUser', () => {
        it('Succeeds if correct data passed in', async () => {
            const request = {
                body: {
                    first_name: 'Jonathan',
                    last_name: 'Smithson',
                    email: 'test@test.com',
                    password: 'helloworld',
                },
            };

            const response = await UserService.createUser(request);

            expect(response.statusCode).toBe(201);
            expect(response.data).toBeTruthy();
            expect(response.data.email).toBeTruthy();
            expect(response.data.first_name).toBeTruthy();
            expect(response.data.full_name).toBeTruthy();
            expect(response.data.last_name).toBeTruthy();
            expect(response.data.token).toBeTruthy();
        });

        it('Reaches catch if server error', async () => {
            await new Promise(resolve => {
                mongoose.connection.db.dropDatabase(() => {
                    mongoose.connection.close(() => resolve());
                });
            });

            const request = {
                body: {
                    first_name: 'Jonathan',
                    last_name: 'Smithson',
                    email: 'test@test.com',
                    password: 'helloworld',
                },
            };

            const response = await UserService.createUser(request);

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toStrictEqual({
                errors: { default: ['There was an error creating user. Please try again.'] },
            });
        });
        
        it('Fails if user not passed in', async () => {
            const response = await UserService.createUser({});

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(422);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['No data sent with request.']);
        });
    });

    describe('deleteUser', () => {
        it('Succeeds if correct data passed in', async () => {
            const data = {
                first_name: 'Jonathan',
                last_name: 'Smithson',
                email: 'test@test.com',
                password: 'helloworld',
            };

            const user = await supertest(createServer())
                .post('/api/users')
                .send(data)
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

            const response = await UserService.deleteUser(user.id);

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.message).toBeTruthy();
            expect(response.data.message).toBe('Successfully deleted user.');
        });
        
        it('Returns 500 if user not found', async () => {
            const response = await UserService.deleteUser('teststring');

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['The server encountered an error.']);
        });
        
        it('Reaches catch block if cannot connect to database.', async () => {
            await new Promise(resolve => {
                mongoose.connection.db.dropDatabase(() => {
                    mongoose.connection.close(() => resolve());
                });
            });
            
            const response = await UserService.deleteUser('teststring');

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['The server encountered an error.']);
        });
    });
    
    describe('getAllUsers', () => {
        it('Succeeds if database connected', async () => {
            const response = await UserService.getAllUsers();

            expect(response.statusCode).toBe(200);
            expect(response.data).toBeTruthy();
        });
        
        it('Reaches catch block if cannot connect to database.', async () => {
            await new Promise(resolve => {
                mongoose.connection.db.dropDatabase(() => {
                    mongoose.connection.close(() => resolve());
                });
            });

            const response = await UserService.getAllUsers();

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['There was an error getting users. Please try again.']);
        });
    });

    describe('getUser', () => {
        it('Succeeds if correct data passed in', async () => {
            const data = {
                first_name: 'Jonathan',
                last_name: 'Smithson',
                email: 'test@test.com',
                password: 'helloworld',
            };

            const user = await supertest(createServer())
                .post('/api/users')
                .send(data)
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

            const response = await UserService.getUser(user.id);

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.email).toBeTruthy();
            expect(response.data.first_name).toBeTruthy();
            expect(response.data.last_name).toBeTruthy();
            expect(response.data.full_name).toBeTruthy();
            expect(response.data.id).toBeTruthy();
        });
        
        it('Returns 500 if user not found', async () => {
            const response = await UserService.getUser('teststring');

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['Could not get user information. Please try again.']);
        });
        
        it('Reaches catch block if cannot connect to database.', async () => {
            await new Promise(resolve => {
                mongoose.connection.db.dropDatabase(() => {
                    mongoose.connection.close(() => resolve());
                });
            });
            
            const response = await UserService.getUser('teststring');

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['Could not get user information. Please try again.']);
        });
    });
    
    describe('updateUser', () => {
        it('Succeeds if correct data passed in', async () => {
            const data = {
                first_name: 'Jonathan',
                last_name: 'Smithson',
                email: 'test@test.com',
                password: 'helloworld',
            };

            const user = await supertest(createServer())
                .post('/api/users')
                .send(data)
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

            const response = await UserService.updateUser({
                body: {
                    email: 'test2@test.com',
                },
                params: {
                    id: user.id,
                },
            });

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.email).toBeTruthy();
            expect(response.data.first_name).toBeTruthy();
            expect(response.data.last_name).toBeTruthy();
            expect(response.data.full_name).toBeTruthy();
            expect(response.data.id).toBeTruthy();
        });
        
        it('Returns 500 if user not found', async () => {
            const response = await UserService.updateUser('teststring');

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['Could not update user information. Please try again.']);
        });
        
        it('Reaches catch block if cannot connect to database.', async () => {
            await new Promise(resolve => {
                mongoose.connection.db.dropDatabase(() => {
                    mongoose.connection.close(() => resolve());
                });
            });
            
            const response = await UserService.updateUser({
                body: {
                    email: 'test2@test.com',
                },
                params: {
                    id: 'testid',
                },
            });

            expect(response).toBeTruthy();
            expect(response.statusCode).toBe(500);
            expect(response.data).toBeTruthy();
            expect(response.data.errors).toBeTruthy();
            expect(response.data.errors.default).toBeTruthy();
            expect(response.data.errors.default).toStrictEqual(['Could not update user information. Please try again.']);
        });
    });
});