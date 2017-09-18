var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/log', function(req, res, next) {
	res.json([
		{
			id: 1

			date:1505740074
,

			grams: 23
		}
		{
			id: 2,
			date:1505653674
			grams: 11
		},
		{
			id: 3,

			date:1505567274,
			grams: 43
		},
		{
			id: 4,

			date:1505480874,
			grams: 62
		},
		{
			id: 5,

			date:1505394474,
			grams: 19
		},
		{
			id: 6,

			date:1505308074,
			grams: 20
		},
		{
			id: 7,
			date:1505221674,
			grams: 16
		}
		{
			id: 9,

			date:1505308074,
			grams: 20
		},
		{
			id: 10,
			date:1505221674,
			grams: 16
		}
	]);
});

module.exports = router;
