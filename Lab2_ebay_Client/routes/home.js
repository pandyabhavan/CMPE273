var ejs = require("ejs");
var mongo = require('./mongo');
var log = require('./log');
var mq_client = require('../rpc/client');

function getLastLogin(req,res)
{
	var response;
	if(req.session.login)
	{
		response = {"statusCode":200,"data":req.session.login.last_login};
		res.send((response));
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send((response));
	}
}

function getTwoItems(req,res)
{
	var response;
	var msg_payload = {"action":"getTwoItems"};
	mq_client.make_request('header_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			response = {"statusCode":401,"data":0};
			res.send((response));
		}
		else 
		{
			if(results.code == 200){
				response = {"statusCode":200,"data":results};
				console.log(response);
				res.send((response));
			}
			else {    
				response = {"statusCode":403,"data":0};
				res.send((response));
			}
		}  
	});
}

function logData(req,res)
{
	if(req.session.login)
	{
		log.info('User with id '+req.session.login.handle+' clicked at '+req.param('place')+' in file '+req.param('file'));
		res.send(({"statusCode":200}));
	}
	else
	{
		log.info('Guest user clicked at '+req.param('place')+' in file '+req.param('file'));
		res.send(({"statusCode":200}));
	}
}

exports.getLastLogin = getLastLogin;
exports.getTwoItems = getTwoItems;
exports.logData = logData;