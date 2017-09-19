var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/log', function(req, res, next) {
	res.render('index', { title: 'Food Log' });
});

router.get('/api/saved', function(req, res, next) {
	res.render('index', { item: item, brand: brand, sugar: sugar });
});

module.exports = router;
