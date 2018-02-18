var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

router.get('/', (req, res, next) => {
    res.render('crear');
});

router.post('/', (req, res, next) => {
    const data = req.body;
    const anuncio = new Anuncio(data);
    anuncio.tags = anuncio.tags[0].split(',');
    anuncio.save((err, anuncioGuardado) => {
        if(err) {
            console.log(data);
            console.log(anuncio);
            next(err);
            return;
        }
        res.json({success: true, result: anuncioGuardado});
    });
});

module.exports = router;
