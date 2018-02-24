'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => {
    try {
        const nombre   = req.query.nombre;
        const venta     = req.query.venta;
        const tags    = req.query.tags;
        const skip   = 0;
        const limit  = 0;

        const gt   = req.query.gt;
        const lt   = req.query.lt;

        const fields = req.query.fields;
        const distinct = req.query.distinct;

        const filtro = {};

        if (typeof nombre !== 'undefined' && nombre !== '') {
            filtro.nombre = new RegExp('^' + req.query.nombre, 'i');
        }

        if (typeof venta !== 'undefined' && venta !== '') {
            filtro.venta = venta;
        }

        if (typeof tags !== 'undefined') {
            filtro.tags = tags;
        }

        if (typeof lt !== 'undefined' && lt !== '') {
            filtro.precio = { $lt: parseFloat(lt) };
        }

        if (typeof gt !== 'undefined' && gt !== '') {
            filtro.precio = { $gt: parseFloat(gt) };
        }

        const docs = await Anuncio.listar(filtro, skip, limit, fields, distinct);

        res.json({success: true, result: docs});

    } catch(err) {
        next(err);
        return;
    }
});

router.get('/tags', async (req, res, next) => {
    try {
        const getTags = await Anuncio.distinct('tags');
        res.json({success: true, result: getTags});
    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;
