var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";

function getPurchaseHistory(msg,callback)
{
	var res = {};
	console.log("in purchase history");
	mongo.connect(mongURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('item');

		coll.find({"buyer.handle_buyer":msg.user}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		});
	});
}

function getSellingHistory(msg,callback)
{
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('item');

		coll.find({"handle_seller":msg.user,"view":1}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
			}
			callback(null, res);
		});
	});
}

function removeItem(msg,callback)
{
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('item');

		coll.update({"handle_seller":msg.user},{$set:{"view":1}}, function(err, user){
			if (user) {
				console.log('in if');
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
			}
			callback(null, res);
		});
	});
}

function getState(msg,callback)
{
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');

		coll.find({"handle":msg.user},{"state":1}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		});
	});
}

function addItem(msg,callback)
{
	var name = msg.name;
	var description = msg.description;
	var price = msg.price;
	var quantity = msg.quantity;
	var category = msg.category;
	var bidding = msg.bidding;
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('item');

		coll.insertOne({"handle_seller":msg.user,"name":name,"description":description,"price":price,"quantity":quantity,"bid":0,"quantity_remaining":quantity,"category":category,"view":1,"buyer":[]}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		});
	});
}

function getProfile(msg,callback)
{
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');

		coll.find({"handle":msg.user}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		});
	});
}

function updateProfile(msg,callback)
{
	var profile = msg.profile;
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');

		coll.update({"handle":msg.user},{$set:{"first_name":profile.first_name,"last_name":profile.last_name,"birth_day":profile.birth_day,"contact":profile.contact,"address1":profile.address1,"address2":profile.address2,"city":profile.city,"state":profile.state,"pin_code":profile.pin_code}}, function(err, user){
			if (user) {
				console.log('in if');
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = user;
				console.log(res);

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		});
	});
}

exports.getPurchaseHistory = getPurchaseHistory;
exports.getSellingHistory = getSellingHistory;
exports.removeItem = removeItem;
exports.addItem = addItem;
exports.getProfile = getProfile;
exports.getState = getState;
exports.updateProfile = updateProfile;