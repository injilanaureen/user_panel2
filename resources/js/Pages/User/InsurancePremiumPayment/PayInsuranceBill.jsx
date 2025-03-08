import { useState } from "react";
import axios from "axios";
import { User, DollarSign, FileText } from 'lucide-react'; // Icons for Customer Number, Amount, Reference ID


const PayInsuranceBill = () => {
  const [formData, setFormData] = useState({
    canumber: "",
    amount: "",
    referenceid: "",
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/pay-insurance-bill", formData);
      setApiResponse(response.data);
    } catch (error) {
      setError("Failed to fetch API response");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        {/* Title with Penny Drop styling */}
        <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
          Pay Insurance Bill
        </h1>
    
        {/* Form with Penny Drop styling */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              <User size={24} className="text-blue-500 animate-bounce" />
            </span>
            <input
              type="text"
              name="canumber"
              value={formData.canumber}
              onChange={handleChange}
              className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
              placeholder="CUSTOMER NUMBER"
              required
            />
          </div>
    
          <div className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              <DollarSign size={24} className="text-purple-500 animate-bounce" />
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
              placeholder="AMOUNT"
              required
            />
          </div>
    
          <div className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              <FileText size={24} className="text-green-500 animate-bounce" />
            </span>
            <input
              type="text"
              name="referenceid"
              value={formData.referenceid}
              onChange={handleChange}
              className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
              placeholder="REFERENCE ID"
              required
            />
          </div>
    
          <button
            type="submit"
            className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 md:col-span-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
    
        {/* Error Message */}
        {error && <p className="text-red-500 text-xs italic mt-4 md:mt-6 md:text-sm">{error}</p>}
    
        {/* Table with Penny Drop styling */}
        {apiResponse && (
          <div className="mt-4 md:mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">API Response:</h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 mt-6 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Status</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Response Code</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Operator ID</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Acknowledgment No.</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Reference ID</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.status ? "Success" : "Failed"}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.response_code}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.operatorid}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.ackno}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.refid}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayInsuranceBill;
