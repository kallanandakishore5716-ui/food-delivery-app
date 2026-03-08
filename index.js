// frontend/pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div>
      <h1>Food Delivery App</h1>
      <ul>
        {restaurants.map(r => (
          <li key={r._id}>{r.name} - {r.cuisine}</li>
        ))}
      </ul>
    </div>
  );
}