(function _apiModule() {
  function login_action(req, res) {
    function generateToken(){
      var crypto = require('crypto'),
          hash = crypto.createHash('sha512');
      hash.update(crypto.randomBytes(512));
      return hash.digest('hex');
    }

    console.log('login in user');

    var Users = require('../../data').Users;
    Users.authenticate_user(req.db, req.body.email, req.body.password, function(err, result){
      if(!result){
        res.status(400);
        res.json({
          success: false,
          message: 'Unable to validate'
        })
      }
      else{
        req.session.token = generateToken();
        req.session.token_created = Date.now();
        req.session.username = result.username;
        res.json({
          success: true,
          username: result.username
        });
      }
    });
  }

  function logout_action(req, res) {
    req.session.destroy(function(err){
      res.json({
        success: true
      })
    });
  }

  function create_hash(value){
    var hash = require('crypto').createHash('sha512');
    hash.update(value);
    return hash.digest('hex');
  }

  function before_registration(req, res, next){
    if(req.body.email &&
      req.body.username &&
      req.body.password){
      next();
    }
    else {
      res.status(400);
      res.json({
        message: 'missing values'
      })
    }
  }

  function validate_registration(req, res, next){
    var Users = require('../../data').Users;

      Users.any_user_matches(req.db, req.body.username, req.body.email, function(matches){
        if(matches.username_match){
          res.status(400);
          res.json({
            success: false,
            message: 'Username already registered'
          })
        }
        else if(matches.email_match){
          res.status(400);
          res.json({
            success: false,
            message: 'Email already registered'
          })
        }
        else{
          next()
        }
      });
  }

  function do_registration(req, res) {
    var user = {
      username: req.body.username,
      password: create_hash(req.body.password),
      email: req.body.email,
      requires_activation: true
    };

    require('../../data').Users.add_user(req.db, user, function(err){
      if(err) {
        res.status(400);
        res.json({
          success: false,
          message: 'Unable to create user'
        })
      }
      else {
        console.log('created user');
        if(err){
          res.status(400);
          res.json({success: false, message: 'Unable to register account'});
        }
        else {
          res.json({ success: true });
        }
      }
    })
  }

  function validate_activation(req, res, next){
    if(req.body.username && req.body.token){
      next();
    }
    else{
      res.status(400);
      res.json({
        success: false,
        message: 'Invalid value'
      })
    }
  }

  function do_activation(req, res){
    require('../../data').Users.activate_user(req.db, req.body.username, req.body.token, function(err, user){
      if(err){
        res.status(400);
        res.json({
          success: false,
          message: 'Unable to redeem token'
        })
      }
      else {
        res.json({
          success: true,
          message: 'Token redeemed'
        })
      }
    })
  }

  var route = require('express').Router();

  route.post('/login', login_action);
  route.post('/logout', logout_action);
  route.post('/register', before_registration, validate_registration, do_registration);
  route.post('/activate', validate_activation, do_activation);

  module.exports = route;
})();