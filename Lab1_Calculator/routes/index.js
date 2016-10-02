
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('Calculator', { title: 'Express' });
};