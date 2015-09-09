(function(){
  var nodemailer = require('nodemailer'),
      transport = nodemailer.createTransport({
        host: "mailtrap.io",
        port: 2525,
        auth: {
          user: "248602b79b30a5c6e",
          pass: "5921140d9bf03e"
        }
      });
  module.exports = {
    sendEmail: function(to, subject, body, callback){
      var mailOptions = {
        from: 'demo@ivppiter.com',
        to: to,
        subject: subject,
        html: body
      };

      transport.sendMail(mailOptions, function(err, info){
        callback(err);
      });
    }
  };
})();