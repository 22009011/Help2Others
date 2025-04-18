import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    organizationType: '',
    bio: '',
    profileImage: ''
  });
  const [stats, setStats] = useState({
    totalDonations: 0,
    impactScore: 0,
    mealsDonated: 0,
    rescuedWeight: 0
  });
  
  useEffect(() => {
    // Simulating API call to fetch profile data
    setTimeout(() => {
      // Mock data
      const mockProfile = {
        id: 1,
        name: 'Fresh Harvest Restaurant',
        email: 'contact@freshharvestrestaurant.com',
        phone: '(555) 123-4567',
        address: '123 Main Street, Foodville, CA 94103',
        organizationType: 'restaurant',
        bio: 'We are a farm-to-table restaurant committed to reducing food waste and supporting our local community. We specialize in seasonal, locally-sourced cuisine.',
        profileImage: 'https://via.placeholder.com/150',
        joinDate: '2023-05-15T00:00:00.000Z'
      };
      
      const mockStats = {
        totalDonations: 42,
        impactScore: 89,
        mealsDonated: 320,
        rescuedWeight: 275 // in kg
      };
      
      setProfile(mockProfile);
      setFormData(mockProfile);
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call to update profile
    setIsLoading(true);
    
    setTimeout(() => {
      setProfile(formData);
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading && !profile) {
    return <div className="profile-loading">Loading profile information...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={profile.profileImage} alt={profile.name} className="profile-image" />
          {isEditing && (
            <button className="change-image-btn">
              <i className="fas fa-camera"></i> Change
            </button>
          )}
        </div>
        <div className="profile-title">
          <h1>{profile.name}</h1>
          <p className="profile-type">{profile.organizationType.charAt(0).toUpperCase() + profile.organizationType.slice(1)}</p>
          <p className="profile-join-date">Member since {formatDate(profile.joinDate)}</p>
        </div>
        {!isEditing && (
          <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        )}
      </div>
      
      <div className="profile-impact-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalDonations}</div>
          <div className="stat-label">Donations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.impactScore}</div>
          <div className="stat-label">Impact Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.mealsDonated}</div>
          <div className="stat-label">Meals Donated</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.rescuedWeight}kg</div>
          <div className="stat-label">Food Rescued</div>
        </div>
      </div>
      
      {isEditing ? (
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Organization Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="organizationType">Organization Type</label>
            <select 
              id="organizationType" 
              name="organizationType" 
              value={formData.organizationType} 
              onChange={handleInputChange}
            >
              <option value="restaurant">Restaurant</option>
              <option value="grocery">Grocery Store</option>
              <option value="farm">Farm</option>
              <option value="catering">Catering Service</option>
              <option value="bakery">Bakery</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea 
              id="bio" 
              name="bio" 
              value={formData.bio} 
              onChange={handleInputChange} 
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => {
              setFormData(profile);
              setIsEditing(false);
            }}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-section">
            <h2>About Us</h2>
            <p>{profile.bio}</p>
          </div>
          
          <div className="profile-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{profile.email}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{profile.phone}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{profile.address}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Donation History</h2>
            <button className="view-history-btn" onClick={() => navigate('/donations/history')}>
              View Complete History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;