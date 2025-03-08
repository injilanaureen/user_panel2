import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { FileText } from 'lucide-react';


const TransactionStatus = ({ transactionData }) => {
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/transaction-status', { referenceid: referenceId });
  };

  return (

    <div className="p-4 max-w-full ">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Transaction Status
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileText size={24} className="text-indigo-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-2">Reference ID:</label>
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder="Enter Reference ID"
              required
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
            />
          </div>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 "
          >
            Check Status
          </button>
        </div>
      </form>
    
      {transactionData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-light">Transaction Details</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <tbody>
              {Object.entries(transactionData).map(([key, value]) => (
                <tr key={key} className="border-t">
                  <td className="border p-2 font-medium text-white-dark capitalize">{key.replace(/_/g, ' ')}</td>
                  <td className="border p-2 text-white-dark">{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  
  );
};

export default TransactionStatus;
