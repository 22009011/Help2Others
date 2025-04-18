import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeliveryDashboard = () => {
  const [district, setDistrict] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const districts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'
  ];

  const fetchDeliveries = async () => {
    if (!district) {
      alert('Please select a district');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donors?district=${encodeURIComponent(district)}`
      );
      if (res.data.success) {
        // Only show verified and not delivered
        setDeliveries(res.data.donors.filter(d => d.status === 'verified'));
      }
    } catch (error) {
      alert('Failed to fetch deliveries');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDelivered = async (donationId) => {
    const delivery = deliveries.find(d => d.donation_id === donationId);
    if (!donationId || !delivery) {
      alert('Invalid donation.');
      return;
    }
    if (delivery.status === 'delivered') {
      alert('This donation is already marked as delivered.');
      return;
    }
    try {
      await axios.patch(
        `http://localhost:5000/api/donations/${donationId}/status`,
        { status: 'delivered' }
      );
      setDeliveries(deliveries =>
        deliveries.map(d =>
          d.donation_id === donationId ? { ...d, status: 'delivered' } : d
        )
      );
      alert('Marked as delivered!');
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Delivery Dashboard</h2>
      <div>
        <label>Select District: </label>
        <select value={district} onChange={e => setDistrict(e.target.value)}>
          <option value="">-- Select --</option>
          {districts.map((d, idx) => (
            <option key={idx} value={d}>{d}</option>
          ))}
        </select>
        <button onClick={fetchDeliveries} disabled={loading}>
          {loading ? 'Loading...' : 'Get Deliveries'}
        </button>
      </div>
      <hr />
      <h3>Verified Donations (Ready for Delivery)</h3>
      {deliveries.length > 0 ? (
        <ul>
          {deliveries.map(delivery => (
            <li key={delivery.donation_id}>
              <strong>{delivery.food_type}</strong> - {delivery.description || 'No description'}<br />
              Quantity: {delivery.quantity} {delivery.unit}<br />
              Address: {delivery.address}, {delivery.city}, {delivery.zip_code}<br />
              <button
                disabled={delivery.status === 'delivered'}
                onClick={() => handleMarkDelivered(delivery.donation_id)}
              >
                {delivery.status === 'delivered' ? 'Delivered' : 'Mark as Delivered'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No verified donations for delivery.</p>
      )}
    </div>
  );
};

export default DeliveryDashboard;