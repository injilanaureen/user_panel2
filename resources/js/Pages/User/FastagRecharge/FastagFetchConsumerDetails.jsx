import React, { useState } from "react";
import axios from "axios";
import { CreditCard, User } from 'lucide-react'; // Icons for Operator ID and CA Number


const FastagFetchConsumerDetails = () => {
  const [operator, setOperator] = useState("");
  const [canumber, setCanumber] = useState("");
  const [consumerDetails, setConsumerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConsumerDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/fetchConsumerDetails", {
        operator: operator,
        canumber: canumber,
      });
      setConsumerDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch details. Please try again.");
      setConsumerDetails(null);
    }
    setLoading(false);
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      {/* Title with Penny Drop styling */}
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
        Fastag Consumer Details
      </h1>
    
      {/* Input Fields with Penny Drop styling */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-blue-500 animate-bounce" />
          </span>
          <input
            type="number"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
            placeholder="OPERATOR ID"
          />
        </div>
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-purple-500 animate-bounce" />
          </span>
          <input
            type="text"
            value={canumber}
            onChange={(e) => setCanumber(e.target.value)}
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
            placeholder="CA NUMBER"
          />
        </div>
        <button
          onClick={fetchConsumerDetails}
          className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 md:col-span-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Details"}
        </button>
      </form>
    
      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs italic mt-2 md:mt-4 md:text-sm">{error}</p>
      )}
    
      {/* Table with Penny Drop styling */}
      {consumerDetails && (
        <div className="mt-6 p-4 border rounded bg-white md:mt-8 md:p-6">
          <h2 className="font-bold text-lg mb-3 text-gray-800 md:text-xl">Bill Details</h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 w-full">
              <tbody>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Response Code</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.response_code}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Status</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                    {consumerDetails.status ? "Success" : "Failed"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Amount</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{consumerDetails.amount}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Name</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.name}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Due Date</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.duedate}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Cell Number</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.bill_fetch.cellNumber}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Username</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.bill_fetch.userName}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Bill Amount</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{consumerDetails.bill_fetch.billAmount}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Net Amount</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{consumerDetails.bill_fetch.billnetamount}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Max Bill Amount</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{consumerDetails.bill_fetch.maxBillAmount}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Accept Payment</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                    {consumerDetails.bill_fetch.acceptPayment ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Accept Partial Payment</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                    {consumerDetails.bill_fetch.acceptPartPay ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 font-semibold text-gray-600 md:p-3">Message</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{consumerDetails.message}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FastagFetchConsumerDetails;
