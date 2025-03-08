import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import { CreditCard } from 'lucide-react'; // Icon for Operator ID


const FetchLPGDetails = ({ lpgData }) => {
  const { data, setData, post, processing } = useForm({
    operator: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('LPG.FetchLPGDetails'));
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      {/* Title with Penny Drop styling */}
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
        Fetch LPG Bill Details
      </h1>
    
      {/* Form with Penny Drop styling */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded md:p-6">
        <div className="mb-3 relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-blue-500 animate-bounce" />
          </span>
          <input
            type="text"
            name="operator"
            value={data.operator}
            onChange={(e) => setData("operator", e.target.value)}
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
            placeholder="OPERATOR ID"
            required
          />
        </div>
    
        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={processing}
        >
          {processing ? "Fetching..." : "Fetch Details"}
        </button>
      </form>
    
      {/* Table with Penny Drop styling */}
      {lpgData && (
        <div className="mt-4 bg-white p-4 rounded shadow-md md:mt-6 md:p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">Bill Details</h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 w-full">
              <tbody>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Response Code</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{lpgData.response_code}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Status</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                    {lpgData.status ? "Success ✅" : "Failed ❌"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Amount</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{lpgData.amount}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Name</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{lpgData.name}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Message</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{lpgData.message}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchLPGDetails;
