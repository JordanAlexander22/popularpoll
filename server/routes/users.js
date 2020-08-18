const router = require('express').Router();

let User = require('../models/Users')


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;


  const newUser= new User({username, password, email})

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error:' + err));
});



module.exports = router;