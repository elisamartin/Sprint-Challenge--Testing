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

module.exports = server;
