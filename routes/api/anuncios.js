'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => {
     try {
        const name   = req.query.name;
        const age    = req.query.age;
        const id     = req.query.id;
        const skip   = parseInt(req.query.skip);
        const limit  = parseInt(req.query.limit);
        const sort   = req.query.sort;
        const fields = req.query.fields;

        const filtro = {};

        if (typeof name !== 'undefined') {
            filtro.name = name;
        }

        if (typeof age !== 'undefined') {
            filtro.age = age;
        }

        if (typeof id !== 'undefined') {
            filtro._id = id;
        }

        const docs = await Anuncio.listar(filtro, skip, limit, sort, fields);

        res.json({success: true, result: docs});
     } catch(err) {
         next(err);
         return;
     }
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    Anuncio.find({name: name}).exec((err, docs) => {
        if(err) {
            next(err);
            return;
        }
        res.json({success: true, result: docs});
    });
});

router.get('/id/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncioId = await Anuncio.find({_id: _id}).exec();
        res.json({success: true, result: anuncioId});
    } catch(err) {
        next(err);
        return;
    }
});

router.get('/age/:age', async (req, res, next) => {
    try {
        const age = req.params.age;
        const anuncioAge = await Anuncio.find({age: age}).exec();
        res.json({success: true, result: anuncioAge});
    } catch(err) {
        next(err);
        return;
    }
});

router.post('/', (req, res, next) => {
    const data = req.body;
    const anuncio = new Anuncio(data);
    anuncio.save((err, anuncioGuardado) => {
        if(err) {
            next(err);
            return;
        }
        res.json({success: true, result: anuncioGuardado});
    });
});

router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const result = await Anuncio.remove({_id: _id}).exec();
        res.json({success: true, result: result});
    } catch(err) {
        next(err);
        return;
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;

        const anuncioActualizado = await Anuncio.findByIdAndUpdate(_id, data, { new: true });
        res.json({success: true, result: anuncioActualizado});
    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;