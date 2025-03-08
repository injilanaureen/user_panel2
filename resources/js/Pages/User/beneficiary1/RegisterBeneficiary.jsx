import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Phone, User, Banknote, CreditCard, Code, Calendar, MapPin, Pin } from "lucide-react";
const RegisterBeneficiary = () => {
  const { flash, responseData } = usePage().props;
  
  const { data, setData, post, processing, errors, reset } = useForm({
    mobile: "",
    benename: "",
    bankid: "",
    accno: "",
    ifsccode: "",
    verified: "0",
    gst_state: "07",
    dob: "",
    address: "",
    pincode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   post(route('store-beneficiary'), {
      preserveScroll: true,
    });

  };

  useEffect(() => {
    if (flash && flash.status === 'success') {
      // Optionally reset the form after successful submission
      // reset();
    }
  }, [flash]);

  return (
  
    <div className="p-6 rounded-xl shadow-lg max-w-full">
    <div className="bg-clip-padding p-4 rounded-t-xl" style={{ backgroundImage: 'linear-gradient(90deg, #31A78B, #FF8C00)' }}>
        <h1 className="text-lg font-bold text-center text-white">Register Beneficiary</h1>
    </div>
    
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-b-xl grid grid-cols-2 gap-4">
      {[{
        name: "mobile", placeholder: "Mobile Number", icon: <Phone size={20} className="text-green-500" />
      }, {
        name: "benename", placeholder: "Beneficiary Name", icon: <User size={20} className="text-red-500" />
      }, {
        name: "bankid", placeholder: "Bank ID", icon: <Banknote size={20} className="text-yellow-500" />
      }, {
        name: "accno", placeholder: "Account Number", icon: <CreditCard size={20} className="text-blue-500" />
      }, {
        name: "ifsccode", placeholder: "IFSC Code", icon: <Code size={20} className="text-pink-500" />
      }, {
        name: "dob", placeholder: "Date of Birth", type: "date", icon: <Calendar size={20} className="text-orange-500" />
      }, {
        name: "address", placeholder: "Address", icon: <MapPin size={20} className="text-indigo-500" />
      }, {
        name: "pincode", placeholder: "Pincode", icon: <Pin size={20} className="text-purple-500" />
      }].map(({ name, placeholder, icon, type = "text" }) => (
        <div className="relative group" key={name}>
          <label className="block text-lg font-medium text-secondary_color mb-1">{placeholder}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#31A78B] animate-bounce">
              {icon}
            </span>
            <input
              type={type}
              placeholder={placeholder}
              value={data[name]}
              onChange={(e) => setData({ ...data, [name]: e.target.value })}
              required
              className="w-full p-3 pl-12 border rounded-md text-gray-700 placeholder-gray-dark focus:outline-none focus:ring-2 focus:ring-[#31A78B] transition-all duration-300 group-hover:shadow-md group-hover:border-[#1d524a]"
            />
          </div>
          {errors[name] && <div className="text-red-500 mt-1">{errors[name]}</div>}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={processing}
        className="w-full bg-[#497D74] text-white-dark p-3 rounded-md hover:bg-[#1d524a] disabled:bg-[#154039] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        {processing ? 'Processing...' : 'Register Beneficiary'}
      </button>
    </form>
    
    {responseData && (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-green-dark text-center">Response Data</h2>
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Field</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(responseData).map(([key, value]) => (
              <tr key={key} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>


  );
};

export default RegisterBeneficiary;