import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";    import { Info, FileText, Key } from 'lucide-react';


const ClaimRefund = ({ apiResponse }) => {
  const [ackno, setAckno] = useState("");
  const [referenceid, setReferenceid] = useState("");
  const [otp, setOtp] = useState("");
  const [refunds, setRefunds] = useState([]);
  const [refundResponse, setRefundResponse] = useState([]);
  const [error, setError] = useState(null);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    router.post(
      route("process.claimRefund"),
      { ackno, referenceid, otp },
      {
        onSuccess: (response) => {
          if (response.props.success) {
            setRefundResponse((prevResponses) => [
              ...(prevResponses || []), // Ensure it's an array before spreading
              response.props.data,
            ]);
            
          } else {
            setError(response.props.error || "Something went wrong");
          }
        },
        onError: (errors) => {
          setError(errors.message || "An error occurred");
        },
      }
    );
  };
  

  return (

    <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Claim Refund
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {['ackno', 'referenceid', 'otp'].map((key) => (
          <div key={key} className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              {key === 'ackno' ? (
                <Info size={24} className="text-red-500 animate-bounce" />
              ) : key === 'referenceid' ? (
                <FileText size={24} className="text-indigo-500 animate-bounce" />
              ) : (
                <Key size={24} className="text-yellow-500 animate-bounce" />
              )}
            </span>
            <input
              type="text"
              name={key}
              placeholder={key.toUpperCase()}
              value={key === 'ackno' ? ackno : key === 'referenceid' ? referenceid : otp}
              onChange={(e) => {
                if (key === 'ackno') setAckno(e.target.value);
                else if (key === 'referenceid') setReferenceid(e.target.value);
                else setOtp(e.target.value);
              }}
              className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
        >
          Submit
        </button>
      </form>
    
      {refundResponse.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-light">API Response Table:</h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">REFERENCE ID</th>
                  <th className="border p-2">ACKNO</th>
                  <th className="border p-2">STATUS</th>
                  <th className="border p-2">RESPONSE CODE</th>
                  <th className="border p-2">MESSAGE</th>
                </tr>
              </thead>
              <tbody>
                {refundResponse.map((res, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2">{res.referenceid || 'N/A'}</td>
                    <td className="border p-2">{res.ackno || 'N/A'}</td>
                    <td className="border p-2">{res.status ? 'Success' : 'Failed'}</td>
                    <td className="border p-2">{res.response_code || 'N/A'}</td>
                    <td className="border p-2">{res.message || 'No message'}</td>
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

export default ClaimRefund;
