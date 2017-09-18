var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json([
		{
			id: 1,
			username: 'Bridget'
		},
		{
			id: 2,
			username: 'Fernando'
		},
		{
			id: 3,
			username: 'Funda'
		},
		{
			id: 4,
			username: 'Jane'
		},
		{
			id: 5,
			username: 'Jessica'
		},
		{
			id: 6,
			username: 'Percy'
		},
		{
			id: 7,
			username: 'Robert'
		}
	]);
});

module.exports = router;
