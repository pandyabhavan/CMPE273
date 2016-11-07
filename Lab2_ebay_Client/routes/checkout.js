var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var mq_client = require('../rpc/client');

function getCheckoutSession(req,res)
{
	var response;
	if(req.session.login)
	{
		response = {"statusCode":200,"data":req.session.checkout.total};
		console.log(req.session.checkout);
		res.send((response));
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send((response));
	}
}

function productSold(req,res)
{
	if(req.session.login)
	{
		var a = true;
		var item_quantity = req.session.checkout.quantity;
		console.log(req.session.checkout);
		
		var msg_payload = {"user":req.session.login.handle,"item_quantity":item_quantity,"action":"productSold"};
		mq_client.make_request('cart_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":401,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					response = {"statusCode":200,"data":results};
					res.send((response));
				}
				else {    
					response = {"statusCode":401,"data":null};
					res.send((response));
				}
			}  
		});
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send((response));
	}
}

exports.getCheckoutSession = getCheckoutSession;
exports.productSold = productSold;