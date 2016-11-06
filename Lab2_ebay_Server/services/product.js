var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var bidding_log = require('./bidding_log');

function getProductDetails(req,res)
{
	var item_id = req.param('item_id');
	query = "select i.id,name,description,price,quantity_remaining,u.first_name,ud.state,i.bid,b.highest_bid,last_date from item i left join bidding b on i.id = b.item_id,user u, user_details ud where i.user_id = u.id and u.id = ud.user_id and view = 1 and  i.id = "+item_id+"";

	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			if(results.length > 0)
			{
				console.log(results);
				response = {"statusCode":200,"data":results};
				req.session.product = results;
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
		}
	},query);
}

function getProductPage(req,res)
{
	ejs.renderFile('./views/Product.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
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

		var query = "insert into cart values("+user_id+","+item_id+","+quantity+")";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error');
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				console.log('in else');
				console.log(results);
				response = {"statusCode":200,"data":results};
				res.send(JSON.stringify(response));
			}
		},query);
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

exports.getProductPage = getProductPage;
exports.getProductDetails = getProductDetails;
exports.getProductSession = getProductSession;
exports.add_to_cart = add_to_cart;
exports.placebid = placebid;