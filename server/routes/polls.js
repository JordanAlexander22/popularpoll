const router = require('express').Router();

let Poll = require('../models/Polls');


router.route('/').get((req, res) => {
    Poll.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(400).json('Error ' + err))
})


router.route('/add').post((req,res) => {
    //const {id} = req.decode
    const question = req.body.question;
    const options = req.body.options;

    const newPoll = new Poll ({
        question,
        options: options.map(option => ({ option, votes: 0 })),
    })

    newPoll.save()
    .then(() => res.json('Test Poll working'))
    .catch(() => res.status(400).json('error'))
}) 

module.exports = router