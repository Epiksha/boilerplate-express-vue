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

describe('Users Endpoints', () => {
	// Get All Users
	test('GET /api/users', async () => {
		const user = await User.create({
			email: 'test@test.com',
			first_name: 'Jonathan',
			full_name: 'Jonathan Smithson',
			last_name: 'Smithson',
			password: 'hello123',
		});
	
		return await request(createServer())
			.get('/api/users')
			.expect(200)
			.then(response => {
				// Check the response type and length
				expect(Array.isArray(response.body)).toBeTruthy();
				expect(response.body.length).toEqual(1);
	
				// Check the response data
				expect(response.body[0].email).toBe(user.email);
				expect(response.body[0].first_name).toBe(user.first_name);
				expect(response.body[0].last_name).toBe(user.last_name)
				expect(response.body[0].full_name).toBe(user.full_name)
			});
	});
	
	// Get Single User
	test('GET /api/users/:id', async () => {
		const user = await User.create({
			email: 'test@test.com',
			first_name: 'Jonathan',
			full_name: 'Jonathan Smithson',
			last_name: 'Smithson',
			password: 'hello123',
		});
	
		return await request(createServer())
			.get(`/api/users/${user._id}`)
			.expect(200)
			.then(response => {
				expect(response.body.email).toBe(user.email);
				expect(response.body.first_name).toBe(user.first_name);
				expect(response.body.last_name).toBe(user.last_name)
				expect(response.body.full_name).toBe(user.full_name)
			});
	});
	
	// Create User
	test('POST /api/users', async () => {
		const data = {
			email: 'test@test.com',
			first_name: 'Jonathan',
			last_name: 'Smithson',
			password: 'hello123',
		};
	
		return await request(createServer())
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
	});
	
	// Update User
	test('PATCH /api/users/:id', async () => {
		const user = await User.create({
			email: 'test@test.com',
			first_name: 'Jonathan',
			full_name: 'Jonathan Smithson',
			last_name: 'Smithson',
			password: 'hello123',
		})
	
		const data = {
			email: 'test2@test.com',
		};
	
		return await request(createServer())
			.patch(`/api/users/${user._id}`)
			.send(data)
			.expect(200)
			.then(async (response) => {
				expect(JSON.stringify(response.body._id)).toBe(JSON.stringify(user._id));
				expect(response.body.email).toBe(data.email);
				
				const newUser = await User.findOne({ _id: response.body._id });
				expect(newUser).toBeTruthy();
				expect(newUser.email).toBe(data.email);
			});
	});
	
	// Delete User
	test('Delete /api/users/:id', async () => {
		const user = await User.create({
			email: 'test@test.com',
			first_name: 'Jonathan',
			full_name: 'Jonathan Smithson',
			last_name: 'Smithson',
			password: 'hello123',
		})
	
		return await request(createServer())
			.delete(`/api/users/${user._id}`)
			.send()
			.expect(200)
			.then(async (response) => {
				const newUser = await User.findOne({ _id: response.body._id });
				
				expect(newUser).toEqual(null);
			});
	});
});