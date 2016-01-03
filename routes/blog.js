var express = require('express');
var router = express.Router();

/* POST users . */
router.post('/blog/post', function(req, res, next) {
  
  if(req.body){
	  var db = req.db;
	  var post = {
	  	"title":req.body.title,      
		"description": req.body.description,      
		"postedby":req.body.username,      
		"comments" :[],
		"datetime" : new Date().toDateString()
	  };
	  console.log(post);
	  //Get the documents collection
	  var posts = db.collection('posts');
	  posts.insert(post, function (err, result) {
	  	console.log(err || result);
	  	if (err) {
	  		res.json({"status":false,"message":err});
	  	}else{
	  		res.json({"status":true,data:result});
	  	}
	  	
	  });
  }else{
  		res.json({"status":false, "message":"No Post data."});
  }  
  
});

router.get('/blog/post/list', function(req, res, next) {
	//Get the documents collection
	var posts = req.db.collection('posts');
	posts.find({}).toArray(function(err, result){	

		if (err) {
			res.json({"status":false,"message":err});
		}else{
			var users = [];
			console.log("Post Length", result.length);
			if(!result.length){
				res.json({"status":false,"message":"No post found."});
			}else{
				for(var k in result){
					users.push(result[k].user_id);
				}
				console.log("users", users)
				req.db.collection('users').find({"_id" : {$in : users}}, {fields:{username:1}}, function(err, userList) {
				  	if (err) {
				  		res.json({"status":false,"message":err});
				  	}else{
				  		console.log("userList", userList)
				  		for(var key in result) {
				  			console.log("post", result[key])
				  			result[key].user_id = userList[result[key].user_id];
				  		};
				  		console.log("final result", result)
				  		res.json({"status":true,data:result});
				  	}
				  	
				});
			}
			
			
		}

	});
});

router.get('/blog/post/id/:id', function(req, res, next) {
	//Get the documents collection
	var id = req.params.id;
	var ObjectId = require('mongodb').ObjectId; 
	var o_id = new ObjectId(id);

	var posts = req.db.collection('posts');

	posts.find({"_id":o_id}).toArray(function(err, result){
	

	if (err) {
		res.json({"status":false,"message":err});
	}else{
		res.json({"status":true,data:result[0]});
	}

	});
});

/* POST users . */
router.post('/blog/post/comment', function(req, res, next) {
  	var ObjectId = require('mongodb').ObjectId; 
	
  if(req.body){
	  var db = req.db;
	  var o_id = new ObjectId(req.body.post_id);
	  var comment = {
		"user":req.body.user,      
		"comment" : req.body.comment,
		"datetime" : new Date().toDateString()
	  };
	  console.log('comment',req.body)
	  //Get the documents collection
	  var posts = db.collection('posts');
      // executing the command safely
      posts.findAndModify({_id:o_id}, [],{$push : {"comments":comment}}, function(err, result) {
          	if (err) {
				res.json({"status":false,"message":err});
			}else{
				res.json({"status":true,data:result});
			}
      });
  }else{
  		res.json({"status":false, "message":"No Post data."});
  }  
  
});

module.exports = router;