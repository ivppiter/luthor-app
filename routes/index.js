var route = require('express').Router();

route.use('/api', require('./api'));
route.use('/api/v1', require('./api_v1'));
route.use('/test/one/two', function(req,res, next){
  res.json({bob: true});
});

module.exports = route;