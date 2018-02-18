'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
const fs = require('fs');
const Anuncio = require('../models/Anuncio');
const anuncios = JSON.parse(fs.readFileSync(__dirname + '/anuncios.json', 'utf-8'));

conn.on('err', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

conn.once('open', async () => {
    try {
      await mongoose.connection.db.dropDatabase();
        console.log('Base de datos vaciada');
      await Anuncio.collection.insert(anuncios);
        console.log('Datos cargados');
        process.exit();
    } catch (err) {
        console.log(err);
        conn.close();
        process.exit();
    }
});

mongoose.connect('mongodb://localhost/nodepop');