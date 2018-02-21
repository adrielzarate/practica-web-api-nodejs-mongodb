'use strict';

const mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.listar = function(filtro, skip, limit, fields, distinct, callback) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);

    if(distinct) query.distinct(distinct);

    return query.lean().exec(callback);
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;