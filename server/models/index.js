const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;


mongoose.set('debug', true); //log out all database transactions

mongoose.Promise= global.Promise; //enables promises and async


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true
}
)
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

module.exports.Users = require('./Users');

module.exports.Polls = require('./Polls');