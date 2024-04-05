const passport = require("passport");

async function loginController(req,res,next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err); 
      }
      if (!user) {
        return res.send({ message: info.message });
      }
      req.login(user, function(err){
        if(err){
          return next(err);
        }
        return res.send({ success : true, message : 'authentication succeeded' });        
      });
    })(req, res, next);
  }

module.exports = loginController;