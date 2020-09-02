const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

//const handle= require('./handlers')

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./models');
//const cookieParser = require('cookie-parser');

const usersRouter = require('./routes/users')
const pollsRouter = require('./routes/polls')

//app.use(cookieParser)
app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/', (req, res) => res.json({hello: 'world'}))


app.use('/users', usersRouter)
app.use('/polls', pollsRouter)






app.listen(port, console.log(`server listening on ${port}`))

