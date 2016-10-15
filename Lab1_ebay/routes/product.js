var mysql = require("./mysql");
var ejs = require("ejs");

function getProductDetails(req,res)
{
	var item_id = req.param('item_id');
	query = "select id,name,description,price,quantity_remaining from item where id="+item_id+"";

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

exports.getProductPage = getProductPage;
exports.getProductDetails = getProductDetails;
exports.getProductSession = getProductSession;
exports.add_to_cart = add_to_cart;