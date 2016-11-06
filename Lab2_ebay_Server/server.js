//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var cart = require('./services/cart'); 

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on queue");

	cnn.queue('cart_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.action == "getCart")
			{	
				cart.getCart(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.action == "removeFromCart")
			{	
				cart.getCart(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});
});