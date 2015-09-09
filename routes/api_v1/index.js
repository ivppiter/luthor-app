(function _api_v1_module() {
  function is_authenticated(req, res, next){
    if(req.session.token && (!req.session.token_created || Date.now() - req.session.token_created < 259200000)){
      next();
    }
    else{
      res.status(401);
      res.json({
        loginUrl: '/api/login'
      });
    }
  }

  function internal_action(req, res){
    res.json({
      username: req.session.username,
      internal: 'private data'
    })
  }

  var route = require('express').Router();

  route.use(is_authenticated);
  route.get('/internal', internal_action);

  module.exports = route;
})();