// import React, { useState } from 'react';
// import './BeneficiaryForm.css';

// const BeneficiaryRequestForm = () => {
//   // Form state
//   const [formData, setFormData] = useState({
//     // Organization Info
//     organizationName: '',
//     organizationType: '',
//     registrationNumber: '',
//     establishedYear: '',
    
//     // Location Info
//     state: '',
//     district: '',
//     address: '',
//     pincode: '',
//     coordinates: { lat: '', lng: '' },
    
//     // Contact Info
//     contactPerson: '',
//     phoneNumber: '',
//     email: '',
    
//     // Capacity Info
//     totalCapacity: '',
//     currentOccupancy: '',
//     maleCount: '',
//     femaleCount: '',
//     childrenCount: '',
//     elderlyCount: '',
//     specialNeedsCount: '',
    
//     // Food Needs
//     mealTypes: {
//       breakfast: false,
//       lunch: false,
//       dinner: false,
//       snacks: false
//     },
//     dietaryRestrictions: {
//       vegetarian: false,
//       vegan: false,
//       glutenFree: false,
//       nutFree: false,
//       diabetic: false,
//       other: ''
//     },
//     frequencyOfSupply: 'daily',
    
//     // Priority and Additional Info
//     priorityLevel: 'medium',
//     additionalNotes: '',
//     proofDocuments: []
//   });

//   // Current form step
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 5;

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     // Handle nested objects
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: type === 'checkbox' ? checked : value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === 'checkbox' ? checked : value
//       });
//     }
//   };

//   // Handle file uploads
//   const handleFileUpload = (e) => {
//     setFormData({
//       ...formData,
//       proofDocuments: [...e.target.files]
//     });
//   };

//   // Navigate to next step
//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   // Navigate to previous step
//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Here you would typically send the data to your backend
//     alert('Request submitted successfully!');
//     // Reset form or redirect
//   };

//   // Get states in India
//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
//     'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
//     'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
//     'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
//     'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//     'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
//     'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
//   ];

//   // Get districts based on selected state
//   const getDistricts = (state) => {
//     // This would ideally be a comprehensive mapping of states to districts
//     // Simplified version for demonstration purposes
//     const districtMap = {
//       'Karnataka': ['Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Hubli-Dharwad', 'Mangalore'],
//       'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
//       'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
//       // Add more states and districts as needed
//     };
    
//     return districtMap[state] || [];
//   };

//   // Render form based on current step
//   const renderForm = () => {
//     switch(currentStep) {
//       case 1:
//         return (
//           <div className="form-step">
//             <h3>Organization Information</h3>
            
//             <div className="form-group">
//               <label htmlFor="organizationName">Organization Name*</label>
//               <input
//                 type="text"
//                 id="organizationName"
//                 name="organizationName"
//                 value={formData.organizationName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="organizationType">Organization Type*</label>
//               <select
//                 id="organizationType"
//                 name="organizationType"
//                 value={formData.organizationType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Type</option>
//                 <option value="ngo">NGO</option>
//                 <option value="oldAgeHome">Old Age Home</option>
//                 <option value="orphanage">Orphanage</option>
//                 <option value="shelter">Shelter Home</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="registrationNumber">Registration Number</label>
//               <input
//                 type="text"
//                 id="registrationNumber"
//                 name="registrationNumber"
//                 value={formData.registrationNumber}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="establishedYear">Year Established</label>
//               <input
//                 type="number"
//                 id="establishedYear"
//                 name="establishedYear"
//                 value={formData.establishedYear}
//                 onChange={handleChange}
//                 min="1900"
//                 max={new Date().getFullYear()}
//               />
//             </div>
//           </div>
//         );
        
//       case 2:
//         return (
//           <div className="form-step">
//             <h3>Location Information</h3>
            
//             <div className="form-group">
//               <label htmlFor="state">State*</label>
//               <select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select State</option>
//                 {indianStates.map(state => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="district">District*</label>
//               <select
//                 id="district"
//                 name="district"
//                 value={formData.district}
//                 onChange={handleChange}
//                 required
//                 disabled={!formData.state}
//               >
//                 <option value="">Select District</option>
//                 {getDistricts(formData.state).map(district => (
//                   <option key={district} value={district}>{district}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="address">Full Address*</label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 rows="3"
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="pincode">PIN Code*</label>
//               <input
//                 type="text"
//                 id="pincode"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 required
//                 maxLength="6"
//                 pattern="[0-9]{6}"
//               />
//             </div>
//           </div>
//         );
        
//       case 3:
//         return (
//           <div className="form-step">
//             <h3>Capacity Information</h3>
            
