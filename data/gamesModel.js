const db = require('./dbConfig');

module.exports = {
	getAll,
	insert
};

function getAll() {
	return db('games');
}

async function insert(game) {
	const [ id ] = await db('games').insert(game);
	return await db('games').where({ id }).first();
}
