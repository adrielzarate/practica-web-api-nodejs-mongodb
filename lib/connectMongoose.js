'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
const Anuncio = require('../models/Anuncio');

conn.on('err', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a mongodb en ', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop');