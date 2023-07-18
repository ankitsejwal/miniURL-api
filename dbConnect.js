const mongoose = require('mongoose');

module.exports = function () {
  // check for secrets
  checkSecrets();

  // connect to database
  mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
  mongoose.connection.on('disconnected', () => console.log('disconnected to database'));
  mongoose.connection.on('error', (error) => console.log(`MongoDB connection error: ${error}`));
};

function checkSecrets() {
  // check if secrets are available
  if (!process.env.MONGO_CONNECTION_STRING) {
    console.log('FATAL ERROR: MONGO_CONNECTION_STRING is not available');
    process.exit(1);
  }

  if (!process.env.JWT_PVT_KEY) {
    console.log('FATAL ERROR: JWT_TOKEN is not available');
    process.exit(1);
  }
}
