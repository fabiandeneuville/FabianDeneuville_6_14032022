/******************** SAUCE CONTROLLER CONFIGURATION ********************/

/* Importing Sauce model */
const Sauce = require('../models/Sauce');

/* creating the function to POST a new sauce */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      likes:0,
      dislikes:0,
      userDisliked: [],
      userLiked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
      .then(() => res.status(201).json({message: 'Sauce ajoutée'}))
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
    Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifiée'}))
    .catch(error => res.status(400).json({error}));
  };

/* Creating the function to DELETE one specific sauce */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id:req.params.id})
    .then((sauce) => {
        if(!sauce){
            return res.status(404).json({error});
        }
        if(sauce.userId !== req.auth.userId){
            return res.status(401).json({error});
        }
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce supprimée'}))
        .catch(error => res.status(400).json({error}))
    })
};

