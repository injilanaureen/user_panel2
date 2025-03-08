import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { CreditCard, User, Globe } from 'lucide-react'; // Assuming Lucide icons

const FetchBillDetails = () => {
    const { billData, errors } = usePage().props;
    const [formData, setFormData] = useState({
        operator: '',
        canumber: '',
        mode: 'online'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        router.post('/admin/utility-bill-payment/fetch-bill-details', formData, {
            onFinish: () => setIsLoading(false)
        });
    };

    return (

        <div className="p-4 max-w-full">
          {/* Title with exact Penny Drop styling */}
          <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
            Fetch Bill Details
          </h1>
        
          {/* Form with exact Penny Drop styling */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <CreditCard size={24} className="text-blue-500 animate-bounce" />
              </span>
              <input
                type="number"
                id="operator"
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                placeholder="OPERATOR"
                required
              />
              {errors?.operator && (
                <p className="text-red-500 text-xs italic mt-1">{errors.operator}</p>
              )}
            </div>
        
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <User size={24} className="text-purple-500 animate-bounce" />
              </span>
              <input
                type="number"
                id="canumber"
                name="canumber"
                value={formData.canumber}
                onChange={handleChange}
                className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                placeholder="CA NUMBER"
                required
              />
              {errors?.canumber && (
                <p className="text-red-500 text-xs italic mt-1">{errors.canumber}</p>
              )}
            </div>
        
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <Globe size={24} className="text-green-500 animate-bounce" />
              </span>
              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                required
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {errors?.mode && (
                <p className="text-red-500 text-xs italic mt-1">{errors.mode}</p>
              )}
            </div>
        
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-800 hover:scale-105 transition duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Fetching...' : 'Fetch Bill Details'}
            </button>
          </form>
        
          {/* Table with Penny Drop styling from Operator List */}
          {billData && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Bill Details:</h2>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 mt-6 w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold">Field</th>
                      <th className="border border-gray-400 p-2 text-gray-700 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Response Code</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.response_code}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Status</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.status ? 'Success' : 'Failed'}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Amount</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.amount}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Name</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.name}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Due Date</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.duedate}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">AD2</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.ad2}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">AD3</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.ad3}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="border border-gray-400 p-2 text-gray-600 font-semibold">Message</td>
                      <td className="border border-gray-400 p-2 text-gray-600">{billData.message}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    );
};

export default FetchBillDetails;
