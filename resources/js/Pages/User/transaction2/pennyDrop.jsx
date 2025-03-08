import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Phone, CreditCard, Banknote, User, FileText, MapPin, Landmark, Calendar, FileCheck2, UserCheck } from 'lucide-react';

const PennyDrop = ({ apiResponse }) => {
  const { data, setData, post, processing } = useForm({
    mobile: '',
    accno: '',
    bankid: '',
    benename: '',
    referenceid: '',
    pincode: '',
    address: '',
    dob: '',
    gst_state: '',
    bene_id: '',
  });

  const [responseData, setResponseData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('transaction2.pennyDrop'), {
      onSuccess: (response) => {
        setResponseData(response.props.apiResponse);
      },
    });
  };

  return (
   

<div className="p-4 max-w-full">
  <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
    Penny Drop Form
  </h1>

  <div className="bg-white p-6 rounded-lg shadow-lg ">
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {[
        { name: 'mobile', label: 'Mobile Number', type: 'text', placeholder: 'Enter mobile number' },
        { name: 'accno', label: 'Account Number', type: 'text', placeholder: 'Enter account number' },
        { name: 'bankid', label: 'Bank ID', type: 'number', placeholder: 'Enter bank ID' },
        { name: 'benename', label: 'Beneficiary Name', type: 'text', placeholder: 'Enter beneficiary name' },
        { name: 'referenceid', label: 'Reference ID', type: 'text', placeholder: 'Enter reference ID' },
        { name: 'pincode', label: 'Pincode', type: 'text', placeholder: 'Enter pincode' },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter address' },
        { name: 'dob', label: 'Date of Birth', type: 'text', placeholder: 'dd-mm-yyyy' },
        { name: 'gst_state', label: 'GST State Code', type: 'text', placeholder: 'e.g., 07' },
        { name: 'bene_id', label: 'Beneficiary ID', type: 'number', placeholder: 'Enter beneficiary ID' },
      ].map((field) => (
        <div key={field.name} className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            {field.name === 'mobile' ? (
              <Phone size={24} className="text-blue-500 animate-bounce" />
            ) : field.name === 'accno' ? (
              <CreditCard size={24} className="text-purple-500 animate-bounce" />
            ) : field.name === 'bankid' ? (
              <Banknote size={24} className="text-orange-500 animate-bounce" />
            ) : field.name === 'benename' ? (
              <User size={24} className="text-green-500 animate-bounce" />
            ) : field.name === 'referenceid' ? (
              <FileText size={24} className="text-indigo-500 animate-bounce" />
            ) : field.name === 'pincode' ? (
              <MapPin size={24} className="text-yellow-500 animate-bounce" />
            ) : field.name === 'address' ? (
              <Landmark size={24} className="text-teal-500 animate-bounce" />
            ) : field.name === 'dob' ? (
              <Calendar size={24} className="text-red-500 animate-bounce" />
            ) : field.name === 'gst_state' ? (
              <FileCheck2 size={24} className="text-pink-500 animate-bounce" />
            ) : field.name === 'bene_id' ? (
              <UserCheck size={24} className="text-gray-500 animate-bounce" />
            ) : (
              <Phone size={24} className="text-blue-500 animate-bounce" />
            )}
          </span>
          <div className="w-full">
            <label className="block font-semibold text-primary_color mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={data[field.name]}
              onChange={(e) => setData(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        </div>
      ))}

      <div className="md:col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300 w-full"
          disabled={processing}
        >
          {processing ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  </div>

  {responseData && (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4 text-green-light">API Response:</h2>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Field</th>
            <th className="border p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(responseData).map(([key, value]) => (
            <tr key={key}>
              <td className="border p-2 font-medium capitalize">{key.replace('_', ' ')}</td>
              <td className="border p-2">{value?.toString() || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  );
};

export default PennyDrop;
