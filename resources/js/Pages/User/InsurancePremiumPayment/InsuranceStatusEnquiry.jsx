import { useState } from "react";
import axios from "axios";
import { FileText } from 'lucide-react'; // Icon for Reference ID


const InsuranceStatusEnquiry = () => {
  const [referenceId, setReferenceId] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/admin/InsurancePremiumPayment/fetchInsuranceStatus", {
        referenceid: referenceId,
      });
      setResponseData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      {/* Title with Penny Drop styling */}
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
        Insurance Status Enquiry
      </h1>
    
      {/* Input Section with Penny Drop styling */}
      <div className="mb-4 md:mb-6">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileText size={24} className="text-blue-500 animate-bounce" />
          </span>
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
            placeholder="REFERENCE ID"
          />
        </div>
        <button
          onClick={fetchStatus}
          className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out mt-4 w-full md:mt-6 md:p-3 ${
            loading || !referenceId ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || !referenceId}
        >
          {loading ? "Fetching..." : "Check Status"}
        </button>
      </div>
    
      {/* Error Message */}
      {error && <p className="text-red-500 text-xs italic mt-2 md:mt-4 md:text-sm">{error}</p>}
    
      {/* Table with Penny Drop styling */}
      {responseData && responseData.data && (
        <div className="mt-4 md:mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">API Response</h2>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 mt-6 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Field</th>
                  <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(responseData.data).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-50 transition duration-200">
                    <td className="border border-gray-400 p-2 text-gray-600 font-semibold md:p-3 capitalize">{key.replace(/_/g, " ")}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{value || "N/A"}</td>
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

export default InsuranceStatusEnquiry;
