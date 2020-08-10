const mongoose = require('mongoose');

mongoose.set('debug', true); //log out all database transactions

mongoose.Promise= global.Promise; //enables promises and async

mongoose.connect('')