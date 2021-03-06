const server = require('./server');
const request = require('supertest');
const db = require('./data/dbConfig.js');

describe('server', () => {
	beforeEach(async () => {
		await db('games').truncate();
	});
	afterEach(async () => {
		await db('games').truncate();
	});

	describe('GET / endpoint', () => {
		it('status code 200', () => {
			return request(server).get('/').expect(200);
		});
		it('returns the right response body', () => {
			const expectedResponseBody = JSON.stringify({ api: 'up' });
			return request(server)
				.get('/')
				.expect(expectedResponseBody)
				.expect('Content-Length', expectedResponseBody.length.toString());
		});
	});

	describe('GET /games endpoint', () => {
		it('status code 200', () => {
			return request(server).get('/games').expect(200);
		});

		it('returns a type of application/json', async () => {
			const response = await request(server).get('/games');
			expect(response.type).toBe('application/json');
		});

		it('returns current items on games, starting with 0', async () => {
			const res = await request(server).get('/games');
			expect(res.body).toHaveLength(0);
		});
	});

	describe('POST /games endpoint', () => {
		const game = {
			title: 'Pacman',
			genre: 'Arcade',
			releaseYear: '1980'
		};
		it('insert successfully with status code 201', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.status).toBe(201);
		});

		it('inserts json', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.type).toBe('application/json');
		});

		it('response with status message of Created', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.res.statusMessage).toBe('Created');
		});
	});

	describe('DELETE /games/id endpoint', () => {});
});
