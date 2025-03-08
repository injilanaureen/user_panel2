import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Phone, User, Banknote, CreditCard, Code, Calendar, MapPin, Pin, } from 'lucide-react';


const FetchBeneficiaryByBeneId = () => {
  const { beneficiaryData, enteredMobile, enteredBeneId } = usePage().props;
  const { data, setData, post, processing } = useForm({ mobile: "", beneid: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.beneficiary.fetchByBeneId"), {
      onSuccess: () => setSubmitted(true),
    });
  
  };
  useEffect(()=>{
    if(submitted && beneficiaryData.success){
      console.log(beneficiaryData.data)
    }
    else{
      console.log("Data not fetched")
    }
  },[])

  return (

    <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Fetch Beneficiary by BeneID
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        {['mobile', 'beneid'].map((key) => (
          <div key={key} className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              {key === 'mobile' ? (
                <Phone size={24} className="text-blue-500 animate-bounce" />
              ) : (
                <BadgeCheck size={24} className="text-gray-500 animate-bounce" />
              )}
            </span>
            <input
              type="text"
              name={key}
              placeholder={key.toUpperCase()}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </form>
    
      {error && (
        <div className="mt-4">
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md text-center">
            {error}
          </div>
        </div>
      )}
    
      {saveStatus && (
        <div className="mt-4">
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center">
            {saveStatus}
          </div>
        </div>
      )}
    
      {response?.data && response.data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-4 text-green-light">Beneficiary Details:</h3>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(response.data[0]).map((key) => (
                    <th key={key} className="border p-2">{key.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx} className="border p-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default FetchBeneficiaryByBeneId;
