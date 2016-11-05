var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session = require('client-sessions')
  , login = require('./routes/login')
  , header = require('./routes/header')
  , home = require('./routes/home')
  , product = require('./routes/product')
  , cart = require('./routes/cart')
  , checkout = require('./routes/checkout')
  , profile = require('./routes/profile');
require('./routes/passport')(passport);

var app = express();

var mongoSessionConnectURL = "mongodb://localhost:27017/login";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.get('/', routes.index);

app.post('/Login',login.Login);
app.post('/Register',login.register);
app.post('/getLoginSessionValues',header.getLoginSessionValues);
app.post('/logout',header.logout);
app.post('/searchQ',header.search);
app.post('/getSearchSession',header.getSearchSession);
app.post('/getProductDetails',product.getProductDetails);
app.post('/getProductSession',product.getProductSession);
app.post('/addtocart',product.add_to_cart);
app.post('/getCartNumber',header.getCartNumber);
app.post('/getCart',cart.getCart);
app.post('/removeFromCart',cart.removeFromCart);
app.post('/checkOut',cart.checkout);
app.post('/getCheckoutSession',checkout.getCheckoutSession);
app.post('/productSold',checkout.productSold);
app.post('/getPurchaseHistory',profile.getPurchaseHistory);
app.post('/getSellingHistory',profile.getSellingHistory);
app.post('/removeItem',profile.removeItem);
app.post('/addItem',profile.addItem);
app.post('/getLastLogin',home.getLastLogin);
app.post('/getTwoItems',home.getTwoItems);
app.post('/logData',home.logData);
app.post('/getProfile',profile.getProfile);
app.post('/updateProfile',profile.updateProfile);
app.post('/placebid',product.placebid);

//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});