import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';


const Dashboard1 = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    totalDonations: 12,
    mealsDonated: 148,
    kgSaved: 45,
    co2Reduced: 86
  };
  
  const activeDonations = [
    { id: 1, type: 'Cooked Food', quantity: '5 servings', expiry: '2025-04-01 18:00', status: 'Available' },
    { id: 2, type: 'Vegetables', quantity: '3 kg', expiry: '2025-04-02 12:00', status: 'Reserved' }
  ];
  
  const handleCreateDonation = () => {
    navigate('/create-donation');
  };
  
  const handleNotifications = () => {
    navigate('/notifications');
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="notification-icon" onClick={handleNotifications}>
          <span className="notification-badge">3</span>
          <span className="material-icons">notifications</span>
        </div>
      </div>
      
      <div className="impact-summary">
        <h2>Your Impact</h2>
        <div className="impact-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.totalDonations}</span>
            <span className="stat-label">Donations</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.mealsDonated}</span>
            <span className="stat-label">Meals</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.kgSaved}</span>
            <span className="stat-label">Kg Saved</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.co2Reduced}</span>
            <span className="stat-label">CO₂ Reduced</span>
          </div>
        </div>
      </div>
      
      <button className="create-donation-btn" onClick={handleCreateDonation}>
        <span className="material-icons">add</span>
        Create New Donation
      </button>
      
      <div className="active-donations">
        <div className="section-header">
          <h2>Active Donations</h2>
          <button className="view-all-btn">View All</button>
        </div>
        
        {activeDonations.length > 0 ? (
          <div className="donation-list">
            {activeDonations.map(donation => (
              <div className="donation-card" key={donation.id}>
                <div className="donation-status">
                  <span className={`status-badge ${donation.status.toLowerCase()}`}>
                    {donation.status}
                  </span>
                </div>
                <div className="donation-info">
                  <h3>{donation.type}</h3>
                  <div className="donation-details">
                    <div className="detail-item">
                      <span className="material-icons">inventory_2</span>
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="material-icons">schedule</span>
                      <span>Expires: {new Date(donation.expiry).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="material-icons">inventory</span>
            <p>No active donations</p>
            <p>Create a new donation to share food with your community</p>
          </div>
        )}
      </div>
      
      <div className="recent-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon picked">✓</span>
            <div className="activity-content">
              <p>Your vegetables donation was picked up</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon created">+</span>
            <div className="activity-content">
              <p>You created a new bread donation</p>
              <span className="activity-time">4 days ago</span>
            </div>
          </div>
        </div>
      </div>
      
  
    </div>
  );
};

export default Dashboard1;