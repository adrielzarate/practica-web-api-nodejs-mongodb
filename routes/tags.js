var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

router.get('/', async (req, res, next) => {
     try {
        const getTags = await Anuncio.distinct('tags');
        res.locals.tags = getTags;
        res.render('tags');
     } catch(err) {
         next(err);
         return;
     }
});

module.exports = router;
