import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Dashboard1 from './Component/Donor/DonorDashboard';
import DonationCreate from './Component/Donor/DonationCreate';
import Notifications from './Component/Donor/Notifications';
import Profile from './Component/Donor/Profile';
import BeneficiaryRequestForm from './Component/Homes/BeneficiaryRequestForm';
import DeliveryDashboard from './Component/Picker/DeliveryDashboard';
import SocialWorkerDashboard from './Component/Socialworker/SocialWorkerDashboard';
import DonorData from './Component/Donor/DonorData';
import Home from './Component/Land/Home';

function App() {

  return (
    <>
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dashboard1 />} />
          <Route path="/create-donation" element={<DonationCreate />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homes" element={<BeneficiaryRequestForm/>} />
          <Route path="/picker" element={<DeliveryDashboard/>} />
          <Route path="/social" element={<SocialWorkerDashboard/>} />
          <Route path="/donor-data" element={<DonorData />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;