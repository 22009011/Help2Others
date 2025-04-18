import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donationcreate.css';

// Import sub-components
import ProgressSteps from './Components/ProgressSteps';
import FoodDetailsForm from './Components/FoodDetailsForm';
import AvailabilityForm from './Components/AvailabilityForm';
import LocationForm from './Components/LocationForm';
import ReviewForm from './Components/ReviewForm';

const DonationCreate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Food details
    foodType: '',
    description: '',
    quantity: '',
    unit: '',
    image: null,
    
    // Step 2: Availability
    expiryDate: '',
    expiryTime: '',
    pickupStartDate: '',
    pickupStartTime: '',
    pickupEndDate: '',
    pickupEndTime: '',
    isRecurring: false,
    recurringFrequency: 'weekly',
    
    // Step 3: Location & instructions
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Food type suggestions for autocomplete
  const foodTypes = [
    'Fresh Produce', 'Bakery Items', 'Prepared Meals', 'Canned Goods',
    'Dairy Products', 'Meat & Poultry', 'Seafood', 'Grains & Cereals',
    'Snacks', 'Beverages'
  ];

  // Unit suggestions based on food type
  const getUnitSuggestions = (type) => {
    switch(type) {
      case 'Fresh Produce':
      case 'Meat & Poultry':
      case 'Seafood':
        return ['kg', 'lb', 'g', 'items'];
      case 'Bakery Items':
      case 'Prepared Meals':
        return ['items', 'servings', 'trays'];
      case 'Canned Goods':
        return ['cans', 'items'];
      case 'Beverages':
        return ['liters', 'bottles', 'cans', 'gallons'];
      default:
        return ['kg', 'items', 'servings', 'boxes'];
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Auto-fill suggestions for units based on food type
      if (name === 'foodType') {
        setFormData(prevData => ({
          ...prevData,
          unit: getUnitSuggestions(value)[0] || ''
        }));
      }
    }
  };

  // Validation for each step
  const validateStep = (currentStep) => {
    let stepErrors = {};
    let isValid = true;
    
    switch(currentStep) {
      case 1:
        if (!formData.foodType.trim()) {
          stepErrors.foodType = 'Food type is required';
          isValid = false;
        }
        
        if (!formData.quantity.trim()) {
          stepErrors.quantity = 'Quantity is required';
          isValid = false;
        } else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
          stepErrors.quantity = 'Please enter a valid quantity';
          isValid = false;
        }
        
        if (!formData.unit.trim()) {
          stepErrors.unit = 'Unit is required';
          isValid = false;
        }
        break;
        
      case 2:
        const now = new Date();
        const expiryDateTime = new Date(`${formData.expiryDate}T${formData.expiryTime}`);
        const pickupStartDateTime = new Date(`${formData.pickupStartDate}T${formData.pickupStartTime}`);
        const pickupEndDateTime = new Date(`${formData.pickupEndDate}T${formData.pickupEndTime}`);
        
        if (expiryDateTime <= now) {
          stepErrors.expiryDate = 'Expiry time must be in the future';
          isValid = false;
        }
        
        if (pickupStartDateTime >= pickupEndDateTime) {
          stepErrors.pickupEndTime = 'End time must be after start time';
          isValid = false;
        }
        
        if (pickupEndDateTime > expiryDateTime) {
          stepErrors.pickupEndDate = 'Pickup window cannot be after expiry time';
          isValid = false;
        }
        break;
        
      case 3:
        if (!formData.address.trim()) {
          stepErrors.address = 'Address is required';
          isValid = false;
        }
        
        if (!formData.city.trim()) {
          stepErrors.city = 'City is required';
          isValid = false;
        }
        
        if (!formData.zipCode.trim()) {
          stepErrors.zipCode = 'ZIP code is required';
          isValid = false;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(stepErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            );
            
            if (response.data.results && response.data.results.length > 0) {
              const result = response.data.results[0].components;
              
              setFormData({
                ...formData,
                address: `${result.road || ''} ${result.house_number || ''}`.trim(),
                city: result.city || result.town || '',
                zipCode: result.postcode || ''
              });
            }
          } catch (error) {
            console.error('Error getting address from coordinates:', error);
            alert('Failed to get your address. Please enter manually.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Failed to get your location. Please enter address manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleUseProfileAddress = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/user/profile',
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.user) {
        setFormData({
          ...formData,
          address: response.data.user.address || '',
          city: response.data.user.city || '',
          zipCode: response.data.user.zip_code || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      alert('Failed to fetch profile address. Please enter manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      try {
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach(key => {
          if (key === 'image' && formData[key]) {
            formDataToSend.append('image', formData[key]);
          } else {
            // Handle null/undefined values
            const value = formData[key];
            formDataToSend.append(key, value === null || value === undefined ? '' : value.toString());
          }
        });
        
        // Log form data for debugging
        console.log('Submitting form data:', Object.fromEntries(formDataToSend));
        
        const response = await axios.post(
          'http://localhost:5000/api/donations', 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        if (response.data.success) {
          alert('Donation submitted successfully!');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error submitting donation:', error);
        // More detailed error message
        const errorMessage = error.response?.data?.message || error.message || 'Failed to submit donation';
        alert(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Render current form step based on state
  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return (
          <FoodDetailsForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            foodTypes={foodTypes}
            getUnitSuggestions={getUnitSuggestions}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <AvailabilityForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <LocationForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleGetCurrentLocation={handleGetCurrentLocation}
            handleUseProfileAddress={handleUseProfileAddress}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 4:
        return (
          <ReviewForm
            formData={formData}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="donation-create-container">
      <div className="donation-form-header">
        <button className="back-arrow" onClick={() => navigate('/dashboard')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Create Donation</h2>
      </div>
      
      <ProgressSteps currentStep={step} />
      
      <form className="donation-form">
        {renderCurrentStep()}
      </form>
    </div>
  );
};

export default DonationCreate;