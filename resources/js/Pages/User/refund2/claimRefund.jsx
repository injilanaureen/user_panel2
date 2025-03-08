import React, { useState } from 'react';
import { router } from '@inertiajs/react';    import { Info, FileText } from 'lucide-react';


const ClaimRefund = ({ apiResponse }) => {
  const [ackno, setAckno] = useState('');
  const [referenceid, setReferenceid] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('transaction2.processRefund'), {
      ackno,
      referenceid,

    });
  };

  return (


    <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Claim Refund
      </h1>
    
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full lg:max-w-full ">
        {['ackno', 'referenceid'].map((key) => (
          <div key={key} className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              {key === 'ackno' ? (
                <Info size={24} className="text-red-500 animate-bounce" />
              ) : (
                <FileText size={24} className="text-indigo-500 animate-bounce" />
              )}
            </span>
            <input
              type="text"
              name={key}
              placeholder={key.toUpperCase()}
              value={key === 'ackno' ? ackno : referenceid}
              onChange={(e) => (key === 'ackno' ? setAckno(e.target.value) : setReferenceid(e.target.value))}
              className="border p-2 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary_color text-white p-1 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
        >
          Submit
        </button>
      </form>
    
      {apiResponse && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-light">API Response:</h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">FIELD</th>
                  <th className="border p-2">VALUE</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(apiResponse).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-100">
                    <td className="border p-2 font-medium">{key.toUpperCase()}</td>
                    <td className="border p-2">{String(value)}</td>
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
