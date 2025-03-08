import React, { useState } from "react";
import { Phone, Key, FileText } from 'lucide-react';


const RegisterRemitter = ({ recentRegistrations = [] }) => {
    const [formData, setFormData] = useState({
        mobile: "",
        otp: "",
        stateresp: "",
        data: "",
        accessmode: "SITE",
        is_iris: 2,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("form"); // 'form' or 'history'

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSendOtp = async () => {
        if (formData.mobile.length !== 10) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }
    
        try {
            const response = await fetch("YOUR_OTP_API_ENDPOINT", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: formData.mobile }),
            });
    
            const data = await response.json();
            alert(data.message || "OTP sent successfully!");
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Try again.");
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "/api/admin/remitter2/register-remitter",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (response.ok) {
                setApiData(result.data);
                setError(null);
                window.location.reload(); // Refresh to show updated data
            } else {
                setError(result.error || "Failed to register remitter");
                setApiData(null);
            }
        } catch (err) {
            setError(
                "Failed to communicate with the server. Please try again."
            );
            setApiData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (


        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
                Remitter Registration
              </h1>
        
            </div>
        
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`${
                    activeTab === "form"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Registration Form
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`${
                    activeTab === "history"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Registration History
                </button>
              </nav>
            </div>
        
            {activeTab === "form" ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold mb-4 text-primary_color">New Registration</h2>
                </div>
        
                <div className="p-6">
                  {error && (
                    <div className="mb-4 p-3 bg-red-200 text-red-600 rounded">{error}</div>
                  )}
        
                  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <Phone size={24} className="text-blue-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="mobile" className="block font-semibold text-[#497D74] mb-1">Mobile Number</label>
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          pattern="[0-9]{10}"
                          maxLength="10"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                          required
                          placeholder="Enter 10 digit mobile number"
                        />
                      </div>
                    </div>
        
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 mt-6"
                      >
                        Send OTP
                      </button>
                    </div>
        
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <Key size={24} className="text-indigo-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="otp" className="block font-semibold text-[#497D74] mb-1">OTP</label>
                        <input
                          type="text"
                          id="otp"
                          name="otp"
                          pattern="[0-9]{6}"
                          maxLength="6"
                          value={formData.otp}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                          required
                          placeholder="Enter 6 digit OTP"
                        />
                      </div>
                    </div>
        
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <FileText size={24} className="text-pink-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="stateresp" className="block font-semibold text-[#497D74] mb-1">State Response</label>
                        <input
                          type="text"
                          id="stateresp"
                          name="stateresp"
                          value={formData.stateresp}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                          required
                        />
                      </div>
                    </div>
        
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <FileText size={24} className="text-pink-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="data" className="block font-semibold text-[#497D74] mb-1">Data</label>
                        <input
                          type="text"
                          id="data"
                          name="data"
                          value={formData.data}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                          required
                        />
                      </div>
                    </div>
        
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <FileText size={24} className="text-pink-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="accessmode" className="block font-semibold text-[#497D74] mb-1">Access Mode</label>
                        <select
                          id="accessmode"
                          name="accessmode"
                          value={formData.accessmode}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <option value="SITE">SITE</option>
                          <option value="API">API</option>
                        </select>
                      </div>
                    </div>
        
                    <div className="relative flex items-center group">
                      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                        <FileText size={24} className="text-pink-500 animate-bounce" />
                      </span>
                      <div className="w-full">
                        <label htmlFor="is_iris" className="block font-semibold text-[#497D74] mb-1">Is Iris</label>
                        <select
                          id="is_iris"
                          name="is_iris"
                          value={formData.is_iris}
                          onChange={handleChange}
                          className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white-dark"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <option value={2}>No</option>
                          <option value={1}>Yes</option>
                        </select>
                      </div>
                    </div>
        
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 col-span-2"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Register Remitter"
                      )}
                    </button>
                  </form>
        
                  {apiData && (
                    <div className="mt-4">
                      <h3 className="text-xl font-bold mb-4 text-green-light">API Response</h3>
                      <pre className="bg-white p-4 rounded overflow-x-auto">{JSON.stringify(apiData, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold mb-4 text-green-light">Registration History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-400">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Mobile</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Message</th>
                        <th className="border p-2 text-left">Access Mode</th>
                        <th className="border p-2 text-left">Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRegistrations.map((registration, index) => (
                        <tr key={registration.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="border p-2">{new Date(registration.created_at).toLocaleString()}</td>
                          <td className="border p-2 font-medium">{registration.mobile}</td>
                          <td className="border p-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${registration.status === "success" ? "bg-green-100 text-green-800" : registration.status === "error" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {registration.status || "Pending"}
                            </span>
                          </td>
                          <td className="border p-2">{registration.message}</td>
                          <td className="border p-2">{registration.accessmode}</td>
                          <td className="border p-2">{registration.limit ? `₹${registration.limit.toLocaleString()}` : "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
    );
};

export default RegisterRemitter;
