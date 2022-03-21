/******************** USER CONTROLLER CONFIGURATION ********************/

/* Importing bcrypt */
const bcrypt = require('bcrypt');

/* Importing User model */
const User = require('../models/User');

/* Creating the signup middleware to create new users */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message : 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}))
};

/* Creating the login middleware to connect existing users */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error})
            }
            res.status(200).json({
                userId: user._id,
                token: 'TOKEN'
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};