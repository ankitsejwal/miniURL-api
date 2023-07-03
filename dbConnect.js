require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function () {
  const connectionString = process.env.MONGO_CONNECTION_STRING;
  // check if connection string is available
  if (!connectionString) {
    console.log('FATAL ERROR: MONGO_CONNECTION_STRING is not available');
    process.exit(1);
  }
  // connect to database
  mongoose.connect(connectionString);
  mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
  mongoose.connection.on('disconnected', () => console.log('disconnected to database'));
  mongoose.connection.on('error', (error) => console.log(`MongoDB connection error: ${error}`));
};

// latest