//             <div className="form-group">
//               <label htmlFor="totalCapacity">Total Capacity*</label>
//               <input
//                 type="number"
//                 id="totalCapacity"
//                 name="totalCapacity"
//                 value={formData.totalCapacity}
//                 onChange={handleChange}
//                 required
//                 min="1"
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="currentOccupancy">Current Occupancy*</label>
//               <input
//                 type="number"
//                 id="currentOccupancy"
//                 name="currentOccupancy"
//                 value={formData.currentOccupancy}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 max={formData.totalCapacity || 9999}
//               />
//             </div>
            
//             <div className="form-row">
//               <div className="form-group half">
//                 <label htmlFor="maleCount">Male Count</label>
//                 <input
//                   type="number"
//                   id="maleCount"
//                   name="maleCount"
//                   value={formData.maleCount}
//                   onChange={handleChange}
//                   min="0"
//                 />
//               </div>
              
//               <div className="form-group half">
//                 <label htmlFor="femaleCount">Female Count</label>
//                 <input
//                   type="number"
//                   id="femaleCount"
//                   name="femaleCount"
//                   value={formData.femaleCount}
//                   onChange={handleChange}
//                   min="0"
//                 />
//               </div>
//             </div>
            
//             <div className="form-row">
//               <div className="form-group third">
//                 <label htmlFor="childrenCount">Children</label>
//                 <input
//                   type="number"
//                   id="childrenCount"
//                   name="childrenCount"
//                   value={formData.childrenCount}
//                   onChange={handleChange}
//                   min="0"
//                 />
//               </div>
              
//               <div className="form-group third">
//                 <label htmlFor="elderlyCount">Elderly</label>
//                 <input
//                   type="number"
//                   id="elderlyCount"
//                   name="elderlyCount"
//                   value={formData.elderlyCount}
//                   onChange={handleChange}
//                   min="0"
//                 />
//               </div>
              
//               <div className="form-group third">
//                 <label htmlFor="specialNeedsCount">Special Needs</label>
//                 <input
//                   type="number"
//                   id="specialNeedsCount"
//                   name="specialNeedsCount"
//                   value={formData.specialNeedsCount}
//                   onChange={handleChange}
//                   min="0"
//                 />
//               </div>
//             </div>
//           </div>
//         );
        
//       case 4:
//         return (
//           <div className="form-step">
//             <h3>Food Needs</h3>
            
//             <div className="form-group checkbox-group">
//               <label>Meal Types Required</label>
//               <div className="checkbox-options">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="mealTypes.breakfast"
//                     checked={formData.mealTypes.breakfast}
//                     onChange={handleChange}
//                   />
//                   Breakfast
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="mealTypes.lunch"
//                     checked={formData.mealTypes.lunch}
//                     onChange={handleChange}
//                   />
//                   Lunch
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="mealTypes.dinner"
//                     checked={formData.mealTypes.dinner}
//                     onChange={handleChange}
//                   />
//                   Dinner
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="mealTypes.snacks"
//                     checked={formData.mealTypes.snacks}
//                     onChange={handleChange}
//                   />
//                   Snacks
//                 </label>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="frequencyOfSupply">Frequency of Supply</label>
//               <select
//                 id="frequencyOfSupply"
//                 name="frequencyOfSupply"
//                 value={formData.frequencyOfSupply}
//                 onChange={handleChange}
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="oneTime">One-time</option>
//               </select>
//             </div>
            
//             <div className="form-group checkbox-group">
//               <label>Dietary Restrictions</label>
//               <div className="checkbox-options">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="dietaryRestrictions.vegetarian"
//                     checked={formData.dietaryRestrictions.vegetarian}
//                     onChange={handleChange}
//                   />
//                   Vegetarian
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="dietaryRestrictions.vegan"
//                     checked={formData.dietaryRestrictions.vegan}
//                     onChange={handleChange}
//                   />
//                   Vegan
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="dietaryRestrictions.glutenFree"
//                     checked={formData.dietaryRestrictions.glutenFree}
//                     onChange={handleChange}
//                   />
//                   Gluten-free
//                 </label>
                
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="dietaryRestrictions.diabetic"
//                     checked={formData.dietaryRestrictions.diabetic}
//                     onChange={handleChange}
//                   />
//                   Diabetic
//                 </label>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="dietaryRestrictions.other">Other Dietary Requirements</label>
//               <textarea
//                 id="dietaryRestrictions.other"
//                 name="dietaryRestrictions.other"
//                 value={formData.dietaryRestrictions.other}
//                 onChange={handleChange}
//                 rows="2"
//               />
//             </div>
//           </div>
//         );
        
//       case 5:
//         return (
//           <div className="form-step">
//             <h3>Priority and Additional Information</h3>
            
