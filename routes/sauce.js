/******************** SAUCE ROUTER CONFIGURATION ********************/

/* Importing express */
const express= require('express');

/* Importing the express Router function */
const router = express.Router();

/* Importing the authentication middleware */
const auth = require('../middleware/auth');

/* Importing the sauce controller */
const sauceControl = require('../controllers/sauce');

/* Importing the multer configuration */
const multer = require('../middleware/multer-config')

/* Creating all routes using authentication, multer and connecting routes to the request functions located in the sauce controller */
router.post('/', auth, multer, sauceControl.createSauce); 
router.get('/', auth, sauceControl.getAllSauces);
router.get('/:id', auth, sauceControl.getOneSauce); 
router.put('/:id', auth, sauceControl.modifySauce); 
router.delete('/:id', auth, sauceControl.deleteSauce);

/* Exporting router*/
module.exports = router;




