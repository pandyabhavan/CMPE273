var mysql = require("./mysql");
var ejs = require("ejs");
var log = require('./log');

function getCartPage(req,res)
{
	ejs.renderFile('./views/cart.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			log.warn('Unable to load cart page');
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getCart(req,res)
{
	var response;
	if(req.session.login)
	{
		var query = "select c.quantity,i.name,i.description,u.first_name,i.price,i.id from cart c,item i,user u where u.id = i.user_id and c.item_id = i.id and u.id = "+req.session.login.id+" and ((i.view=1 and i.bid=0) or (i.view =0 and bid=1))";
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
		var query = "delete from cart where item_id="+item_id+" and user_id="+req.session.login.id+"";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error');
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				console.log(results);
				response = {"statusCode":200,"data":results};
				res.send(JSON.stringify(response));
			}
		},query);
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

exports.getCartPage = getCartPage;
exports.getCart = getCart;
exports.removeFromCart = removeFromCart;
exports.checkout = checkout;