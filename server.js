/******************** NODE SERVER CONFIGURATION ********************/

/* Importing node HTTP package */
const http = require('http');
/* Importing the express application */
const app = require('./app');


/* Creating a normalizePort function that returns a valid port, whether supplied as a number or a string */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/* Creating an errorHandler function that checks for errors and handles them appropriately */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Creating server using the createServer method from the node http package and setting the express application as parameter */
const server = http.createServer(app);

/*Saving the errorHandler function in the server */
server.on('error', errorHandler);

/* Creating an event listener to log the port or named pipe the server is running on in the console */
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/* Using the listen method from server to listen to port as defined */
server.listen(port);