//             <div className="form-group">
//               <label htmlFor="priorityLevel">Priority Level</label>
//               <select
//                 id="priorityLevel"
//                 name="priorityLevel"
//                 value={formData.priorityLevel}
//                 onChange={handleChange}
//               >
//                 <option value="low">Low - Can wait</option>
//                 <option value="medium">Medium - Needed soon</option>
//                 <option value="high">High - Urgent need</option>
//                 <option value="critical">Critical - Emergency</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="additionalNotes">Additional Notes</label>
//               <textarea
//                 id="additionalNotes"
//                 name="additionalNotes"
//                 value={formData.additionalNotes}
//                 onChange={handleChange}
//                 rows="3"
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="proofDocuments">Upload Supporting Documents</label>
//               <div className="file-upload">
//                 <input
//                   type="file"
//                   id="proofDocuments"
//                   name="proofDocuments"
//                   onChange={handleFileUpload}
//                   multiple
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="file-help">Please upload registration certificates, licenses, or other relevant documents. (Max 5MB each)</p>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <div className="consent-check">
//                 <input
//                   type="checkbox"
//                   id="consentCheck"
//                   required
//                 />
//                 <label htmlFor="consentCheck">I certify that all the information provided is true and accurate. I understand that providing false information may result in the rejection of our request.</label>
//               </div>
//             </div>
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="beneficiary-form-container">
//       <div className="form-header">
//         <h2>Beneficiary Request Form</h2>
//         <p>Please provide detailed information about your organization and needs</p>
//       </div>
      
//       <div className="form-progress">
//         <div className="progress-bar">
//           <div 
//             className="progress-filled" 
//             style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//           ></div>
//         </div>
//         <div className="step-indicators">
//           {[...Array(totalSteps)].map((_, index) => (
//             <div 
//               key={index}
//               className={`step-indicator ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'current' : ''}`}
//             >
//               {index + 1}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <form onSubmit={handleSubmit}>
//         {renderForm()}
        
//         <div className="form-actions">
//           {currentStep > 1 && (
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={prevStep}
//             >
//               Previous
//             </button>
//           )}
          
//           {currentStep < totalSteps ? (
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={nextStep}
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="btn btn-success"
//             >
//               Submit Request
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BeneficiaryRequestForm;







// BeneficiaryForm.js - Main Component
import React, { useState } from 'react';
import './BeneficiaryForm.css';
import FormHeader from './FormHeader';
import FormProgress from './FormProgress';
import OrganizationInfo from './OrganizationInfo';
import LocationInfo from './LocationInfo';
import CapacityInfo from './CapacityInfo';
import FoodNeeds from './FoodNeeds';
import AdditionalInfo from './AdditionalInfo';
import FormActions from './FormActions';

const BeneficiaryRequestForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    // Organization Info
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    establishedYear: '',
    
    // Location Info
    state: '',
    district: '',
    address: '',
    pincode: '',
    coordinates: { lat: '', lng: '' },
    
    // Contact Info
    contactPerson: '',
    phoneNumber: '',
    email: '',
    
    // Capacity Info
    totalCapacity: '',
    currentOccupancy: '',
    maleCount: '',
    femaleCount: '',
    childrenCount: '',
    elderlyCount: '',
    specialNeedsCount: '',
    
    // Food Needs
    mealTypes: {
      breakfast: false,
      lunch: false,
      dinner: false,
      snacks: false
    },
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false,
      diabetic: false,
      other: ''
    },
    frequencyOfSupply: 'daily',
    
    // Priority and Additional Info
    priorityLevel: 'medium',
    additionalNotes: '',
    proofDocuments: []
  });

  // Current form step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      proofDocuments: [...e.target.files]
    });
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Request submitted successfully!');
    // Reset form or redirect
  };

  // Render form based on current step
  const renderForm = () => {
    switch(currentStep) {
      case 1:
        return <OrganizationInfo formData={formData} handleChange={handleChange} />;
      case 2:
        return <LocationInfo formData={formData} handleChange={handleChange} />;
      case 3:
        return <CapacityInfo formData={formData} handleChange={handleChange} />;
      case 4:
        return <FoodNeeds formData={formData} handleChange={handleChange} />;
      case 5:
        return <AdditionalInfo 
                 formData={formData} 
                 handleChange={handleChange}
                 handleFileUpload={handleFileUpload} 
               />;
      default:
        return null;
    }
  };

  return (
    <div className="beneficiary-form-container">
      <FormHeader />
      <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <form onSubmit={handleSubmit}>
        {renderForm()}
        
        <FormActions 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          prevStep={prevStep} 
          nextStep={nextStep} 
        />
      </form>
    </div>
  );
};

export default BeneficiaryRequestForm;


















// utils/locationData.js
// Location data utility functions and constants

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const getDistricts = (state) => {
  // This would ideally be a comprehensive mapping of states to districts
  // Simplified version for demonstration purposes
  const districtMap = {
    'Karnataka': ['Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Hubli-Dharwad', 'Mangalore'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    // Add more states and districts as needed
  };
  
  return districtMap[state] || [];
};