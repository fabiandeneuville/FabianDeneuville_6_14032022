/******************** EXPRESS APPLICATION CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Importing mongoose */
const mongoose = require('mongoose');

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

/* Exporting the express app to be used on other files */
module.exports = app;