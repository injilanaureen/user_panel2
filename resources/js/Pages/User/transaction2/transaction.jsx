import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Phone, FileText, UserCheck, CreditCard, Calendar, MapPin, Landmark, FileCheck2 } from 'lucide-react';


const Transaction = ({ transactionData }) => {
  const [formData, setFormData] = useState({
    mobile: '',
    referenceid: '',
    pincode: '',
    address: '',
    amount: '',
    txntype: 'imps',
    dob: '',
    gst_state: '',
    bene_id: '',
    otp: '',
    stateresp: '',
    lat: '28.7041',
    long: '77.1025',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Data:', formData);

    // Make POST request to Laravel route
    router.post('/admin/transaction2/transact', formData);
  };

  const handleSendOtp = () => {
    console.log('Sending OTP for bene_id:', formData.bene_id);
    // Implement OTP sending logic here
  };

  return (


    <>
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Transaction
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          (key !== 'lat' && key !== 'long') && (
            <div key={key} className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                {key === 'mobile' ? (
                  <Phone size={24} className="text-blue-500 animate-bounce" />
                ) : key === 'referenceid' ? (
                  <FileText size={24} className="text-indigo-500 animate-bounce" />
                ) : key === 'bene_id' ? (
                  <UserCheck size={24} className="text-gray-500 animate-bounce" />
                ) : key === 'txntype' ? (
                  <CreditCard size={24} className="text-purple-500 animate-bounce" />
                ) : key === 'dob' ? (
                  <Calendar size={24} className="text-red-500 animate-bounce" />
                ) : key === 'pincode' ? (
                  <MapPin size={24} className="text-yellow-500 animate-bounce" />
                ) : key === 'address' ? (
                  <Landmark size={24} className="text-teal-500 animate-bounce" />
                ) : key === 'gst_state' ? (
                  <FileCheck2 size={24} className="text-pink-500 animate-bounce" />
                ) : (
                  <Phone size={24} className="text-blue-500 animate-bounce" />
                )}
              </span>
              <div className="w-full">
                <label className="block font-semibold text-primary_color mb-1 capitalize">{key.replace('_', ' ')}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key.replace('_', ' ')}`}
                  required
                  className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                  style={{ backgroundColor: '#ffffff' }}
                />
    
              </div>
            </div>
          )
        ))}
        <button
          type="submit"
          onClick={handleSendOtp}
          className="bg-[#497D74] text-white rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300"
        >
          Submit
        </button>
      </form>
    
      {transactionData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-light">API Response:</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Key</th>
                <th className="border p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(transactionData).map(([key, value]) => (
                <tr key={key}>
                  <td className="border p-2 font-semibold capitalize">{key}</td>
                  <td className="border p-2">{JSON.stringify(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
 
  );
};

export default Transaction;
