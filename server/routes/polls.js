const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../config/passport')

let Poll = require('../models/Polls');


router.route('/').get((req, res) => {
    Poll.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(400).json('Error ' + err))
})


router.route('/add',passport.authenticate('jwt', {session: false}) ).post((req,res) => {
    //const {id} = req.decode
   const {question, options} = req.body;

    const newPoll = new Poll ({
        question,
        options: options.map(option => ({ option, votes: 0 })),
    })

    newPoll.save()
    .then(() => res.json('Test Poll working'))
    .catch(() => res.status(400).json('error'))
}) 

module.exports = router