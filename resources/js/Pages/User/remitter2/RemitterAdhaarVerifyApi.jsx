import React, { useState } from "react";
import { router } from '@inertiajs/react';
import { Phone, User } from 'lucide-react';


const RemitterAdhaarApiVerify = ({ apiData, dbData, error }) => {
  const [formData, setFormData] = useState({
    mobile: '',
    aadhaar_no: ''
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.aadhaar_no || !/^[0-9]{16}$/.test(formData.aadhaar_no)) {
      errors.aadhaar_no = 'Please enter a valid Aadhaar number';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setValidationErrors({});

    router.post('/admin/remitter-adhaar-verify', formData, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setLoading(false)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const renderApiResponse = () => {
    if (!apiData) return null;

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">API Response</h3>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6 text-left font-medium text-gray-700">Field</th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(apiData).map(([key, value]) => (
                <tr key={key} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-700 font-medium">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDbResponse = () => {
    if (!dbData) return null;

    const displayFields = [
      { key: 'id', label: 'Record ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'mobile', label: 'Mobile Number' },
      { key: 'aadhaar_no', label: 'Aadhaar Number' },
      { key: 'response_code', label: 'Response Code' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' }
    ];

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Stored Database Record</h3>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6 text-left font-medium text-gray-700">Field</th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {displayFields.map(({ key, label }) => (
                <tr key={key} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-700 font-medium">{label}</td>
                  <td className="py-3 px-6 text-gray-600">
                    {key.includes('_at') 
                      ? new Date(dbData[key]).toLocaleString()
                      : dbData[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (

    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Remitter Aadhaar Verification
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Phone size={24} className="text-blue-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-[#497D74] mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
              required
            />
            {validationErrors.mobile && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.mobile}</p>
            )}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-green-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-[#497D74] mb-1">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar_no"
              value={formData.aadhaar_no}
              onChange={handleChange}
              maxLength={16}
              placeholder="Enter Aadhaar number"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
              required
            />
            {validationErrors.aadhaar_no && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.aadhaar_no}</p>
            )}
          </div>
        </div>
    
        <button
          type="submit"
          className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 col-span-2"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Aadhaar'}
        </button>
      </form>
    
      {error && (
        <div className="mt-4 p-3 bg-red-200 text-red-700 rounded">{error}</div>
      )}
    
      {renderApiResponse()}
      {renderDbResponse()}
    </div>
  
  );
};

export default RemitterAdhaarApiVerify;