const mongoose = require('mongoose');
const request = require('supertest');

const createServer = require('../../config/server');
const { DATABASE_URL } = require('../../../config');
const User = require('../../../models/User.model');

beforeEach(done => {
	mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => done());
});

afterEach(done => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe('Auth Endpoints', () => {
    test('POST /api/auth/token', async () => {
        const data = {
			email: 'test@test.com',
			first_name: 'Jonathan',
			last_name: 'Smithson',
			password: 'hello123',
		};

        const user = await request(createServer())
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


        return await request(createServer())
            .post('/api/auth/token')
            .send({ email: user.email, password: data.password })
            .expect(200)
            .then(async (response) => {
                expect(user.token).toBeTruthy();
            });
    });
    
	test('POST /api/auth/validate', async () => {
        const data = {
			email: 'test@test.com',
			first_name: 'Jonathan',
			last_name: 'Smithson',
			password: 'hello123',
		};

        const user = await request(createServer())
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


        const loggedInUser = await request(createServer())
            .post('/api/auth/token')
            .send({ email: user.email, password: data.password })
            .expect(200)
            .then(async (response) => {
                expect(user.token).toBeTruthy();

				return response.body;
            });
        
		return await request(createServer())
            .post('/api/auth/validate')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send()
            .expect(200);
    });
});