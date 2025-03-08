import React, { useState } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
function App() {
  const [mobile, setMobile] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseData(null);
  
    try {
      const response = await axios.post("/query-remitter", {
        mobile: mobile
      });

      console.log(response.data);      
      setResponseData(response.data); // Assuming API returns a similar JSON structure
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
    if (status === true) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Success
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <AlertCircle className="w-3 h-3 mr-1" />
        Failed
      </span>
    );
  };

  const getResponseCodeBadge = (code) => {
    const badges = {
      1: { color: "bg-green-100 text-green-800", text: "Success" },
      2: { color: "bg-yellow-100 text-yellow-800", text: "KYC Required" },
      3: { color: "bg-red-100 text-red-800", text: "Error" }
    };
    
    const badge = badges[code] || { color: "bg-gray-100 text-gray-800", text: `Code ${code}` };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (

    <div className=" max-w-full">
      <div className="sm:px-6 ">
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold  bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
            Query Remitter
          </h1>

        </div>
    
        <div className="mt-10 sm:mt-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-8 rounded-xl shadow-2xl bg-white-light bg-opacity-95 backdrop-blur-md border border-gray-light">
            <div className="relative flex items-center group">
              <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                <Search size={24} className="text-blue-500 animate-bounce" />
              </span>
              <div className="w-full">
                <label htmlFor="mobile" className="block font-semibold text-primary_color mb-1 uppercase">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  pattern="[0-9]{10}"
                  required
                  className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            </div>
    
            <button
              type="submit"
              disabled={loading}
              className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 inline" />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
    
          {error && (
            <div className="mt-4 p-3 bg-red-200 text-red-800 rounded">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-800 flex-shrink-0" aria-hidden="true" />
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
    
          {responseData && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4 text-green-light">Response Details</h2>
              <div className="shadow-2xl overflow-hidden rounded-2xl bg-white-light bg-opacity-90 backdrop-blur-lg border border-gray-light transform hover:scale-[1.01] transition-transform duration-300">
                <div className="px-6 py-6 sm:px-8 bg-gray-light bg-opacity-70 border-b border-gray-light">
                  <h3 className="text-xl font-semibold text-gray-dark tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary_color animate-pulse"></span>
                    Remitter Information
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-gray-darker opacity-75 italic">
                    Details and status of the remitter query.
                  </p>
                </div>
                <div className="border-t border-gray-light">
                  <dl className="divide-y divide-gray-light">
                    <div className="px-6 py-5 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-8 bg-white-light hover:bg-hover-primary transition-all duration-300 ease-in-out group">
                      <dt className="text-sm font-semibold text-gray-dark tracking-wide uppercase">Status</dt>
                      <dd className="mt-1 text-sm text-green-dark sm:mt-0 sm:col-span-3 font-medium group-hover:text-accent_color transition-colors duration-300">
                        {getStatusBadge(responseData.status)}
                      </dd>
                    </div>
                    <div className="px-6 py-5 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-8 bg-gray-lighter hover:bg-hover-primary transition-all duration-300 ease-in-out group">
                      <dt className="text-sm font-semibold text-gray-dark tracking-wide uppercase">Response Code</dt>
                      <dd className="mt-1 text-sm text-green-dark sm:mt-0 sm:col-span-3 font-medium group-hover:text-accent_color transition-colors duration-300">
                        {getResponseCodeBadge(responseData.response_code)}
                      </dd>
                    </div>
                    <div className="px-6 py-5 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-8 bg-white-light hover:bg-hover-primary transition-all duration-300 ease-in-out group">
                      <dt className="text-sm font-semibold text-gray-dark tracking-wide uppercase">Message</dt>
                      <dd className="mt-1 text-sm text-green-dark sm:mt-0 sm:col-span-3 font-medium group-hover:text-accent_color transition-colors duration-300">
                        {responseData.message}
                      </dd>
                    </div>
                    {responseData.data && (
                      <div className="px-6 py-5 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-8 bg-gray-lighter hover:bg-hover-primary transition-all duration-300 ease-in-out group">
                        <dt className="text-sm font-semibold text-gray-dark tracking-wide uppercase">Mobile Number</dt>
                        <dd className="mt-1 text-sm text-green-dark sm:mt-0 sm:col-span-3 font-medium group-hover:text-accent_color transition-colors duration-300">
                          {responseData.data.mobile}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;