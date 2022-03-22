/******************** AUTHENTICATION MIDDLEWARE CONFIGURATION ********************/

/* Importing jsonwebtoken */
const jwt = require('jsonwebtoken');

/* Exporting the authentication middleware */
module.exports = (req, res, next) => {
    try {
    /* Retrieving of the authorization token from the request headers */
    const token = req.headers.authorization.split(' ')[1];

    /* Decoding token with the verify() function */
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    /* Defining userId as the userId found in the decodedToken */
    const userId = decodedToken.userId;

    /* If the userId in the request is different from the userId returned by the previous operation, throwing an error */
    if (req.body.userId && req.body.userId !== userId) {
        throw 'User UD non valable';
    } else {
    /* If the userId in the request is identical to the userId returned by the previous operation, calling the next() function to execute the next middleware */
        next();
    }
    /* Handling errors */
    } catch (error) {
    res.status(401).json({error})
    }
};