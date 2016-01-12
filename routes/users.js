var express = require('express');
var router = express.Router();

/* POST users . */
router.post('/user/register', function(req, res, next) {
  
  if(req.body && req.body.username && req.body.password && req.body.email){
	  var db = req.db;
	  var userFormData = {
	  	username : req.body.username,
	  	password : req.body.password,
	  	email : req.body.email
	  };
	  
	  //Get the documents collection
	  var users = db.collection('users');
	  users.insert(userFormData, function (err, result) {
	  	//console.log(err || result);
	  	if (err) {
	  		res.json({"status":false,"message":err});
	  	}else{
	  		res.json({"status":true,data:result});
	  	}
	  	
	  });
  }else{
  		res.json({"status":false, "message":"Any of the field[username|password|email] is missiong."});
  }  
  
});

router.post('/user/login', function(req, res, next) {
	  if(req.body && req.body.username && req.body.password){
		  var db = req.db;
		  var userFormData = {
		  	username : req.body.username,
		  	password : req.body.password,
		  };
		  
		  //Get the documents collection
		  var users = db.collection('users');
		  
		  users.findOne(userFormData, {fields:{username:1,email:1}}, function(err, result) {
		  	if (err) {
		  		res.json({"status":false,"message":err});
		  	}else{
		  		res.json({"status":true,data:result});
		  	}
		  	
		  });
	  }else{
	  		res.json({"status":false, "message":"Any of the field[username|password|email] is missiong."});
	  }
});

router.get('/user/list', function(req, res, next) {	  
      var db = req.db;	  
      //Get the documents collection
      var users = db.collection('users');

      users.find({}).toArray(function(err, result) {
        if (err) {
            res.json({"status":false,"message":err});
        }else{
            res.json(result);
        }

      });
	  
});

module.exports = router;
