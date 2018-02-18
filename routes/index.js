var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

// cargamos la libreria de validaciones
const { query, validationResult } = require('express-validator/check');

// http://localhost:3000/?nombre=iPhone 3GS
router.get('/', async (req, res, next) => {
     try {
        const id     = req.query.id;
        const nombre   = req.query.nombre;
        const venta     = req.query.venta;
        const tags    = req.query.tags;
        const skip   = parseInt(req.query.skip);
        const limit  = parseInt(req.query.limit);
        const sort   = req.query.sort;

        const gt   = req.query.gt;
        const lt   = req.query.lt;

        const fields = req.query.fields;
        const distinct = req.query.distinct;

        const filtro = {};

        if (typeof nombre !== 'undefined' && nombre !== '') {
            filtro.nombre = new RegExp('^' + req.query.nombre, "i");;
        }

        if (typeof venta !== 'undefined' && venta !== '') {
            filtro.venta = venta;
        }

        if (typeof tags !== 'undefined') {
            // const regex = tags.split(',').join('|');
            // filtro.tags = { $regex: regex, $options: 'i' };

            filtro.tags = tags;
        }

        if (typeof id !== 'undefined') {
            filtro._id = id;
        }

        if (typeof lt !== 'undefined' && lt !== '') {
            filtro.precio = { $lt: parseFloat(lt) };
        }

        if (typeof gt !== 'undefined' && gt !== '') {
            filtro.precio = { $gt: parseFloat(gt) };
        }

        const docs = await Anuncio.listar(filtro, skip, limit, sort, fields, distinct);
        const getTags = await Anuncio.distinct('tags');
        // res.json({success: true, result: docs});

        res.locals.anuncios = docs;
        res.locals.tags = getTags;

        res.render('index');


     } catch(err) {
         next(err);
         return;
     }


});

module.exports = router;
