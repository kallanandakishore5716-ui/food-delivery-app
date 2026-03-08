// backend/models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  menu: [{ name: String, price: Number }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);