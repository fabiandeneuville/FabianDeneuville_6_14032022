/******************** SAUCE MODEL CONFIGURATION ********************/

/* Importing express */
const mongoose = require('mongoose');

/* Creating sauce schema */
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, defaut: 0},
    dislikes: {type: Number, defaut: 0},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]} 
})

/* Exporting sauce schema as model */
module.exports = mongoose.model('Sauce', sauceSchema);