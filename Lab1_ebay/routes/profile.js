var mysql = require("./mysql");
var ejs = require("ejs");
var log = require('./log');

function getPurchaseHistory(req,res)
{
	var response;
	if(req.session.login)
	{
		var query = "select u.first_name,i.name,i.description,i.price,b.quantity,b.purchase_date from user u,item i,buy_sell b where b.buyer_id = "+req.session.login.id+" and u.id = i.user_id and i.id = b.item_id";
		mysql.fetchData(function(err,results){
			if(err)
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
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
		var query = "select id,name,description,price,quantity_remaining from item where user_id = "+req.session.login.id+" and view=1";
		mysql.fetchData(function(err,results){
			if(err)
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
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

function removeItem(req,res)
{
	var item_id = req.param('item_id');
	var response;
	
	if(req.session.login)
	{
		var query = "update item set view=0 where id="+item_id+"";
		mysql.fetchData(function(err,results){
			if(err)
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
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

function addItem(req,res)
{
	var name = req.param('name');
	var description = req.param('description');
	var price = req.param('price');
	var quantity = req.param('quantity');
	var category = req.param('category');
	var response;
	
	if(req.session.login)
	{
		var query = "insert into item (name,description,price,quantity,user_id,bid,quantity_remaining,category_id,view) values('"+name+"','"+description+"',"+price+","+quantity+","+req.session.login.id+",0,"+quantity+","+category+",1)";
		mysql.fetchData(function(err,results){
			if(err)
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
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

exports.getPurchaseHistory = getPurchaseHistory;
exports.getProfilePage = getProfilePage;
exports.getSellingHistory = getSellingHistory;
exports.removeItem = removeItem;
exports.addItem = addItem;