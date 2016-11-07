var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var mq_client = require('../rpc/client');
var response;

function getPurchaseHistory(req,res)
{
	var response;
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getPurchaseHistory"};
		
		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":403,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					results.first_name = req.session.login.first_name;
					response = {"statusCode":200,"data":results};
					res.send((response));
				}
				else {    
					response = {"statusCode":401,"data":null};
					res.send(response);
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

function getProfilePage(req,res)
{
	var url = req.originalUrl.split('/')[2];
	
	if(req.session.login)
	{
		ejs.renderFile('./views/profile.ejs',function(err, result) {
			if (!err) {
				if(req.session.login.handle == url)
				{
					console.log('1');
					res.send(result);
					bool = false;
				}
				else
				{
					console.log('3');
					res.send('');
				}
			}
			else {
				console.log('2');
				res.send('An error occurred');
				console.log(err);
			}

		});
	}
	else
	{	console.log('4');
	res.send('You need to login first.');
	}
}

function getSellingHistory(req,res)
{
	var response;
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getSellingHistory"};

		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":403,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					results.first_name = req.session.login.first_name;
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

function removeItem(req,res)
{
	var item_name = req.param('item_name');
	var response;
	
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"item_name":item_name,"action":"removeItem"};

		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":401,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					results.first_name = req.session.login.first_name;
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

function addItem(req,res)
{
	var name = req.param('name');
	var description = req.param('description');
	var price = req.param('price');
	var quantity = req.param('quantity');
	var category = req.param('category');
	var bidding = req.param('bidding');
	var response;
	
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getState"};

		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":401,"data":null};
				res.send((response));
			}
			else 
			{
				if(results.code == 200){
					var msg_payload = {"user":req.session.login.handle,"name":name,"description":description,"price":price,"quantity":quantity,"category":category,"bidding":bidding,"action":"addItem"};
					mq_client.make_request('profile_queue',msg_payload, function(err,results){

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

function getProfile(req,res)
{
	var response;
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getProfile"};
		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":403,"data":null};
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

function updateProfile(req,res)
{
	var profile = req.param('profile');
	var response;
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"profile":profile,"action":"updateProfile"};
		mq_client.make_request('profile_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":403,"data":null};
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

exports.getPurchaseHistory = getPurchaseHistory;
exports.getProfilePage = getProfilePage;
exports.getSellingHistory = getSellingHistory;
exports.removeItem = removeItem;
exports.addItem = addItem;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;