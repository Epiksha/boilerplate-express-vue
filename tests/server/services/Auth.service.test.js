const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../../config/server');
const { DATABASE_URL } = require('../../../config');
const User = require('../../../models/User.model');
const AuthService = require('../../../services/Auth.service');

describe('AuthService', () => {
    beforeEach(done => {
        mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => done());
    });
    
    afterEach(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
        });
    });

    describe('login()', () => {
        it('Fails if user does not exist', async () => {
            const data = await AuthService.login({
                body: { email: 'test@test.com', password: 'helloworld' },
            });
    
            expect(data.statusCode).toBe(422);
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
            expect(data.errors.default).toContain('Invalid credentials.')
        });
        
        it('Fails if password is not provided', async () => {
            const data = {
                email: 'test@test.com',
                first_name: 'Jonathan',
                last_name: 'Smithson',
                password: 'hello123',
            };
        
            await supertest(createServer())
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
                });
            
            const response = await AuthService.login({
                body: { email: data.email },
            });

            expect(response.statusCode).toBe(422);
            expect(response.errors).toBeTruthy();
            expect(response.errors.default).toBeTruthy();
            expect(response.errors.default).toContain('Invalid credentials.')
        });
        
        it('Fails if password is invalid', async () => {
            const data = {
                email: 'test@test.com',
                first_name: 'Jonathan',
                last_name: 'Smithson',
                password: 'hello123',
            };
        
            await supertest(createServer())
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
                });
            
            const response = await AuthService.login({
                body: { email: data.email, password: 'hello124' },
            });

            expect(response.statusCode).toBe(422);
            expect(response.errors).toBeTruthy();
            expect(response.errors.default).toBeTruthy();
            expect(response.errors.default).toContain('Invalid credentials.')
        });

        it('Catches errors correctly', async () => {
            const data = await AuthService.login({}, true);
    
            expect(data.statusCode).toBe(500);
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
            expect(data.errors.default).toContain('There was an issue connecting to the server. Please wait a moment and try again.')
        });
    });
    
    describe('validate()', () => {
        it('Catches errors correctly', async () => {
            const data = await AuthService.validate({}, true);
    
            expect(data.statusCode).toBe(500);
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
            expect(data.errors.default).toContain('There was an issue connecting to the server. Please wait a moment and try again.')
        });
    });
});