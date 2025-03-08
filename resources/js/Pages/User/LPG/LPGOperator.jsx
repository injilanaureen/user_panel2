import React, { useState } from "react";
import axios from "axios";
import { Globe } from 'lucide-react'; // Icon for Mode selection


const LPGOperator = () => {
  const [mode, setMode] = useState("online");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/fetch-lpg-operator", { mode });
      setData(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Error fetching data");
      setData([]);
    }
    setLoading(false);
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
        LPG Operators
      </h1>
    
      <div className="mb-4 md:mb-6">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Globe size={24} className="text-blue-500 animate-bounce" />
          </span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out mt-4 w-full md:mt-6 md:p-3"
        >
          Fetch Data
        </button>
      </div>
    
      {/* Loading, Error, or Table with Penny Drop styling */}
      {loading ? (
        <p className="text-blue-600 font-semibold text-sm md:text-base">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xs italic md:text-sm">{error}</p>
      ) : data.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 md:p-6">
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">ID</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Category</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">View Bill</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Regex</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Display Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad1 Display Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad1 Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad1 Regex</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad2 Display Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad2 Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad2 Regex</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad3 Display Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad3 Name</th>
                <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad3 Regex</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.id}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.name}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.category}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.viewbill}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.regex || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.displayname || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad1_d_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad1_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad1_regex || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad2_d_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad2_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad2_regex || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad3_d_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad3_name || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{item.ad3_regex || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm md:text-base">No data available</p>
      )}
    </div>
  );
};

export default LPGOperator;
