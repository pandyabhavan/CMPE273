var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var mq_client = require('../rpc/client');

function getCart(req,res)
{
	var response;
	var response_data = {};
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getCart"};
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

function removeFromCart(req,res)
{
	var item_id = req.param('item_id');
	var response;
	
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"item_id":item_id,"action":"removeFromCart"};
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

function checkout(req,res)
{
	console.log('in checkout method');
	var quantity = req.param('quantity');
	
	var total = req.param('total');
	req.session.checkout = {"quantity":quantity,"total":total};
	for(var i=0;i<quantity.length;i++)
		console.log("Checkout session "+quantity[i]);
	res.send(({"statusCode":200,"data":null}));
}

exports.getCart = getCart;
exports.removeFromCart = removeFromCart;
exports.checkout = checkout;