// frontend/pages/cart.js
import { useState, useEffect } from 'react';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const userId = "123"; // Replace with logged-in user ID

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (index) => {
    const updatedItems = cart.items.filter((_, i) => i !== index);
    const updatedCart = { ...cart, items: updatedItems };
    updatedCart.totalPrice = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCart(updatedCart);
    // Ideally, call backend to persist removal
  };

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:5000/api/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    alert(data.message);
    fetchCart(); // refresh cart after checkout
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart?.items.length > 0 ? (
        <>
          {cart.items.map((item, i) => (
            <div key={i}>
              {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              <button onClick={() => handleRemove(i)}>Remove</button>
            </div>
          ))}
          <h2>Total: ₹{cart?.totalPrice}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}