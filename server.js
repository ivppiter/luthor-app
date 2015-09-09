var express = require('express'),
    path = require('path'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());
app.use(require('cookie-parser')('your secret here but unique and stuff'));
app.use(require('express-session')({
  resave: false,
  secret: 'this is a really insecure session secret',
  saveUninitialized: false,
  name: 'luthor-token'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./lib/mongo')(require('./config').getConnectionString()));

if ('development' == app.get('env')) {
  app.use(require('errorhandler')());
}

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});