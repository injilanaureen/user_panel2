import React, { useState } from "react";
import axios from "axios";
import { Mail, Calendar, CreditCard, List } from "lucide-react";


const FetchLICBill = () => {
  const [formData, setFormData] = useState({
    canumber: "",
    ad1: "",
    ad2: "",
    mode: "", // User selects "Offline"
  });

  const [billData, setBillData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBill = async () => {
    console.log("Sending Form Data:", formData);

    try {
        const response = await axios.post(
            "https://sit.paysprint.in/service-api/api/v1/service/bill-payment/bill/fetchlicbill",
            formData,
            {
                headers: {
                    Authorisedkey: "Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=",
                    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDAwMjk5NjEsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQwMDI5OTYxIn0.FinP5ONFH5_lPJ6wPlHsYN1EjEsI1RuXM0IqlGvokHU",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Received Bill Data:", response.data);
        setBillData(response.data);

        if (response.data.status) {
            const billPayload = {
                ...formData,  // Include form input data
                ...response.data, // Include fetched bill details
                bill_fetch: response.data.bill_fetch || {} // Ensure nested bill_fetch exists
            };

            console.log("Saving to DB:", billPayload);
            saveBillToDB(billPayload);
        } else {
            alert("Bill fetch failed: " + response.data.message);
        }
    } catch (error) {
        console.error("Error fetching bill:", error);
    }
};

  console.log(billData)

  const saveBillToDB = async (billData) => {
    try {
      const response = await axios.post("/save-bill", billData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        alert("Bill saved successfully!");
      } else {
        alert("Failed to save bill.");
      }
    } catch (error) {
      console.error("Error saving bill:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBill();
  };

  return (
    <div className=" mt-10 p-5 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-tertiary-color">Fetch LIC Bill</h2>
  
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full">
        {/* Consumer Number */}
        <div className="relative w-full">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 w-5 h-5" />
          <input
            type="text"
            name="canumber"
            value={formData.canumber}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded  text-white outline-none placeholder:text-gray-dark"
            placeholder="Consumer Number"
            required
          />
        </div>
  
        {/* Email */}
        <div className="relative w-full">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-900 w-5 h-5" />
          <input
            type="email"
            name="ad1"
            value={formData.ad1}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded  text-white outline-none placeholder:text-gray-dark"
            placeholder="Email"
            required
          />
        </div>
  
        {/* Date */}
        <div className="relative w-full">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-800 w-5 h-5" />
          <input
            type="date"
            name="ad2"
            value={formData.ad2}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded  text-primary_color outline-none placeholder:text-gray-dark"
            required
          />
        </div>
  
        {/* Mode */}
        <div className="relative w-full">
          <List className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 w-5 h-5" />
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded  text-accent_color outline-none"
            required
          >
            <option value="">Select Mode</option>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>
  
        {/* Error Message */}
        {error && <p className="col-span-2 text-red-500">{error}</p>}
  
        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 w-full mt-3 bg-primary_color text-btn-text-color py-2 rounded hover:bg-secondary-color transition"
        >
          Fetch Bill
        </button>
      </form>
    </div>
  );
};

export default FetchLICBill;
