
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('cart', { title: 'Express' });
};