// backend/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number
});

module.exports = mongoose.model('Cart', cartSchema);