import { useState,useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Phone, UserCheck } from 'lucide-react';

export default function DeleteBeneficiary() {
    const { data, setData, post, processing, errors } = useForm({
        mobile: "",
        bene_id: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true); // Open modal before deletion
    };

    const confirmDelete = () => {
        post(route("beneficiary1.deleteBeneficiary"), {
            onSuccess: (response) => {
                setMessage(response.props.flash.success.message);
                setModalOpen(false);
            },
        });
    };
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideRight {
            0% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(5px) translateY(-50%); }
            100% { transform: translateX(0) translateY(-50%); }
          }
    
          .animate-slide-right {
            animation: slideRight 0.5s ease-in-out;
          }
        `;
        document.head.appendChild(style);
    
        // Cleanup on component unmount
        return () => {
          document.head.removeChild(style);
        };
      }, []);
    return (
    


      <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
          Delete Beneficiary
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {['mobile', 'bene_id'].map((key) => (
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
                value={data[key]}
                onChange={handleChange}
                className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                required
              />
              {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Delete Beneficiary'}
          </button>
        </form>
      
        {apiMessage && <CustomAlert type={apiSuccess ? 'success' : 'error'} message={apiMessage} />}
      
        <DeletionHistory data={deletionHistory} />
      
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="mb-4">Are you sure you want to delete this beneficiary? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      
     
    );
    
}
