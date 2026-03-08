// backend/routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, item } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [], totalPrice: 0 });
  }

  cart.items.push(item);
  cart.totalPrice += item.price * item.quantity;
  await cart.save();

  res.json(cart);
});

// Get cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

// Checkout (place order)
router.post('/checkout', async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId });

  if (!cart) return res.status(400).json({ error: 'Cart not found' });

  // Here you’d integrate payment gateway
  // For now, just clear cart
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.json({ message: 'Order placed successfully!' });
});

module.exports = router;