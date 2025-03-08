import React, { useState } from 'react';

const OperatorList = ({ operators, error, success }) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Get the current page from the paginated data
    const currentPage = operators?.current_page || 1;
    
    if (error) {
        return (
                <div className="p-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
        );
    }

    if (!operators || !operators.data || operators.data.length === 0) {
        return (
                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Operator List</h1>
                    <p>No operators found.</p>
                </div>
           
        );
    }

    // Filter the data based on search term
    const filteredOperators = operators.data.filter(operator =>
        operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (operator.displayname && operator.displayname.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6 max-w-full bg-gray-50 rounded-xl shadow-md overflow-x-hidden">
        {/* Enhanced Title */}
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-900 via-green-600 to-teal-400 text-white p-4 rounded-lg shadow-lg text-center tracking-wide">
          Operator List
        </h1>
      
        {/* Enhanced Success Message */}
        {success && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg shadow-md animate-fade-in">
            {success}
          </div>
        )}
      
        {/* Enhanced Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Name, Category, or Display Name..."
            className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      
        {/* Enhanced Table */}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">ID</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Operator Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Category</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">View Bill</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Display Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Regex</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad1 Display Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad1 Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad1 Regex</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad2 Display Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad2 Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad2 Regex</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad3 Display Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad3 Name</th>
                <th className="px-2 py-3 border-b border-gray-200 text-left font-semibold text-xs uppercase tracking-wider truncate">Ad3 Regex</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperators.length > 0 ? (
                filteredOperators.map((operator) => (
                  <tr key={operator.id} className="hover:bg-teal-50 transition duration-200 ease-in-out">
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.id}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.name}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.category}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.viewbill ? "Yes" : "No"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.displayname || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.regex || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad1_d_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad1_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad1_regex || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad2_d_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad2_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad2_regex || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad3_d_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad3_name || "N/A"}</td>
                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600 truncate">{operator.ad3_regex || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="px-2 py-4 border-b border-gray-200 text-gray-500 text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      
        {/* Enhanced Pagination Controls */}
        {operators.last_page > 1 && (
          <div className="flex justify-between items-center mt-8">
            <a
              href={operators.prev_page_url}
              className={`bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-teal-600 hover:scale-105 transition duration-300 ease-in-out ${
                !operators.prev_page_url ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!operators.prev_page_url}
            >
              Previous
            </a>
            <span className="text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              Page {operators.current_page} of {operators.last_page}
            </span>
            <a
              href={operators.next_page_url}
              className={`bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-teal-600 hover:scale-105 transition duration-300 ease-in-out ${
                !operators.next_page_url ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!operators.next_page_url}
            >
              Next
            </a>
          </div>
        )}
      </div>
    );
};

export default OperatorList;