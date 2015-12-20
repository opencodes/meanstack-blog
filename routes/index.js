var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
  	res.json({ "title": "Index Application", "databaseName": db.databaseName});
});


module.exports = router;
