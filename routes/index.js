'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');
const paginate = require('express-paginate');

router.use(paginate.middleware(4, 50));

router.get('/', async (req, res, next) => {
	try {
		const id     = req.query.id;
		const nombre   = req.query.nombre;
		const venta     = req.query.venta;
		const tags    = req.query.tags;
		const skip   = parseInt(req.skip);
		const limit  = parseInt(req.query.limit);

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

		if (typeof id !== 'undefined') {
			filtro._id = id;
		}

		if (typeof lt !== 'undefined' && lt !== '') {
			filtro.precio = { $lt: parseFloat(lt) };
		}

		if (typeof gt !== 'undefined' && gt !== '') {
			filtro.precio = { $gt: parseFloat(gt) };
		}

		const docs = await Anuncio.listar(filtro, skip, limit, fields, distinct);
		const allDocs = await Anuncio.listar(filtro, 0, 0, fields, distinct);
		const getTags = await Anuncio.distinct('tags');

		res.locals.anuncios = docs;
		res.locals.tags = getTags;

		const [results, itemCount] = await Promise.all([
			docs,
			Object.keys(allDocs).length
		]);

		const pageCount = Math.ceil(itemCount / req.query.limit);

		res.render('index', {
			anuncios: results,
			pageCount,
			itemCount,
			pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
		});


	} catch(err) {
		next(err);
		return;
	}
});

module.exports = router;
