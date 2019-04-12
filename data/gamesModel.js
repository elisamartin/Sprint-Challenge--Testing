const db = require('./dbConfig');

module.exports = {
	getAll,
	insert,
	getById,
	remove
};

function getAll() {
	return db('games');
}

async function insert(game) {
	const [ id ] = await db('games').insert(game);
	return await db('games').where({ id }).first();
}

async function getById(id) {
	return db('games').where({ id: id }).first();
}

async function remove(id) {
	return db('games').where({ id }).del();
}
