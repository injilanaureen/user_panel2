import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Search } from 'lucide-react';


const QueryRemitter = () => {
    const [mobile, setMobile] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSearch = async () => {
        try {
            setError(null);
            setLoading(true);
            setSaveStatus(null);

            const response = await axios.post('/admin/remitter2/queryRemitter', { mobile });
            
            if (response.data.success) {
                setData(response.data.data);
                // After successful fetch, attempt to store the data
                await handleStoreData(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch data');
                setData(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleStoreData = async (remitterData) => {
        try {
            // Extract relevant data from the API response
            const storeResponse = await axios.post('/admin/remitter2/storeRemitter', {
                mobile: mobile,
                limit: remitterData.limit || 0, // Assuming the API returns a limit field
            });

            if (storeResponse.data.success) {
                setSaveStatus({
                    type: 'success',
                    message: 'Remitter data saved successfully'
                });
            }
        } catch (err) {
            setSaveStatus({
                type: 'error',
                message: err.response?.data?.message || 'Failed to save remitter data'
            });
        }
    };

    // Function to check if value is an object and return a string representation
    const formatValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    };

    return (
      


        <div className="p-4 max-w-full rounded-xl shadow-lg ">
          <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
            Query Remitter
          </h1>
        
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col items-center gap-4">
            <div className="relative flex  items-center group max-w-full">
              <span className="transition-transform duration-300 ease-in-out group-hover:scale-125 mb-2">
                <Phone size={24} className="text-blue-500 animate-bounce" />
              </span>
              <div className="w-full">
                <label className="block font-semibold text-[#497D74] mb-1 text-center">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border p-3 rounded  focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                  style={{ backgroundColor: '#ffffff' }}
                  maxLength={10}
                  required
                />
              </div>
            </div>
        
            <button
              type="submit"
              disabled={loading || !mobile}
              className={`bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 max-w-full ${loading || !mobile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        
          {error && (
            <div className="mt-4 p-3 bg-red-200 text-red-800 rounded">{error}</div>
          )}
        
          {saveStatus && (
            <div className={`mt-4 p-3 rounded ${saveStatus.type === 'success' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
              {saveStatus.message}
            </div>
          )}
        
          {data && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4 text-green-light">Remitter Information</h2>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-left">Field</th>
                      <th className="border p-2 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border p-2 font-semibold">{key}</td>
                        <td className="border p-2">{formatValue(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        
          {!data && !error && !loading && (
            <p className="mt-4 text-gray-500 italic text-green-light text-center">
              Enter a mobile number and click search to view remitter details
            </p>
          )}
        </div>
    );
};

export default QueryRemitter;