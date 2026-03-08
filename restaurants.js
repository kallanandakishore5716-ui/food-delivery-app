// backend/routes/restaurants.js
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// Add restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.json(restaurant);
});

module.exports = router;