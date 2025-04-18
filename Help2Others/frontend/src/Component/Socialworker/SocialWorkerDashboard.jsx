import React, { useState } from 'react';
import axios from 'axios';
import './SocialWorkerDashboard.css';

const SocialWorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [district, setDistrict] = useState('');
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [verificationChecklist, setVerificationChecklist] = useState({
    freshness: false,
    packaging: false,
    temperature: false,
    expiration: false,
    quantity: false,
  });
  
  const [verificationNotes, setVerificationNotes] = useState('');
  const [temperatureReading, setTemperatureReading] = useState('');
  const [photo, setPhoto] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'verification'

  const selectDonation = (donation) => {
    setSelectedDonation(donation);
    setCurrentView('verification');
    resetVerificationForm();
  };

  const resetVerificationForm = () => {
    setVerificationChecklist({
      freshness: false,
      packaging: false,
      temperature: false,
      expiration: false,
      quantity: false,
    });
    setVerificationNotes('');
    setTemperatureReading('');
    setPhoto(null);
  };

  const handleChecklistChange = (field) => {
    setVerificationChecklist({
      ...verificationChecklist,
      [field]: !verificationChecklist[field],
    });
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const allChecklistItemsCompleted = () => {
    return Object.values(verificationChecklist).every(item => item);
  };

  const approveDonation = async () => {
    if (!allChecklistItemsCompleted()) {
      alert('Please complete all verification checklist items before approving.');
      return;
    }
    if (!selectedDonation || !selectedDonation.donation_id) {
      alert('Invalid donation selected.');
      return;
    }
    console.log('Approving donation_id:', selectedDonation.donation_id);
    try {
      await axios.patch(
        `http://localhost:5000/api/donations/${selectedDonation.donation_id}/status`,
        { status: 'verified' }
      );
      const updatedDonations = donations.map(donation => {
        if (donation.donation_id === selectedDonation.donation_id) {
          return { ...donation, status: 'verified' };
        }
        return donation;
      });
      setDonations(updatedDonations);
      alert(`Notification sent to picker for donation #${selectedDonation.donation_id}`);
      setCurrentView('list');
      setSelectedDonation(null);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const rejectDonation = async () => {
    if (!verificationNotes) {
      alert('Please provide rejection reason in the notes');
      return;
    }
    if (!selectedDonation || !selectedDonation.donation_id) {
      alert('Invalid donation selected.');
      return;
    }
    console.log('Rejecting donation_id:', selectedDonation.donation_id);
    try {
      await axios.patch(
        `http://localhost:5000/api/donations/${selectedDonation.donation_id}/status`,
        { status: 'rejected' }
      );
      const updatedDonations = donations.map(donation => {
        if (donation.donation_id === selectedDonation.donation_id) {
          return { ...donation, status: 'rejected' };
        }
        return donation;
      });
      setDonations(updatedDonations);
      alert(`Donation #${selectedDonation.donation_id} has been rejected`);
      setCurrentView('list');
      setSelectedDonation(null);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const renderDonationCard = (donation) => {
    return (
      <div key={donation.donation_id} className={`donation-card priority-${donation.priority}`}>
        <div className="donation-card-header">
          <span className="donation-id">#{donation.donation_id}</span>
          <span className={`priority-badge ${donation.priority}`}>
            {donation.priority}
          </span>
        </div>
        <div className="donation-card-content">
          <h4>{donation.donor}</h4>
          <p><strong>Food:</strong> {donation.foodType}</p>
          <p><strong>Qty:</strong> {donation.quantity}</p>
          <p><strong>Location:</strong> {donation.pickupLocation}</p>
          <p className="time-received"><strong>Received:</strong> {donation.timeReceived}</p>
        </div>
        <div className="donation-card-actions">
          <button 
            className="btn verify-btn"
            onClick={() => selectDonation(donation)}
          >
            Verify
          </button>
        </div>
      </div>
    );
  };

  const renderDonationsList = () => {
    return (
      <div className="donations-list">
        <h3>Pending Food Donations</h3>
        <div className="donation-cards-container">
          {donations.filter(d => d.status === 'pending').map(donation => 
            renderDonationCard(donation)
          )}
        </div>
      </div>
    );
  };

  const renderVerificationModule = () => {
    if (!selectedDonation) {
      return null;
    }

    return (
      <div className="verification-module">
        <div className="verification-header">
          <button 
            className="back-button"
            onClick={() => {
              setCurrentView('list');
              setSelectedDonation(null);
            }}
          >
            &larr; Back
          </button>
          <h3>Food Quality Verification</h3>
        </div>

        <div className="donation-details">
          <h4>Verifying Donation #{selectedDonation.donation_id}</h4>
          <p><strong>Donor:</strong> {selectedDonation.donor}</p>
          <p><strong>Food Type:</strong> {selectedDonation.foodType}</p>
          <p><strong>Quantity:</strong> {selectedDonation.quantity}</p>
          <p><strong>Pickup Location:</strong> {selectedDonation.pickupLocation}</p>
        </div>

        <div className="verification-checklist">
          <h4>Quality Checklist</h4>
          <div className="checklist-item">
            <input 
              type="checkbox" 
              id="freshness" 
              checked={verificationChecklist.freshness}
              onChange={() => handleChecklistChange('freshness')}
            />
            <label htmlFor="freshness">Food appears fresh and edible</label>
          </div>
          <div className="checklist-item">
            <input 
              type="checkbox" 
              id="packaging" 
              checked={verificationChecklist.packaging}
              onChange={() => handleChecklistChange('packaging')}
            />
            <label htmlFor="packaging">Packaging is intact and clean</label>
          </div>
          <div className="checklist-item">
            <input 
              type="checkbox" 
              id="temperature" 
              checked={verificationChecklist.temperature}
              onChange={() => handleChecklistChange('temperature')}
            />
            <label htmlFor="temperature">Temperature is appropriate</label>
          </div>
          <div className="temperature-field">
            <input 
              type="text" 
              placeholder="Temperature reading (if applicable)"
              value={temperatureReading}
              onChange={(e) => setTemperatureReading(e.target.value)}
              className="temperature-input"
            />
          </div>
          <div className="checklist-item">
            <input 
              type="checkbox" 
              id="expiration" 
              checked={verificationChecklist.expiration}
              onChange={() => handleChecklistChange('expiration')}
            />
            <label htmlFor="expiration">Not expired / Within use-by date</label>
          </div>
          <div className="checklist-item">
            <input 
              type="checkbox" 
              id="quantity" 
              checked={verificationChecklist.quantity}
              onChange={() => handleChecklistChange('quantity')}
            />
            <label htmlFor="quantity">Quantity matches donation description</label>
          </div>
        </div>

        <div className="verification-documentation">
          <h4>Documentation</h4>
          <div className="photo-upload">
            <label className="photo-upload-label">Upload Photo Evidence:
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>
            {photo && (
              <div className="photo-preview">
                <img src={photo} alt="Food documentation" />
              </div>
            )}
          </div>
          <div className="notes-section">
            <label>Verification Notes:</label>
            <textarea
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              placeholder="Enter any observations, concerns, or special handling instructions..."
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="verification-actions">
          <button 
            className="btn reject-btn"
            onClick={rejectDonation}
          >
            Reject Donation
          </button>
          <button 
            className="btn approve-btn"
            onClick={approveDonation}
            disabled={!allChecklistItemsCompleted()}
          >
            Approve & Notify Picker
          </button>
        </div>
      </div>
    );
  };

  const renderNotificationSystem = () => {
    return (
      <div className="notifications-panel">
        <h3>Notification History</h3>
        <div className="notification-cards-container">
          <div className="notification-card">
            <div className="notification-card-header">
              <span className="notification-id">Donation #5</span>
              <span className="status delivered">Delivered</span>
            </div>
            <div className="notification-card-content">
              <p><strong>Recipient:</strong> John (Picker)</p>
              <p><strong>Time Sent:</strong> 2025-03-31 08:45</p>
            </div>
            <div className="notification-card-actions">
              <button className="btn small">View Details</button>
            </div>
          </div>
          
          <div className="notification-card">
            <div className="notification-card-header">
              <span className="notification-id">Donation #4</span>
              <span className="status read">Read</span>
            </div>
            <div className="notification-card-content">
              <p><strong>Recipient:</strong> Maria (Picker)</p>
              <p><strong>Time Sent:</strong> 2025-03-30 14:20</p>
            </div>
            <div className="notification-card-actions">
              <button className="btn small">View Details</button>
            </div>
          </div>
          
          <div className="notification-card">
            <div className="notification-card-header">
              <span className="notification-id">Donation #3</span>
              <span className="status pending">Pending</span>
            </div>
            <div className="notification-card-content">
              <p><strong>Recipient:</strong> Alex (Picker)</p>
              <p><strong>Time Sent:</strong> 2025-03-30 11:30</p>
            </div>
            <div className="notification-card-actions">
              <button className="btn small">Resend</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReportingTool = () => {
    return (
      <div className="reporting-panel">
        <h3>Issue Reporting</h3>
        <div className="report-form">
          <div className="form-group">
            <label>Issue Type:</label>
            <select>
              <option value="">Select issue type...</option>
              <option value="food_quality">Food Quality Issue</option>
              <option value="donor_issue">Donor Issue</option>
              <option value="delivery_problem">Delivery Problem</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Related Donation (if applicable):</label>
            <input type="text" placeholder="Donation ID" />
          </div>
          <div className="form-group">
            <label>Issue Severity:</label>
            <select>
              <option value="">Select severity...</option>
              <option value="low">Low - Informational only</option>
              <option value="medium">Medium - Requires attention</option>
              <option value="high">High - Urgent action needed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Issue Description:</label>
            <textarea rows={4} placeholder="Describe the issue in detail..."></textarea>
          </div>
          <div className="form-group">
            <label className="photo-upload-label">Attach Evidence:
              <input type="file" accept="image/*" />
            </label>
          </div>
          <div className="form-actions">
            <button className="btn submit-btn">Submit Report</button>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTabContent = () => {
    if (activeTab === 'donations' && currentView === 'verification') {
      return renderVerificationModule();
    }
    
    switch(activeTab) {
      case 'donations':
        return renderDonationsList();
      case 'notifications':
        return renderNotificationSystem();
      case 'reports':
        return renderReportingTool();
      default:
        return renderDonationsList();
    }
  };

  // Fetch donations for selected district
  const fetchDonations = async () => {
    if (!district) {
      alert('Please select a district');
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donors?district=${encodeURIComponent(district)}`
      );
      if (res.data.success) {
        // Map backend fields to frontend fields if needed
        setDonations(res.data.donors.map(d => ({
          donation_id: d.donation_id, // always map donation_id
          donor: d.donor || d.address || 'Unknown',
          foodType: d.food_type,
          quantity: `${d.quantity} ${d.unit}`,
          pickupLocation: d.address,
          timeReceived: d.created_at || '',
          priority: d.priority || 'medium',
          status: d.status || 'pending',
          // ...add other fields as needed
        })));
      }
    } catch (err) {
      alert('Failed to fetch donations');
    }
  };

  return (
    <div className="social-worker-dashboard mobile">
      <header className="dashboard-header">
        <div className="profile-section">
          <div className="profile-image">
            <img src="/api/placeholder/40/40" alt="Profile" />
          </div>
          <div className="profile-info">
            <h3>Sarah Johnson</h3>
            <p>Social Worker ID: SW-2025-0042</p>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div style={{ margin: '10px 0' }}>
          <label>Select District: </label>
          <select value={district} onChange={e => setDistrict(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Madurai">Madurai</option>
            <option value="Tiruchirappalli">Tiruchirappalli</option>
          </select>
          <button onClick={fetchDonations}>Fetch Donations</button>
        </div>
        {renderActiveTabContent()}
      </main>

      <nav className="dashboard-nav">
        <ul>
          <li className={activeTab === 'donations' ? 'active' : ''}>
            <button onClick={() => {
              setActiveTab('donations');
              setCurrentView('list');
            }}>
              Donations
            </button>
          </li>
          <li className={activeTab === 'notifications' ? 'active' : ''}>
            <button onClick={() => setActiveTab('notifications')}>
              Notifications
            </button>
          </li>
          <li className={activeTab === 'reports' ? 'active' : ''}>
            <button onClick={() => setActiveTab('reports')}>
              Reports
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SocialWorkerDashboard;