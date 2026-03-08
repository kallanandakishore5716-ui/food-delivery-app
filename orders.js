// backend/routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Place order from cart
router.post('/place', async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const order = new Order({
    userId,
    items: cart.items,
    totalPrice: cart.totalPrice
  });

  await order.save();

  // Clear cart after placing order
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.json(order);
});

// Get user orders
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

// Update order status (admin use)
router.put('/:orderId/status', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.orderId);
  order.status = status;
  await order.save();
  res.json(order);
});

module.exports = router;