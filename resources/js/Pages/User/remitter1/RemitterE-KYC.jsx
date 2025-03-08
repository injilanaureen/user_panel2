import React, { useState } from "react";
import axios from "axios";
import { Phone, User } from 'lucide-react';


const RemitterEKYC = () => {
  const [mobile, setMobile] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/ekyc_remitter1", {
        mobile,
        aadhaar_number: aadhaarNumber,
      });
  console.log(response.data)
      setResponseData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="p-4 max-w-full" >
      <h2 className="text-xl font-bold mb-4  bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Remitter E-KYC
      </h2>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white ">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Phone size={24} className="text-blue-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
              required
            />
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-green-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">Aadhaar Number</label>
            <input
              type="text"
              placeholder="Enter Aadhaar Number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
              required
            />
          </div>
        </div>
    
        <button
          type="submit"
          className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    
      {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
    
      {responseData && (
        <div className="mt-4 p-6 border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-green-light">API Response</h3>
    
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Field</th>
                <th className="border p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Status</td>
                <td className="border p-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${responseData.status ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {responseData.status ? "Success" : "Failed"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Response Code</td>
                <td className="border p-2">{responseData.response_code}</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Message</td>
                <td className="border p-2">{responseData.message}</td>
              </tr>
              {responseData.data && (
                <>
                  <tr>
                    <td className="border p-2 font-semibold">Mobile</td>
                    <td className="border p-2">{responseData.data.mobile}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">E-KYC ID</td>
                    <td className="border p-2">{responseData.data.ekyc_id}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">State Response</td>
                    <td className="border p-2">{responseData.data.stateresp}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  
  
  );
};

export default RemitterEKYC;
