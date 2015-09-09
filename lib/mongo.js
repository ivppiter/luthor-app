module.exports = function(connectionString) {
  var mongo = require('mongoskin'),
    db = mongo.db(connectionString, {native_parser:true}),
    router = require('express').Router();

  router.use(function(req, res, next){
    req.db = db;
    next();
  });

  return router;
};