var ejs = require("ejs");
var log = require('./log');
var soap = require('soap');
var baseURL = "http://localhost:8080/Lab3_ebay_Server/services";


function getCart(req,res)
{
	var response;
	if(req.session.login)
	{
		var option = {
				ignoredNamespaces : true	
			};
		 var url = baseURL+"/Cart?wsdl";
		  var args = {"user_id":req.session.login.id};
		  soap.createClient(url,option, function(err, client) {
		      client.getCart(args, function(err, result) {
		    	  if(result.getCartReturn != null){
		    		  response = {"statusCode":200,"data":JSON.parse(result.getCartReturn)};
		    		  res.send(JSON.stringify(response));
		    	  }
		    	  else{
		    		  res.send({"statusCode":401,"data":null});
		    	  }
		      });
		  });
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}
}

function removeFromCart(req,res)
{
	var item_id = req.param('item_id');
	var response;
	
	if(req.session.login)
	{
		var option = {
				ignoredNamespaces : true	
			};
		 var url = baseURL+"/Cart?wsdl";
		  var args = {"user_id":req.session.login.id,"item_id":item_id};
		  soap.createClient(url,option, function(err, client) {
		      client.getCart(args, function(err, result) {
		    	  if(result.removeFromCartReturn != null){
		    		  response = {"statusCode":200,"data":JSON.parse(result.removeFromCartReturn)};
		    		  res.send(JSON.stringify(response));
		    	  }
		    	  else{
		    		  res.send({"statusCode":401,"data":null});
		    	  }
		      });
		  });
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
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
	res.send(JSON.stringify({"statusCode":200,"data":null}));
}

exports.getCart = getCart;
exports.removeFromCart = removeFromCart;
exports.checkout = checkout;