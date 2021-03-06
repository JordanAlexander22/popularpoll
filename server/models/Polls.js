const mongoose = require('mongoose');

const Schema = mongoose.Schema;


optionSchema = new Schema ({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})


//keep tracks of ids of user objects
const pollSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [optionSchema],
    voted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    created: {
        type:Date,
        default: Date.now()
    }
})

const Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll 