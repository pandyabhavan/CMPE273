var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";

function search(msg,callback)
{
	var search_txt = msg.search_txt;
	var search_category = msg.search_category;
	var res={},query;
	if(search_category != "All Categories")
		query = {"name":"/"+search_txt+"/"};
	else
		query = {"name":"/"+search_txt+"/","category":search_category};
	console.log("query"+query.name);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var col = mongo.collection('item');
		col.find(query,function(error,result)
				{
			if(result)
			{
				console.log(result);
				res.code = "200";
				res.value = result;
			}	
			else
			{
				console.log("returned false");
				res.code = "401";
			}	
			callback(null, res);
				});
	});
}

function getCartNumber(msg,callback)
{
	var res={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);

		var col = mongo.collection('user');
		col.find({"handle":msg.user},function(error,result)
		{
			console.log("result "+result);
			if(result != null)
			{
				res.code = "200";
				res.value = "0";//result.cart.length;
			}	
			else
			{
				console.log("returned false");
				res.code = "401";
			}	
			callback(null, res);
		});
	});
}

exports.search = search;
exports.getCartNumber = getCartNumber;