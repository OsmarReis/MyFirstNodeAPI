//config to use the .env variables
require('dotenv').config();

//importing express method for server communication
const express = require('express');
//importing mongoose for database connection
const mongoose = require('mongoose');
const app = express();

//creating a database connection and initializing it
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection opened successfully'));

//enable the server to accept json as a body
app.use(express.json());

//creating routes for the api
const subsRouter = require('./routes/subs');
app.use('/subs', subsRouter);

app.listen(3000, () => {console.log("Server Running")});