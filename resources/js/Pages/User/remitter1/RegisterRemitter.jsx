import React, { useState } from "react";
import { Phone, Key, FileText, User } from 'lucide-react';
import axios from "axios";

const RegisterRemitter = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    stateresp: "",
    ekyc_id: "",
  });

  const [submittedData, setSubmittedData] = useState([]); // Store submitted data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/register-remitter1", formData);
      console.log("API Response:", res.data);

      const finalData = {
        ...formData,
        limit: res.data.data?.limit || "",
        message: res.data?.message || "",
        response_code: res.data?.response_code || "",
        status: res.data?.status || "",
      };

      // Store data in the backend
      await axios.post("/store_register-remitter1", finalData);
      console.log("Data Stored Successfully", finalData);

      // Update state with new data
      setSubmittedData((prevData) => [...prevData, finalData]);

      // Reset form
      setFormData({ mobile: "", otp: "", stateresp: "", ekyc_id: "" });
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  return (

  <div className="p-4 max-w-full " >
  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
    Register Remitter
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <Phone size={24} className="text-blue-500 animate-bounce" />
      </span>
      <div className="w-full">
        <label className="block font-semibold text-primary_color mb-1">Mobile</label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
          style={{ backgroundColor: '#ffffff' }}
          required
        />
      </div>
    </div>

    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <Key size={24} className="text-indigo-500 animate-bounce" />
      </span>
      <div className="w-full">
        <label className="block font-semibold text-primary_color mb-1">OTP</label>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP (4 digits)"
          value={formData.otp}
          onChange={handleChange}
          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
          style={{ backgroundColor: '#ffffff' }}
          required
        />
      </div>
    </div>

    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <FileText size={24} className="text-pink-500 animate-bounce" />
      </span>
      <div className="w-full">
        <label className="block font-semibold text-primary_color mb-1">State Response</label>
        <input
          type="text"
          name="stateresp"
          placeholder="Enter State Response"
          value={formData.stateresp}
          onChange={handleChange}
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
        <label className="block font-semibold text-primary_color mb-1">E-KYC ID</label>
        <input
          type="text"
          name="ekyc_id"
          placeholder="Enter E-KYC ID"
          value={formData.ekyc_id}
          onChange={handleChange}
          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
          style={{ backgroundColor: '#ffffff' }}
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 col-span-2"
      disabled={loading}
    >
      {loading ? "Registering..." : "Submit"}
    </button>
  </form>

  {error && (
    <div className="mt-4 p-3 bg-red-200 text-red-800 rounded">{error}</div>
  )}

  {submittedData.length > 0 && (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4 text-green-light">Submitted Remitter Details</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Mobile</th>
              <th className="border p-2">OTP</th>
              <th className="border p-2">State Resp</th>
              <th className="border p-2">E-KYC ID</th>
              <th className="border p-2">Limit</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Response Code</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100 transition`}>
                <td className="border p-2 font-medium">{data.mobile}</td>
                <td className="border p-2">{data.otp}</td>
                <td className="border p-2">{data.stateresp}</td>
                <td className="border p-2">{data.ekyc_id}</td>
                <td className="border p-2 font-semibold text-blue-600">{data.limit}</td>
                <td className="border p-2 text-gray-600">{data.message}</td>
                <td className="border p-2">{data.response_code}</td>
                <td className={`border p-2 font-semibold ${data.status ? "text-green-600" : "text-red-600"}`}>
                  {data.status ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
  );
};

export default RegisterRemitter;
