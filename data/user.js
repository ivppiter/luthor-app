(function() {
  function create_hash(value){
    var hash = require('crypto').createHash('sha512');
    hash.update(value);
    return hash.digest('hex');
  }

  module.exports = {
    add_user: function(db, user_object, callback){
      user_object.token = {
        created_on: Date.now(),
        value: create_hash(user_object.username + Date.now().toString()),
        is_redeemed: false
      };
      db.collection('user').insert(user_object, callback)
    },
    activate_user: function(db, username, token, callback){
      db.collection('user').findOne({ username: username, "token.value": token, "token.is_redeemed": false}, function(err, result){
        if(err || Date.now() - result.token.created_on > 1200000){
          callback(err)
        }
        else{
          db.collection('user').update({username: username}, {'$push' : {token: {is_redeemed: true}}});
          callback(null, result);
        }
      })
    },
    authenticate_user: function(db, email, password, callback){
      db.collection('user').findOne({ email: email, password: create_hash(password)}, callback);
    },
    any_user_matches: function(db, username, email, callback){
      db.collection('user').find({"$or" : [{"username" : username}, {"email" : email}]}).toArray(function(err, result){
        if(err) result = [];

        callback({
          username_match : result.filter(function(u){return u.username == username}).length > 0,
          email_match : result.filter(function(u){ return u.email == email }).length > 0
        });
      })
    }
  };
})();