const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../config/passport')
const Jwt = require('jsonwebtoken');


let User = require('../models/Users')

const signToken = userID =>{
  return Jwt.sign({
      iss : 'Jordan',
      sub : userID
    }, "shhhh its a secret", {expiresIn : "1h"})
  }

//register
router.post('/register',(req, res) => {
    const {username, password, email} = req.body;
    //check if user exists
    User.findOne({username}, (err,user) => {
      if(err)
        res.status(500).json({message: {msgBody: "error has occured", msgError: true}})
      if(user)
      res.status(400).json({message: {msgBody: "username or email already exists", msgError: true}})
      else{
        const newUser= new User({username, password, email})
        newUser.save(err=>{
          if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
            else
            res.status(201).json({message: {msgBody: "User added!", msgError: false}})
        }); 
      }
    })
  })


//login
router.post('/login', passport.authenticate('local', {session : false}), (req,res)=> {
  if(req.isAuthenticated()){
    const {_id, username, email} = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
    res.status(200).json({isAuthenticated : true, user : {username, email}})
  }
})

//log out
router.get('/logout', passport.authenticate('jwt', {session: false}), (req,res) => {
res.clearCookie('access_token');
res.json({user: {username: '', email: ''}, success : true});
}
)



module.exports = router;