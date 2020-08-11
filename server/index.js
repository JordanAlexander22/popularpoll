const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const handle= require('./handlers')

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./models');
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true
// }
// )
// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// });


app.use(cors()); 
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/', (req, res) => res.json({hello: 'world'}))


app.use(handle.notFound)

app.use(handle.errors)


app.listen(port, console.log(`server listening on ${port}`))

