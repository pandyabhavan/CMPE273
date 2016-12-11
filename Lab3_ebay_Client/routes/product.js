var mysql = require("./mysql");
var ejs = require("ejs");
var log = require('./log');
var bidding_log = require('./bidding_log');
var soap = require('soap');
var baseURL = "http://localhost:8080/Lab3_ebay_Server/services";


function getProductDetails(req,res)
{
	var item_id = req.param('item_id');
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Product?wsdl";
	  var args = {"item_id":item_id};
	  soap.createClient(url,option, function(err, client) {
	      client.getProductDetails(args, function(err, result) {
	    	  if(result.getProductDetailsReturn != null){
	    		  response = {"statusCode":200,"data":JSON.parse(result.getProductDetailsReturn)};
	    		  req.session.product = JSON.parse(result.getProductDetailsReturn);
	    		  res.send(JSON.stringify(response));
	    	  }
	    	  else{
	    		  res.send({"statusCode":401,"data":null});
	    	  }
	      });
	  });
}

function getProductSession(req,res)
{
	var json_response;
	if(req.session.product)
		json_response = {"statusCode":200,"data":req.session.product};
	else
		json_response = {"statusCode":401,"data":null};

	res.send(JSON.stringify(json_response));
}

function add_to_cart(req,res)
{
	var item_id = req.param('item_id');
	var quantity = req.param('quantity');
	var response;

	if(!req.session.login)
	{
		response = {"statusCode":401,data:null};
		res.send(JSON.stringify(response));
	}
	else
	{
		var user_id = req.session.login.id;

		var option = {
				ignoredNamespaces : true	
			};
		 var url = baseURL+"/Product?wsdl";
		  var args = {"user_id":user_id,"item_id":item_id,"quantity":quantity};
		  soap.createClient(url,option, function(err, client) {
		      client.add_to_cart(args, function(err, result) {
		    	  if(result.add_to_cartReturn != null){
		    		  response = {"statusCode":200,"data":JSON.parse(result.add_to_cartReturn)};
		    		  res.send(JSON.stringify(response));
		    	  }
		    	  else{
		    		  res.send({"statusCode":401,"data":null});
		    	  }
		      });
		  });
		
	}
}

function placebid(req,res)
{
	var response;
	var item_id = req.param('item_id');
	if(req.session.login)
	{	
		var query = "select last_date,user_id from bidding where item_id="+item_id+"";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error');
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				if(new Date(results[0].last_date) < new Date())
				{
					var query2 = "update item set view = 0 where id ="+item_id+";";
					mysql.fetchData(function(err,results2){
						if(err)
						{
							console.log('in error');
							response = {"statusCode":403,"data":null};
							res.send(JSON.stringify(response));
						}
						else
						{
							var query1 = "insert into cart values("+results[0].user_id+","+item_id+",1)";
							mysql.fetchData(function(err,results1){
								if(err)
								{
									console.log('in error');
									response = {"statusCode":403,"data":null};
									res.send(JSON.stringify(response));
								}
								else
								{
									bidding_log.info("Item id "+item_id +" sold to "+results[0].user_id);
									response = {"statusCode":405,"data":null};
									res.send(JSON.stringify(response));
								}
							},query1);
						}
					},query2);
				}	
				else
				{
					var query1 = "update bidding set highest_bid = "+req.param('bid')+",user_id = "+req.session.login.id+" where item_id="+item_id+"";
					mysql.fetchData(function(err,results1){
						if(err)
						{
							console.log('in error');
							response = {"statusCode":403,"data":null};
							res.send(JSON.stringify(response));
						}
						else
						{
							bidding_log.info("Bid placed for item id "+item_id+" for "+req.param('bid')+" by user "+req.session.login.id+"");
							response = {"statusCode":200,"data":null};
							res.send(JSON.stringify(response));
						}
					},query1);
				}	
			}
		},query);
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}	
}

exports.getProductDetails = getProductDetails;
exports.getProductSession = getProductSession;
exports.add_to_cart = add_to_cart;
exports.placebid = placebid;