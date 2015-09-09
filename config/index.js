exports.getConnectionString = function(){
  var dbConfig;
  try{
    dbConfig = require('./db-' + process.env.ENV + '.js')
  } catch (_){
    dbConfig = require('./db.js');
  }

  if(!dbConfig){
    throw 'Unable to load db configuration';
  }

  return dbConfig.connectionString;
};