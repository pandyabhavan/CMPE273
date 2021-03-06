var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var bidding_log = require('./bidding_log');
var mq_client = require('../rpc/client');

function getProductDetails(req,res)
{
	var item_id = req.param('item_id');

	var msg_payload = {"item_id":item_id,"action":"getProductDetails"};
	mq_client.make_request('product_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			response = {"statusCode":401,"data":null};
			res.send((response));
		}
		else 
		{
			if(results.code == 200){
				response = {"statusCode":200,"data":results};
				console.log(response);
				req.session.product = results;
				res.send((response));
			}
			else {    
				response = {"statusCode":403,"data":null};
				res.send((response));
			}
		}  
	});
}

function getProductSession(req,res)
{
	var json_response;
	if(req.session.product)
		json_response = {"statusCode":200,"data":req.session.product};
	else
		json_response = {"statusCode":401,"data":null};

	res.send((json_response));
}

function add_to_cart(req,res)
{
	var item_id = req.param('item_id');
	var quantity = req.param('quantity');
	var response;

	if(!req.session.login)
	{
		response = {"statusCode":401,data:null};
		res.send((response));
	}
	else
	{
		var msg_payload = {"user":req.session.login.handle,"item_id":item_id,"quantity":quantity,"action":"add_to_cart"};
		mq_client.make_request('product_queue',msg_payload, function(err,results){
			console.log(results);
			if(err){
				response = {"statusCode":401,"data":null};
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
					response = {"statusCode":401,"data":null};
					res.send((response));
				}
			}  
		});
	}
}

function placebid(req,res)
{
	var response;
	var item_id = req.param('item_id');
	if(req.session.login)
	{	
		var msg_payload = {"user":req.session.login.handle,"item_id":item_id,"action":"placebid"};
		mq_client.make_request('product_queue',msg_payload, function(err,results){
			console.log(results);
			if(err){
				response = {"statusCode":403,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					bidding_log.info("Bid placed for item id "+item_id+" for "+req.param('bid')+" by user "+req.session.login.handle+"");
					response = {"statusCode":200,"data":results};
					console.log(response);
					res.send((response));
				}
				else if(results.code == 405)
				{
					bidding_log.info("Item id "+item_id +" sold to "+req.session.login.handle);
					response = {"statusCode":405,"data":results};
					console.log(response);
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

exports.getProductDetails = getProductDetails;
exports.getProductSession = getProductSession;
exports.add_to_cart = add_to_cart;
exports.placebid = placebid;