import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Phone, User, CreditCard, Landmark } from 'lucide-react';

const RegisterBeneficiary = ({ beneficiaries = [] }) => {
  const { data, setData, post, processing, reset } = useForm({
    mobile: '',
    benename: '',
    bankid: '',
    accno: '',
    ifsccode: '',
    verified: '0',
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/beneficiary/register', {
      onSuccess: (page) => {
        setResponse(page.props.response);
        setError(null);
        reset();
      },
      onError: () => setError('Failed to register beneficiary.'),
    });
  };

  return (

    <div className="p-4 max-w-full rounded-xl shadow-lg " >
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Register Beneficiary
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {['mobile', 'benename', 'bankid', 'accno', 'ifsccode'].map((key) => (
          <div key={key} className="relative flex items-center group">
            <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
              {key === 'mobile' ? (
                <Phone size={24} className="text-blue-500 animate-bounce" />
              ) : key === 'benename' ? (
                <User size={24} className="text-green-500 animate-bounce" />
              ) : key === 'bankid' ? (
                <CreditCard size={24} className="text-purple-500 animate-bounce" />
              ) : key === 'accno' ? (
                <Landmark size={24} className="text-teal-500 animate-bounce" />
              ) : (
                <Landmark size={24} className="text-teal-500 animate-bounce" />
              )}
            </span>
            <input
              type="text"
              name={key}
              placeholder={key.replace('benename', 'BENEFICIARY NAME').toUpperCase()}
              value={data[key]}
              onChange={(e) => setData(key, e.target.value)}
              className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300"
          disabled={processing}
        >
          {processing ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    
      {error && (
        <div className="mt-4">
          <p className="text-red-500 mt-4 text-center">{error}</p>
        </div>
      )}
    
      {beneficiaries.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-4 text-green-light">Registered Beneficiaries</h3>
          <table className="border-collapse border border-gray-400 mt-6 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">BENEFICIARY ID</th>
                <th className="border p-2">NAME</th>
                <th className="border p-2">BANK NAME</th>
                <th className="border p-2">ACCOUNT NO</th>
                <th className="border p-2">IFSC</th>
                <th className="border p-2">VERIFIED</th>
                <th className="border p-2">STATUS</th>
                <th className="border p-2">MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((item) => (
                <tr key={item.id} className="text-center border-t">
                  <td className="border p-2">{item.bene_id}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.bankname}</td>
                  <td className="border p-2">{item.accno}</td>
                  <td className="border p-2">{item.ifsc}</td>
                  <td className="border p-2">{item.verified ? 'Yes' : 'No'}</td>
                  <td className="border p-2">{item.status === '1' ? 'Active' : 'Inactive'}</td>
                  <td className="border p-2">{item.message || 'N/A'}</td>
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
