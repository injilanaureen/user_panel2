import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, FileText, DollarSign, CreditCard } from 'lucide-react'; // Icons for inputs


const LPGPayBill = () => {
  const [formData, setFormData] = useState({
    canumber: "",
    referenceid: "",
    amount: "",
    operator: "",
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Operator ID options
  const operators = [
    { id: 17, name: "Mahanagar Gas Limited" },
    { id: 34, name: "Indraprastha Gas" },
    { id: 35, name: "Gujarat Gas Company Limited" },
    { id: 49, name: "Adani Gas" },
    { id: 68, name: "Siti Energy" },
    { id: 80, name: "Haryana City Gas" },
    { id: 84, name: "Sabarmati Gas Limited (SGL)" },
    { id: 86, name: "Tripura Natural Gas" },
    { id: 100, name: "Unique Central Piped Gases Pvt Ltd (UCPGPL)" },
    { id: 101, name: "Vadodara Gas Limited" },
    { id: 107, name: "Maharashtra Natural Gas Limited" },
    { id: 113, name: "Charotar Gas Sahakari Mandali Ltd" },
    { id: 122, name: "Aavantika Gas Ltd" },
    { id: 124, name: "Central U.P. Gas Limited" },
    { id: 129, name: "Indian Oil-Adani Gas Private Limited" },
    { id: 139, name: "Gail Gas Limited" },
    { id: 141, name: "IRM Energy Private Limited" },
    { id: 156, name: "Green Gas Limited (GGL)" },
    { id: 172, name: "Assam Gas Company Limited" },
    { id: 177, name: "Bhagyanagar Gas Limited" },
    { id: 194, name: "Sanwariya Gas Limited" },
    { id: 282, name: "Megha Gas" },
    { id: 283, name: "Torrent Gas Moradabad Limited (Formerly Siti Energy Limited)" },
    { id: 286, name: "Indane Gas" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await axios.post("/pay-lpg-bill", formData);
      setApiResponse(response.data);
      // Refresh transaction history if it's visible
      if (showHistory) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiResponse({ error: "Failed to fetch API response" });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setHistoryLoading(true);
    try {
      const response = await axios.get('/lpg-bill-history');
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      fetchTransactions();
    }
  };

  return (

    <div className="p-4 max-w-full md:p-6">
      {/* Header with Penny Drop styling */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl">
          LPG Bill Payment
        </h1>
        <button
          onClick={toggleHistory}
          className="bg-gray-500 text-white p-2 rounded-lg font-bold hover:bg-gray-600 hover:scale-105 transition duration-300 ease-in-out md:p-3"
        >
          {showHistory ? "Hide History" : "View History"}
        </button>
      </div>
    
      {/* Form with Penny Drop styling */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <User size={24} className="text-blue-500 animate-bounce" />
          </span>
          <input
            type="text"
            name="canumber"
            placeholder="CA NUMBER"
            value={formData.canumber}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
          />
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileText size={24} className="text-purple-500 animate-bounce" />
          </span>
          <input
            type="text"
            name="referenceid"
            placeholder="REFERENCE ID"
            value={formData.referenceid}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
          />
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <DollarSign size={24} className="text-green-500 animate-bounce" />
          </span>
          <input
            type="number"
            name="amount"
            placeholder="AMOUNT"
            value={formData.amount}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
          />
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-orange-500 animate-bounce" />
          </span>
          <select
            name="operator"
            value={formData.operator}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
          >
            <option value="">SELECT OPERATOR</option>
            {operators.map((op) => (
              <option key={op.id} value={op.id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
    
        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out w-full md:p-3 md:col-span-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Bill"}
        </button>
      </form>
    
      {/* API Response with Penny Drop styling */}
      {apiResponse && (
        <div className="mt-6 bg-white p-4 rounded shadow-md md:mt-8 md:p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 md:text-xl">API Response:</h2>
          {apiResponse.error ? (
            <p className="text-red-500 text-xs italic md:text-sm">{apiResponse.error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Status</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Response Code</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Operator ID</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ack No</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.status ? "Success" : "Failed"}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.response_code}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.operatorid}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.ackno}</td>
                    <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{apiResponse.message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    
      {/* Transaction History with Penny Drop styling */}
      {showHistory && (
        <div className="mt-8 md:mt-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 md:text-xl">Transaction History</h2>
          {historyLoading ? (
            <div className="text-center p-4 text-gray-600 md:p-6">Loading history...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Date</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">CA Number</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Reference ID</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Amount</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Operator</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Status</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Ack No</th>
                    <th className="border border-gray-400 p-2 text-gray-700 font-semibold text-left md:p-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{transaction.canumber}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{transaction.referenceid}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">₹{transaction.amount}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{transaction.operator}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            transaction.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{transaction.ackno}</td>
                      <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{transaction.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LPGPayBill;