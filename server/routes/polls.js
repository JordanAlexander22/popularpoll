const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../config/passport')
const auth = require('../auth')

let Poll = require('../models/Polls');


router.route('/').get((req, res) => {
    Poll.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(400).json('Error ' + err))
})


router.post('/add',auth,(req,res,next) => {
    //const {id} = req.decoded
   const {question, options} = req.body;

    const newPoll = new Poll ({
        question,
        options: options.map(option => ({ option, votes: 0 })),
    })

    newPoll.save()
     .then(() => res.status(200))
     .catch(() => res.status(400).json('error'))
    next()
})



module.exports = router