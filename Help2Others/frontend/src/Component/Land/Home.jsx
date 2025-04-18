import React, { useState } from 'react';
import './Home.css';
import Dashboard1 from '../Donor/DonorDashboard';
import BeneficiaryRequestForm from '../Homes/BeneficiaryRequestForm';
import DeliveryDashboard from '../Picker/DeliveryDashboard';
import SocialWorkerDashboard from '../Socialworker/SocialWorkerDashboard';
import LocationFilter from './LocationFilter'; // Import the new filter component
import { useNavigate } from 'react-router-dom'; // add useNavigate

const Home = () => {
  // State to track which component to display
  const [activeComponent, setActiveComponent] = useState(null);
  // State to store filtered results
  const [filteredResults, setFilteredResults] = useState([]);
  // State to track if filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate(); // add useNavigate
  
  // Function to handle card clicks
  const handleCardClick = (component) => {
    setActiveComponent(component);
  };
  
  // Function to handle filter application
  const handleFilterApply = (results) => {
    setFilteredResults(results);
    setFiltersApplied(true);
  };
  
  // Modified fetchData to route to DonorData for donors
  const fetchData = (type) => {
    if (type === 'donors') {
      // Navigate to the DonorData page in the Donor component
      navigate('/donor-data');
    } else {
      console.log(`Fetching ${type} data...`);
      // ...existing API call logic or alert...
      alert(`Fetching ${type} data`);
    }
  };
  
  // Function to render the active component
  const renderActiveComponent = () => {
    switch(activeComponent) {
      case 'donor':
        return <Dashboard1 />
      case 'oldagehome':
        return <BeneficiaryRequestForm />
      case 'delivery':
        return <DeliveryDashboard />
      case 'social':
        return <SocialWorkerDashboard />
      default:
        return null;
    }
  };
  
  // Function to go back to the home view
  const goBack = () => {
    setActiveComponent(null);
  };

  return (
    <div className="home-container">
      <header>
        <div className="navbar">
          <div className="logo">H2O</div>
          <nav className="nav-links">
            <a href="#" onClick={() => setActiveComponent(null)}>Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>
      
      {/* Main content - show either cards or active component */}
      {!activeComponent ? (
        <>
          <section className="hero">
            <h1>Reducing Food Waste, Feeding Communities</h1>
            <p>Connect surplus food with those who need it most. Our platform brings together restaurants, hotels, delivery volunteers, and beneficiaries to make a difference.</p>
            <a href="#register" className="btn">Get Started</a>
          </section>
          
          <section className="features">
            <div className="section-heading">
              <h2>How It Works</h2>
              <p>Our platform connects food donors with beneficiaries through a simple, efficient process</p>
            </div>
            
            <div className="impact-stats">
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Meals Saved</div>
              </div>
              
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Partner Organizations</div>
              </div>
              
              <div className="stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">Volunteers</div>
              </div>
            </div>
          </section>
          
          <section id="register" className="card-section">
            <div className="section-heading">
              <h2>Join The Movement</h2>
              <p>Click on a card to view details or manage that section</p>
            </div>
            
            <div className="interactive-cards">
              <div className="card clickable-card" onClick={() => handleCardClick('donor')}>
                <div className="card-image">Restaurant/Hotel Icon</div>
                <div className="card-content">
                  <h3>Food Donors</h3>
                  <p>Restaurants, hotels, and households who want to donate surplus food</p>
                </div>
              </div>
              
              <div className="card clickable-card" onClick={() => handleCardClick('oldagehome')}>
                <div className="card-image">NGO Icon</div>
                <div className="card-content">
                  <h3>Beneficiaries</h3>
                  <p>NGOs, old age homes, orphanages that need food donations</p>
                </div>
              </div>
              
              <div className="card clickable-card" onClick={() => handleCardClick('delivery')}>
                <div className="card-image">Delivery Icon</div>
                <div className="card-content">
                  <h3>Delivery Volunteers</h3>
                  <p>Help collect and deliver food from donors to beneficiaries</p>
                </div>
              </div>
              
              <div className="card clickable-card" onClick={() => handleCardClick('social')}>
                <div className="card-image">Social Worker Icon</div>
                <div className="card-content">
                  <h3>Social Workers</h3>
                  <p>Help verify food quality and assist with logistics coordination</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* New Filter Section */}
          <section className="filter-section">
            <div className="section-heading">
              <h2>Find Resources in Your Area</h2>
              <p>Filter by location to see available donors and beneficiaries</p>
            </div>
            
            <LocationFilter onFilterApply={handleFilterApply} />
            
            {filtersApplied && (
              <div className="filter-results">
                <h3 className="results-title">Results ({filteredResults.length})</h3>
                {filteredResults.length > 0 ? (
                  <ul className="result-list">
                    {filteredResults.map(item => (
                      <li key={item.id} className="result-item">
                        <div className="result-name">{item.name}</div>
                        <div className="result-type">Type: {item.type}</div>
                        <div className="result-location">
                          Location: {item.location.city}, {item.location.district}, {item.location.state}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results">No results match your filter criteria.</p>
                )}
              </div>
            )}
          </section>
          
          <section className="data-section">
            <div className="section-heading">
              <h2>Data Management</h2>
              <p>View and manage data for different user types</p>
            </div>
            
            <div className="data-buttons">
              <button className="btn data-btn" onClick={() => fetchData('donors')}>
                Get Donor Data
              </button>
              <button className="btn data-btn" onClick={() => fetchData('beneficiaries')}>
                Get Beneficiary Data
              </button>
              <button className="btn data-btn" onClick={() => fetchData('delivery')}>
                Get Delivery Data
              </button>
              <button className="btn data-btn" onClick={() => fetchData('social')}>
                Get Social Worker Data
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className="component-wrapper">
          <button className="btn back-btn" onClick={goBack}>
            ← Back to Main Menu
          </button>
          {renderActiveComponent()}
        </div>
      )}
      
      <footer>
        <p>&copy; 2025 H2O - Food Waste Management System</p>
        <p>Making a difference, one meal at a time</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;