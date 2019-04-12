const express = require('express');
const games = require('./data/gamesModel');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
	res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
	const rows = await games.getAll();
	res.status(200).json(rows);
});

server.post('/games', (req, res) => {
	const game = req.body;
	if (!game.title || !game.genre) {
		res.status(422).json({ message: 'information is incomplete' });
	} else {
		games.insert(game);
		res.status(201).json({ message: 'Created' });
	}
});

// Stretch - GET by id - DELETE

server.get('/games/:id', async (req, res) => {
	const { id } = req.params;
	if (id) {
		try {
			const game = await games.getById(id);
			res.status(200).json(game);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(500).json({ message: 'Bad request' });
	}
});

server.delete('/games/:id', async (req, res) => {
	const { id } = req.params;
	if (id) {
		try {
			const response = await games.remove(id);
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(500).json({ message: 'Bad request' });
	}
});

module.exports = server;
