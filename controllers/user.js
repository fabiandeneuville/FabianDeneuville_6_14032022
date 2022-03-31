/******************** USER CONTROLLER CONFIGURATION ********************/

/* Importing bcrypt */
const bcrypt = require('bcrypt');

/* Importing crypto-js */
const cryptoJs = require('crypto-js');

/* Importing jsonwebtoken */
const jwt = require('jsonwebtoken')

/* Using dotenv to hide JWT_SECRET_TOKEN */
require('dotenv').config();
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

/* Importing User model */
const User = require('../models/User');

/* Importing email-validator and password-validator plugins */
const mailValidator = require('email-validator');
const passwordValidator = require('password-validator');

/* Creating a validation schema for passwords */
const schema = new passwordValidator();

schema
.is().min(8)
.is().max(16)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()

/* Creating the signup middleware to create new users */
exports.signup = (req, res, next) => {
    /* Checking email validity */
    if(!mailValidator.validate(req.body.email)){
       return res.status(500).json({message : "Adresse email non valide"})
    /* Checking password validity */
    } else if (!schema.validate(req.body.password)){
        return res.status(500).json({message : "Mot de passe non valide - Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, pour 8(min) à 16(max) caractères."})
    } else {
    /* If email and password are valid, encrypting email and password before creating new user */
    const cryptedEmail = cryptoJs.SHA256(req.body.email, process.env.EMAIL_ENCRYPTION_KEY).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: cryptedEmail,
            password: hash
        });
        /* Saving the user in the database */
        user.save()
        .then(() => res.status(201).json({message : 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}))
    }
};

/* Creating the login middleware to connect existing users */
exports.login = (req, res, next) => {
    /* Encrypting the email to find the user in the database */
    const cryptedEmail = cryptoJs.SHA256(req.body.email, process.env.EMAIL_ENCRYPTION_KEY).toString();
    User.findOne({email: cryptedEmail})
    .then(user => {
        if(!user){
            return res.status(401).json({message: "Aucun utilisateur ne correspond !"})
        }
        /* Comparing request password with user password */
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message : "Mot de passe incorrect !"})
            }
            /* If the user is found, returning userId and authentication's token */
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    JWT_SECRET_TOKEN,
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};