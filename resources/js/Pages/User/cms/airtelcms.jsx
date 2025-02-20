import { useState } from "react";
import axios from "axios";

export default function AirtelForm() {
  const [formData, setFormData] = useState({
    refid: "",
    latitude: "",
    longitude: "",
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setApiResponse(null);
  
    try {
      const response = await axios.post("/cms/airtel", formData);
  
      console.log("✅ API Response:", response.data); // Debugging
  
      if (response.data?.status === true && response.data?.redirectionUrl) {
        // Redirect the user to the received URL
        window.location.href = response.data.redirectionUrl;
      } else {
        setApiResponse(response.data || response.data.data);
      }
    } catch (err) {
      if (err.response) {
        console.log("❌ API Error Response:", err.response.data);
        setError(err.response.data.message || "An error occurred.");
      } else {
        console.log("❌ Network Error:", err);
        setError("Network error or server is unreachable.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Generate URL
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ref ID:</label>
            <input
              type="number"
              name="refid"
              value={formData.refid}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Generate URL"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}
