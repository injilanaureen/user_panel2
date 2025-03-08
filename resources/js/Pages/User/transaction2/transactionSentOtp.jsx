import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Phone, CreditCard, Banknote, User, FileText, MapPin, Landmark, Calendar, FileCheck2 } from 'lucide-react';


const TransactionSentOtp = ({ response }) => {
  const [formData, setFormData] = useState({
    mobile: '',
    referenceid: '',
    bene_id: '',
    txntype: 'IMPS',
    amount: '',
    pincode: '',
    address: '',
    gst_state: '',
    dob: '',
    lat: '28.7041',
    long: '77.1025',
  });

  const [apiResponse, setApiResponse] = useState(response || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    router.post('/transaction-sent-otp', formData, {
      preserveState: true,
      onSuccess: (page) => {
        setLoading(false);
        setApiResponse(page.props.response);
      },
      onError: (errors) => {
        setLoading(false);
        setError('Something went wrong. Please try again.');
      },
    });
  };

  return (
    

    <div className="p-4 max-w-full">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Transaction Sent OTP
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Phone size={24} className="text-blue-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-purple-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">accno</label>
            <input
              type="text"
              id="accno"
              name="accno"
              placeholder="Enter Account Number"
              value={formData.accno}
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Banknote size={24} className="text-orange-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">bankid</label>
            <input
              type="text"
              id="bankid"
              name="bankid"
              value={formData.bankid}
              placeholder="Enter Bank ID"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-green-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">benename</label>
            <input
              type="text"
              id="benename"
              name="benename"
              value={formData.benename}
              placeholder="Enter Bene name"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileText size={24} className="text-indigo-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">referenceid</label>
            <input
              type="text"
              id="referenceid"
              name="referenceid"
              value={formData.referenceid}
              placeholder="Enter Reference Id"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <MapPin size={24} className="text-yellow-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              placeholder="Enter Pincode"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Landmark size={24} className="text-teal-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Enter Address"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Calendar size={24} className="text-red-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">dob</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={formData.dob}
              placeholder="Enter DOB"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileCheck2 size={24} className="text-pink-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">gst state</label>
            <input
              type="text"
              id="gst_state"
              name="gst_state"
              value={formData.gst_state}
              placeholder="Enter GST State"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-green-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">bene id</label>
            <input
              type="text"
              id="bene_id"
              name="bene_id"
              value={formData.bene_id}
              placeholder="Enter bene id"
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
    
        <button
          type="submit"
          className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 w-full"
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    
      {apiResponse && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-primary_color">API Response:</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Field</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(apiResponse).map(([key, value]) => (
                <tr key={key}>
                  <td className="border p-2 font-medium capitalize">{key.replace('_', ' ')}</td>
                  <td className="border p-2">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
 
  );
};

export default TransactionSentOtp;