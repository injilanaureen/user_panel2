import { useState } from "react";
import axios from "axios";
import { User, Mail, Calendar } from 'lucide-react'; // Icons for CA Number, Email, Date


const FetchInsuranceBillDetails = () => {
  const [formData, setFormData] = useState({
    canumber: "",
    ad1: "",
    ad2: "",
    mode: "online",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [billDetails, setBillDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/admin/InsurancePremiumPayment/fetch-lic-bill",
        formData
      );
      setBillDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bill details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {/* Title with Penny Drop styling */}
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
            Fetch Insurance Bill Details
          </h2>
    
          {/* Form with Penny Drop styling */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <User size={24} className="text-blue-500 animate-bounce" />
              </span>
              <input
                type="number"
                name="canumber"
                value={formData.canumber}
                onChange={handleChange}
                className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
                placeholder="CA NUMBER"
                required
              />
            </div>
    
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <Mail size={24} className="text-purple-500 animate-bounce" />
              </span>
              <input
                type="email"
                name="ad1"
                value={formData.ad1}
                onChange={handleChange}
                className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
                placeholder="EMAIL"
                required
              />
            </div>
    
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <Calendar size={24} className="text-green-500 animate-bounce" />
              </span>
              <input
                type="date"
                name="ad2"
                value={formData.ad2}
                onChange={handleChange}
                className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
                placeholder="DATE"
              />
            </div>
    
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 md:col-span-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? "Loading..." : "Fetch Bill Details"}
            </button>
          </form>
    
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg md:mt-6">
              <p className="text-sm text-red-700 md:text-base">{error}</p>
            </div>
          )}
    
          {/* Table with Penny Drop styling */}
          {billDetails && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">Bill Details</h2>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 mt-6 w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Customer Name</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Bill Amount</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Net Amount</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Due Date</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Max Bill Amount</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Accept Payment</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Accept Part Pay</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Cell Number</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Email (ad1)</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Additional Field (ad2)</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Status Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.name || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.bill_fetch?.billAmount || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.bill_fetch?.billnetamount || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.bill_fetch?.dueDate || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.bill_fetch?.maxBillAmount || "N/A"}</td>
                      <td className={`border border-gray-400 p-2 text-gray-600 md:p-3 ${billDetails.bill_fetch?.acceptPayment ? "text-green-600" : "text-red-600"}`}>
                        {billDetails.bill_fetch?.acceptPayment ? "Yes" : "No"}
                      </td>
                      <td className={`border border-gray-400 p-2 text-gray-600 md:p-3 ${billDetails.bill_fetch?.acceptPartPay ? "text-green-600" : "text-red-600"}`}>
                        {billDetails.bill_fetch?.acceptPartPay ? "Yes" : "No"}
                      </td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.bill_fetch?.cellNumber || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.ad1 || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.ad2 || "N/A"}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{billDetails.message || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchInsuranceBillDetails;
