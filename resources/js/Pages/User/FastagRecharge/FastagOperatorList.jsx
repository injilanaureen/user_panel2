import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Search } from 'lucide-react'; // Icon for search input

const FastagOperatorList = () => {
  const { operators } = usePage().props; // Get API response from Laravel
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOperators, setFilteredOperators] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log("API Response:", operators);
    setFilteredOperators(operators?.data || []);
  }, [operators]);

  // Handle search functionality
  useEffect(() => {
    const filtered = operators?.data?.filter(operator => 
      operator.id.toString().includes(searchTerm) ||
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.displayname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (operator.ad1_regex && operator.ad1_regex.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];
    setFilteredOperators(filtered);
    setCurrentPage(1);
  }, [searchTerm, operators]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOperators.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOperators.length / itemsPerPage);

  return (

<div className="p-4 max-w-full md:p-6">
  <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center md:text-2xl md:mb-6">
    Fastag Operators
  </h1>

  <div className="mb-4 md:mb-6">
    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <Search size={24} className="text-blue-500 animate-bounce" />
      </span>
      <input
        type="text"
        placeholder="SEARCH OPERATORS"
        className="border border-gray-300 p-3 pl-8 mt-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 md:p-4 md:pl-12"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  <div className="overflow-x-auto mt-4 md:mt-6">
    <table className="border-collapse border border-gray-400 w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Operator ID</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Operator Name</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Category</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">View Bill</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Display Name</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Regex</th>
          <th className="border border-gray-400 p-2 text-gray-700 font-semibold md:p-3">Ad1 Regex</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((operator, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-200">
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.id}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.name}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.category}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.viewbill}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.displayname}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.regex || "N/A"}</td>
              <td className="border border-gray-400 p-2 text-gray-600 md:p-3">{operator.ad1_regex || "N/A"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="border border-gray-400 p-4 text-gray-600 text-center md:p-6">
              No matching records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <div className="flex justify-center items-center mt-4 space-x-2 md:mt-6 md:space-x-4">
    <button
      className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out md:p-3 ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Prev
    </button>
    <span className="px-4 text-gray-800 font-semibold md:text-lg">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className={`bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out md:p-3 ${
        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  </div>
</div>
  );
};

export default FastagOperatorList;
