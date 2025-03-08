import { useState } from "react";
import axios from "axios";
import { FileText } from 'lucide-react'; // Icon for Reference ID


const UtilityStatusEnquiry = () => {
    const [referenceid, setReferenceid] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStatus = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);
    
        try {
            const res = await axios.post("/admin/utility-bill-payment/fetch-utility-status", { referenceid });
            setResponse(res.data);
        } catch (err) {
            setError("Error fetching status");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="p-4 max-w-full md:p-6">
          {/* Title with Penny Drop styling */}
          <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl">
            Utility Status Enquiry
          </h1>
        
          {/* Input Field with Penny Drop styling */}
          <div className="mb-4 md:mb-6">
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <FileText size={24} className="text-blue-500 animate-bounce" />
              </span>
              <input
                type="text"
                className="border border-gray-300 p-3 pl-10 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
                placeholder="REFERENCE ID"
                value={referenceid}
                onChange={(e) => setReferenceid(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out mt-4 w-full md:mt-6 md:p-3"
              onClick={fetchStatus}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Check Status"}
            </button>
          </div>
        
          {/* Error Message */}
          {error && <p className="text-red-500 text-xs italic mt-2 md:mt-4 md:text-sm">{error}</p>}
        
          {/* API Response Table with Penny Drop styling */}
          {response && response.status && response.data && (
            <div className="mt-4 md:mt-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">Transaction Details</h2>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 mt-6 w-full">
                  <tbody>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Field</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Value</th>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Transaction ID</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.txnid}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Operator Name</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.operatorname}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Customer Number</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.canumber}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Amount</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{response.data.amount}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Additional Data 1</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.ad1 || "N/A"}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Additional Data 2</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.ad2 || "N/A"}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Additional Data 3</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.ad3 || "N/A"}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Commission</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{response.data.comm}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">TDS</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{response.data.tds}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Transaction Status</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.status === "1" ? "Success" : "Failed"}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Reference ID</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.refid}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Operator ID</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.operatorid}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Date Added</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.dateadded}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Refunded</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.refunded === "0" ? "No" : "Yes"}</td>
                    </tr>
                    {response.data.refunded !== "0" && (
                      <>
                        <tr className="hover:bg-gray-50 transition duration-200">
                          <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Refund Transaction ID</td>
                          <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.refundtxnid || "N/A"}</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition duration-200">
                          <td className="border border-gray-400 p-2 text-gray-600 md:p-3">Date Refunded</td>
                          <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{response.data.daterefunded || "N/A"}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        
          {/* No Data Message */}
          {response && !response.status && (
            <p className="text-red-500 mt-4 text-xs italic md:mt-6 md:text-sm">{response.message || "No data found"}</p>
          )}
        </div>
    );
};

export default UtilityStatusEnquiry;
