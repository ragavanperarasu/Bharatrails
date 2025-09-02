require('dotenv').config();
const mongoose = require('mongoose');

const gctuserURI = process.env.DB;

const gctuserConnection = mongoose.createConnection(gctuserURI);

gctuserConnection.on('connected', () => {
  console.log('✅ MongoDB gctuser DB connected successfully');
});

gctuserConnection.on('error', (err) => {
  console.error('❌ MongoDB gctuser DB connection error:', err);
});

gctuserConnection.on('disconnected', () => {
  console.log('⚠️ MongoDB gctuser DB disconnected');
});

module.exports = gctuserConnection;

