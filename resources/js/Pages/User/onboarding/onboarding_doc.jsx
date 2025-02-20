import React, { useState } from "react";
import axios from "axios";

export default function OnboardingDoc() {
  const [formData, setFormData] = useState({
    merchantcode: "",
    mobile: "",
    is_new: "0",
    email: "",
    firm: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sit.paysprint.in/service-api/api/v1/service/onboard/onboardnew/getonboardurl",
        {
          ...formData,
          callback: "http://127.0.0.1:8000/members/kyc"
        },
        {
          headers: {
            Authorisedkey: "Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=",
            Token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk5NDkwMzAsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5OTQ5MDMwIn0.hJmQhoW4Y2nIPKmxIXmw66gBrjljV0_991IVDkuFB0o",
            Accept: "text/plain",
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response);
      if (response.data.status) {
        window.location.href = response.data.redirecturl;
      } else {
        alert("Failed to fetch onboarding URL");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error occurred while processing request");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Merchant Onboarding</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Merchant Code</label>
          <input
            type="text"
            name="merchantcode"
            value={formData.merchantcode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Account Type</label>
          <select
            name="is_new"
            value={formData.is_new}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="0">New</option>
            <option value="1">Existing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Firm Name</label>
          <input
            type="text"
            name="firm"
            value={formData.firm}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
