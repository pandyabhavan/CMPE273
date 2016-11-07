var ejs = require("ejs");
var mongo = require('./mongo');
var log = require('./log');
var mq_client = require('../rpc/client');

function Register(req,res)
{
	var email = req.param('email');
	var password = req.param('password');
	var first_name = req.param('first_name');
	var last_name = req.param('last_name');
	var handle = req.param('handle');
	var response;
	
	var msg_payload = {"email":email,"password":password,"first_name":first_name,"last_name":last_name,"handle":handle,"action":"Register"};
	mq_client.make_request('header_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			response = {"statusCode":401,"data":null};
			res.send((response));
		}
		else 
		{
			if(results.code == 200){
				response = {"statusCode":200,"data":results};
				req.session.login = {"first_name":first_name,"email":email,"handle":handle,"last_login":new Date()};
				console.log(response);
				res.send((response));
			}
			else {    
				response = {"statusCode":403,"data":null};
				res.send((response));
			}
		}  
	});
}

exports.register = Register;