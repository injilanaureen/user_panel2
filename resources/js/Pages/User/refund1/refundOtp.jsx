import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FileText, Info } from 'lucide-react';

const RefundOtp = ({ apiResponse }) => {
    
    const [referenceid, setReferenceid] = useState('');
    const [ackno, setAckno] = useState('');
    const [response, setResponse] = useState(apiResponse || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post('/processrefundOTP', { referenceid, ackno }, {
            preserveState: true,
            onSuccess: (page) => {
                if (page.props.apiResponse) {
                    setResponse(page.props.apiResponse);
                    console.log(page.props.apiResponse);
                } else {
                    console.error('No response received from server');
                    alert('No response received from the API');
                }
            },
            
           
        });
    };

    return (

        <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
            Resend Refund OTP
          </h2>
          <p className="mt-4 text-blue-500 font-semibold md:max-w-prose mx-auto">
            Note: Please use "referenceid": "11005537190", "ackno": "1739577510" as suggested by Paysprint in UAT as of now.
          </p>
        
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {['referenceid', 'ackno'].map((key) => (
              <div key={key} className="relative flex items-center group">
                <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                  {key === 'referenceid' ? (
                    <FileText size={24} className="text-indigo-500 animate-bounce" />
                  ) : (
                    <Info size={24} className="text-red-500 animate-bounce" />
                  )}
                </span>
                <input
                  type="text"
                  name={key}
                  placeholder={key.toUpperCase()}
                  value={key === 'referenceid' ? referenceid : ackno}
                  onChange={(e) => (key === 'referenceid' ? setReferenceid(e.target.value) : setAckno(e.target.value))}
                  className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
            >
              Send OTP
            </button>
          </form>
        
          {response && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4 text-green-light">API Response:</h3>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
                  <thead>
                    <tr className="bg-gray-200">
                      {Object.keys(response).map((key) => (
                        <th key={key} className="border p-2">{key.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(response).map((value, index) => (
                        <td key={index} className="border p-2">{String(value)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    );
};

export default RefundOtp;
