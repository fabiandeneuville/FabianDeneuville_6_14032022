/******************** SAUCE CONTROLLER CONFIGURATION ********************/

/* Importing Sauce model */
const Sauce = require('../models/Sauce');

/* Importing the Node File System package */
const fs = require('fs');

/* Creating a regex to check the validity of the req inputs ro avoid injections */
const regexInputs = /^[a-zA-Z0-9 _.,!()&éêèàçùîï]+$/

/* creating the function to POST a new sauce */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    /* Checking the validity of the request inputs to avoid injection */
    if(
      !regexInputs.test(sauceObject.name)|| 
      !regexInputs.test(sauceObject.manufacturer)||
      !regexInputs.test(sauceObject.description)||
      !regexInputs.test(sauceObject.mainPepper)||
      !regexInputs.test(sauceObject.hear)){
        return res.status(401).json({message : "Certains champs sont renseignés avec des caractères invalides"})
    }
    /* If the inputs are valid, creating a new sauce using the sauce model */
    const sauce = new Sauce({
      ...sauceObject,
      likes:0,
      dislikes:0,
      userDisliked: [],
      userLiked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    /* Saving the sauce in the database */
    sauce.save()
      .then(() => res.status(201).json({message: "Sauce ajoutée"}))
      .catch(error => res.status(400).json({error}));
  };

/* Creating the function to GET all sauces */
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({error}))
  };

/* Creating the function to GET a specific sauce */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
  };

/* Creating the function to modify (PUT) one specific sauce */
exports.modifySauce = (req, res, next) => {
    /* Using ternary operator to handle the two possibilities */
    const sauceObject = req.file ?
    {
      /* If the put request comes with a new image file, parsing the request body and setting new imageUrl */
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      /* If the put request does not come with a new image file, defining sauceObject as ...req.body */
    } : { ...req.body};
    /* Checking the validity of the req inputs to avoid injection */
    if(
      !regexInputs.test(sauceObject.name)|| 
      !regexInputs.test(sauceObject.manufacturer)||
      !regexInputs.test(sauceObject.description)||
      !regexInputs.test(sauceObject.mainPepper)||
      !regexInputs.test(sauceObject.hear)){
        return res.status(401).json({message : "Certains champs sont renseignés avec des caractères invalides"})
    }
    /* If the inputs are valid, updating the sauce */
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: "Sauce modifiée"}))
    .catch(error => res.status(400).json({error}));
  };

/* Creating the function to DELETE one specific sauce */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      /* Retrieving of the filename in the imageUrl */
      const filename = sauce.imageUrl.split('/images')[1];
      /* Deleting image file */
      fs.unlink(`images/${filename}`, () => {
        /* Deleting the sauce */
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce supprimée"}))
        .catch(error => res.status(400).json({error}))
      })
    })
    .catch(error => res.status(500).json({error}));
};

/* Creating the function to handle the likes and dislikes */
exports.rateSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    /* The user has not already liked the sauce and the like choice is 1 (like) */
    if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
      /* Updating the sauce datas by incrementing the likes (+1) and pushing the userId into the usersLiked array */
      Sauce.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}})
      .then(() => res.status(200).json({message: "sauce likée"}))
      .catch(error => res.status(400).json({error}));
    /* The user has previously liked the sauce but cancels his choice (neutral) */
    } else if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
      /* Updating the sauce datas by decrementing the likes (-1) and pulling the userId from the usersLiked array */
      Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
      .then(() => res.status(200).json({message: "choix neutre"}))
      .catch(error => res.status(400).json({error}));
    /* The user has not already disliked the sauce and the like choice is -1 (dislike) */
    } else if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
      /* Updating the sauce datas by incrementing the dislikes (+1) and pushing the userId into the usersDisliked array */
      Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
      .then(() => res.status(200).json({message: "sauce dislikée"}))
      .catch(error => res.status(400).json({error}));
    /* The user has previously disliked the sauce but cancels his choice (neutral) */
    } else if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
      /* Updating the sauce datas by decrementing the dislikes (-1) and pulling the userId from the usersDisliked array */
      Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
      .then(() => res.status(200).json({message: "choix neutre"}))
      .catch(error => res.status(400).json({error}))
    } else {
      return res.status(401).json({message: "l'opération n'a pas pu être effectuée"})
    }
  })
  .catch(error => res.status(404).json({error}));
};