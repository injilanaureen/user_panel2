import React, { useState } from "react";
import axios from "axios";
import { User } from 'lucide-react'; // Icon for Consumer Number


const PayBill = () => {
  const [canumber, setCanumber] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!canumber.trim()) {
      setError("Please enter a consumer number");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);
      
      const res = await axios.post("/admin/utility-bill-payment/process-bill-payment", { 
        canumber: canumber.trim() 
      });
      
      if (res.data.status === false) {
        throw new Error(res.data.message || "Payment failed");
      }
      
      setResponse(res.data);
    } catch (err) {
      console.error('Payment Error:', err);
      const errorMessage = err.response?.data?.error 
        || err.response?.data?.message 
        || err.message 
        || "An unexpected error occurred during payment processing";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const ResponseTable = ({ data }) => (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-green-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-green-800">
          Payment Details
        </h3>
      </div>
      <div className="p-4">
        <table className="w-full text-sm text-left text-gray-700">
          <tbody>
            <tr className="border-b">
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50 w-1/3">
                Status
              </th>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${data.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {data.status ? 'Successful' : 'Failed'}
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50">
                Response Code
              </th>
              <td className="py-3 px-4">{data.response_code}</td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50">
                Operator ID
              </th>
              <td className="py-3 px-4">{data.operatorid}</td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50">
                Acknowledgement No
              </th>
              <td className="py-3 px-4">{data.ackno}</td>
            </tr>
            <tr className="border-b">
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50">
                Reference ID
              </th>
              <td className="py-3 px-4">{data.refid}</td>
            </tr>
            <tr>
              <th className="py-3 px-4 font-medium text-gray-900 bg-gray-50 align-top">
                Message
              </th>
              <td className="py-3 px-4">{data.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (

<div className="max-w-full mx-auto p-4 md:p-6 md:max-w-2xl">
  {/* Title with Penny Drop styling */}
  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
    Pay Utility Bill
  </h2>

  {/* Input and Button with Penny Drop styling */}
  <div className="space-y-6">
    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <User size={24} className="text-blue-500 animate-bounce" />
      </span>
      <input
        id="canumber"
        type="text"
        value={canumber}
        onChange={(e) => setCanumber(e.target.value)}
        className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
        placeholder="CONSUMER NUMBER"
        disabled={isLoading}
      />
    </div>

    <button
      onClick={handlePayment}
      disabled={isLoading || !canumber.trim()}
      className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 ${
        isLoading || !canumber.trim() ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </>
      ) : (
        'Pay Bill'
      )}
    </button>

    {response && <ResponseTable data={response} />}

    {error && (
      <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg md:mt-6">
        <div className="text-lg font-semibold text-red-800 mb-2 md:text-xl">
          Payment Failed
        </div>
        <p className="text-sm text-red-700 md:text-base">{error}</p>
      </div>
    )}
  </div>
</div>
  );
};

export default PayBill;