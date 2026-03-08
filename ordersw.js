// frontend/pages/orders.js
import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = "123"; // Replace with logged-in user ID

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order._id}>
          <h3>Order #{order._id}</h3>
          <p>Status: {order.status}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          <p>Total: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}