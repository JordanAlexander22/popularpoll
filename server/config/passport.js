const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const AuthTokenStrategy = require('passport-auth-token').Strategy
const User = require('../models/Users')


const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token;
}

// authorization
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "shhhh its a secret"
}, (payload, done)=>{
    User.findById({_id: payload.sub}, (err, user) =>{
        if(err)
            return done(err,false)
        if(user)
            return done(null,user)
        else
            return done(null,false)
    });
}));


//midware for authentication for username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err,user) => {
        //something went wrong 
        if(err)
            return done(err);
        //if no user exists
        if(!user)
            return done(null,false);
        //check if passsword is correct
        user.validatePassword(password,done)
    })
}));


//token auth 
passport.use('authtoken', new AuthTokenStrategy(
    function(token, done) {
      AccessToken.findOne({
        id: token
      }, function(error, accessToken) {
        if (error) {
          return done(error);
        }
  
        if (accessToken) {
          if (!token.isValid(accessToken)) {
            return done(null, false);
          }
  
          User.findOne({
            id: accessToken.userId
          }, function(error, user) {
            if (error) {
              return done(error);
            }
  
            if (!user) {
              return done(null, false);
            }
  
            return done(null, user);
          });
        } else {
          return done(null);
        }
      });
    }
  ));
