/******************** EXPRESS APPLICATION CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Importing mongoose */
const mongoose = require('mongoose');

/* Using dotenv to hide DB connection informations */
require('dotenv').config();
const dbUserName = process.env.dbUserName;
const dbPassword = process.env.dbPassword;

/* Conncting the express application to the MongoDB database */
mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@cluster0.12gfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* Creating the express app using the express method */
const app = express();

/* Specifying specific access control headers for all the response objects to allow cross-origin requests (and prevent CORS errors) */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/* Exporting the express app to be used on other files */
module.exports = app;