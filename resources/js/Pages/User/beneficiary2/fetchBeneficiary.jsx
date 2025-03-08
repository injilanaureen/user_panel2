import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Phone } from 'lucide-react';


const FetchBeneficiary = () => {
  const { beneficiaryData, mobile } = usePage().props;
  const [mobileNumber, setMobileNumber] = useState(mobile || '');

  // Handle form submission to fetch beneficiary details
  const handleSubmit = (e) => {
    e.preventDefault();
    router.get('/admin/beneficiary2/fetch', { mobile: mobileNumber });
  };

  return (


<div className="p-4 max-w-full rounded-xl shadow-lg w-full" style={{ backgroundColor: '#2a5e55' }}>
  <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
    Fetch Beneficiary
  </h1>
  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
    {['mobile'].map((key) => (
      <div key={key} className="relative flex items-center group">
        <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
          <Phone size={24} className="text-blue-500 animate-bounce" />
        </span>
        <input
          type="text"
          name={key}
          placeholder={key.toUpperCase()}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
          required
        />
      </div>
    ))}
    <button
      type="submit"
      className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300"
    >
      Fetch Beneficiary
    </button>
  </form>

  {beneficiaryData.length > 0 ? (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4 text-green-light">Beneficiary Data</h3>
      <table className="border-collapse border border-gray-400 mt-6 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">BENEFICIARY ID</th>
            <th className="border p-2">BANK ID</th>
            <th className="border p-2">BANK NAME</th>
            <th className="border p-2">NAME</th>
            <th className="border p-2">ACCOUNT NUMBER</th>
            <th className="border p-2">IFSC</th>
            <th className="border p-2">VERIFIED</th>
            <th className="border p-2">BANK TYPE</th>
            <th className="border p-2">PAYTM SUPPORTED</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaryData.map((beneficiary) => (
            <tr key={beneficiary.bene_id} className="hover:bg-gray-100">
              <td className="border p-2">{beneficiary.bene_id || 'N/A'}</td>
              <td className="border p-2">{beneficiary.bankid || 'N/A'}</td>
              <td className="border p-2">{beneficiary.bankname || 'N/A'}</td>
              <td className="border p-2">{beneficiary.name || 'N/A'}</td>
              <td className="border p-2">{beneficiary.accno || 'N/A'}</td>
              <td className="border p-2">{beneficiary.ifsc || 'N/A'}</td>
              <td className="border p-2">{beneficiary.verified ? 'Yes' : 'No'}</td>
              <td className="border p-2">{beneficiary.banktype || 'N/A'}</td>
              <td className="border p-2">{beneficiary.paytm ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="mt-4">
      <p className="text-red-500 mt-4 text-center">No beneficiaries found in the database.</p>
    </div>
  )}
</div>
  );
};

export default FetchBeneficiary;
