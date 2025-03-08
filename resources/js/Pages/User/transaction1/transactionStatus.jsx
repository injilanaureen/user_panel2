import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { FileText } from 'lucide-react';


const Transaction1Status = ({ transactionData = null, errorMessage = null }) => {
  const [referenceId, setReferenceId] = useState('');
  const [transaction, setTransaction] = useState(transactionData);
  const [error, setError] = useState(errorMessage || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setTransaction(null);

    router.post('/processTransaction1Status', { referenceid: referenceId }, {
      onSuccess: (page) => {
        if (page.props.transactionData) {
          setTransaction(page.props.transactionData);
        } else if (page.props.error) {
          setError(page.props.error);
        }
      }
    });
  };

  return (
    <div className="p-4 max-w-full shadow-lg rounded-xl" >
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Transaction Status
      </h1>
    
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 gap-4">
        <div className="relative flex flex-col  group">
          <label className="block font-semibold text-primary_color mb-2">Reference ID:</label>
          <div className="relative w-full">
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              <FileText size={24} className="text-pink-500 animate-bounce" />
            </span>
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder="Enter Reference ID"
              required
              className="p-3 pl-8 border rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
              style={{ backgroundColor: '#ffffff' }}
            />
          </div>
        </div>
    
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 w-full"
          >
            Check Status
          </button>
        </div>
      </form>
    
      {error && <p className="text-red-500">{error}</p>}
    
      {transaction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-light">Transaction Details</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left text-green-dark">Field</th>
                <th className="border p-2 text-left text-green-dark">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(transaction).map(([key, value]) => (
                <tr key={key} className="border-t">
                  <td className="border p-2 font-medium text-white-dark capitalize">{key.replace(/_/g, ' ')}</td>
                  <td className="border p-2 text-white-dark">
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transaction1Status;
