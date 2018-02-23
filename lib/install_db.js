'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
const fs = require('fs');
const Anuncio = require('../models/Anuncio');
const anuncios = JSON.parse(fs.readFileSync(__dirname + '/anuncios.json', 'utf-8'));

conn.on('err', err => {
	if(err) throw new Error('Error de conexion', err);
	process.exit(1);
});

conn.once('open', async () => {
	try {
		await mongoose.connection.db.dropDatabase();
		await Anuncio.collection.insert(anuncios);
		console.log('base de datos lista!');
		process.exit();
	} catch (err) {
		conn.close();
		process.exit();
	}
});

mongoose.connect('mongodb://localhost/nodepop');