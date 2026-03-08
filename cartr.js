// frontend/pages/cart.js
import { useState, useEffect } from 'react';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const userId = "123"; // Replace with logged-in user ID

  useEffect(() => {
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:5000/api/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart?.items.map((item, i) => (
        <div key={i}>
          {item.name} x {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}
      <h2>Total: ₹{cart?.totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}