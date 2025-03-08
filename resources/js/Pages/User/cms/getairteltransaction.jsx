import axios from "axios";
import { useState } from "react";
import { Search } from 'lucide-react';

const CheckTransaction = () => {
  const [refid, setRefid] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    try {
      const response = await axios.post("/cms/airtel/check-status", { refid });
      console.log("API Response:", response.data);
      setResponseData(response.data);
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    
    <div className="p-2 flex flex-col items-center max-w-full  ">
      <h2 className="text-xl font-bold bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Check Transaction Status
      </h2>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex items-center gap-2 relative group">
          <Search 
            className="size-6 absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125 text-blue-500 animate-bounce"
          />
          <input 
            type="text" 
            className="w-full px-4 py-2 border-2 border-gray-dark rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-gray-800 placeholder-gray-500 shadow-sm transition-all duration-300 pl-8"
            placeholder="Enter Ref ID" 
            required 
          />
        </div>
        <button className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-primary_color hover:bg-secondary_color hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          Check Status
        </button>
      </form>
    </div>
  
  
  );
};

export default CheckTransaction;
