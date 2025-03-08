import { useState } from "react";
import axios from "axios";
import { CreditCard, MapPin, Globe } from 'lucide-react';


export default function AirtelGenerateURL() {
  const [formData, setFormData] = useState({
    refid: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/cms/airtel", formData);
      console.log("✅ API Response:", response.data);

      if (response.data?.status === true && response.data?.redirectionUrl) {
        // Redirect the user to the received URL
        window.location.href = response.data.redirectionUrl;
      } else {
        alert("API Response: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.log("❌ Error:", err);
      setError(err.response?.data?.message || "Network error or server is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (


    <div className="p-2 ">
      <h2 className="text-xl mx-auto font-extrabold bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 mb-4 text-center
       rounded-lg shadow-lg">
        Generate URL
      </h2>
      <form className="space-y-4 bg-white-light p-5 grid grid-cols-2 gap-2 rounded-lg shadow">
        <div className="flex gap-2 items-center relative group">
          <CreditCard className="transform -translate-y-1/2 absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125 text-purple-500 animate-bounce w-6 h-6" />
          <input type="number" className="input-field w-full border-gray-dark border-2 pl-8 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-600" placeholder="Ref ID" required />
        </div>
        <div className="flex gap-2 items-center relative group">
          <MapPin className="transform -translate-y-1/2 absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125 text-yellow-500 animate-bounce w-6 h-6" />
          <input type="text" className="input-field w-full border-gray-dark border-2 pl-8 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-600" placeholder="Latitude" required />
        </div>
        <div className="flex gap-2 items-center relative group">
          <Globe className="transform -translate-y-1/2 absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125 text-green-500 animate-bounce w-5 h-5" />
          <input type="text" className="input-field w-full border-gray-dark border-2 pl-8 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-600" placeholder="Longitude" required />
        </div>
        <button className="btn-primary font-extrabold text-xl bg-primary_color p-1 rounded hover:bg-secondary_color hover:scale-105 transition duration-300 w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
