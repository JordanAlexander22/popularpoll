const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//const handle= require('./handlers')

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./models');
const usersRouter = require('./routes/users')


app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/', (req, res) => res.json({hello: 'world'}))


app.use('/users', usersRouter)






app.listen(port, console.log(`server listening on ${port}`))

