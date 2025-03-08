import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Phone, FileText, UserCheck, CreditCard, Calendar, MapPin, Landmark, FileCheck2, Map, Navigation, Key, FileText as FileTextIcon } from 'lucide-react';


const Transaction = () => {
  const { props } = usePage();
  const { success, error, transaction, formData, errors: serverErrors } = props;

  const { data, setData, post, processing, errors, reset } = useForm({
    mobile: formData?.mobile || "",
    referenceid: formData?.referenceid || "",
    bene_id: formData?.bene_id || "",
    txntype: formData?.txntype || "",
    dob: formData?.dob || "",
    amount: formData?.amount || "",
    pincode: formData?.pincode || "",
    address: formData?.address || "",
    gst_state: formData?.gst_state || "",
    lat: formData?.lat || "",
    long: formData?.long || "",
    otp: formData?.otp || "",
    stateresp: formData?.stateresp || "",
  });

  // Effect to display flash messages
  useEffect(() => {
    // You can implement a toast notification system here
    if (success) {
      console.log("Success:", success);
      // You could use a library like react-toastify here
      // toast.success(success);
    }
    
    if (error) {
      console.log("Error:", error);
      // toast.error(error);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      post(route("register.processtransaction1"));

    } catch (error) {
        console.error("Error processing transaction", error);
    }
  };

  return (

    <div className="p-4 max-w-full">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
        Transaction
      </h1>
    
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
    
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    
      {transaction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Reference ID</th>
                <th className="border p-2">Beneficiary</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">UTR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{transaction.referenceid}</td>
                <td className="border p-2">{transaction.benename}</td>
                <td className="border p-2">{transaction.txn_status === 1 ? "Success" : "Failed"}</td>
                <td className="border p-2">₹{transaction.txn_amount}</td>
                <td className="border p-2">{transaction.utr}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-4">
        {/* Basic Information */}
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Phone size={24} className="text-blue-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              placeholder="9999999999"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileText size={24} className="text-indigo-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Reference ID</label>
            <input
              type="text"
              name="referenceid"
              value={data.referenceid}
              onChange={handleChange}
              placeholder="12345677"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.referenceid && <p className="text-red-500">{errors.referenceid}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <UserCheck size={24} className="text-gray-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Beneficiary ID</label>
            <input
              type="text"
              name="bene_id"
              value={data.bene_id}
              onChange={handleChange}
              placeholder="1234"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.bene_id && <p className="text-red-500">{errors.bene_id}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-purple-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Transaction Type</label>
            <select
              name="txntype"
              value={data.txntype}
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            >
              <option value="">Select transaction type</option>
              <option value="IMPS">IMPS</option>
              <option value="NEFT">NEFT</option>
            </select>
            {errors.txntype && <p className="text-red-500">{errors.txntype}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Calendar size={24} className="text-red-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <CreditCard size={24} className="text-purple-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <MapPin size={24} className="text-yellow-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={data.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Landmark size={24} className="text-teal-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileCheck2 size={24} className="text-pink-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">GST State</label>
            <input
              type="text"
              name="gst_state"
              value={data.gst_state}
              onChange={handleChange}
              placeholder="Enter GST state"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.gst_state && <p className="text-red-500">{errors.gst_state}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Map size={24} className="text-orange-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Latitude</label>
            <input
              type="text"
              name="lat"
              value={data.lat}
              onChange={handleChange}
              placeholder="Latitude"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.lat && <p className="text-red-500">{errors.lat}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Navigation size={24} className="text-yellow-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">Longitude</label>
            <input
              type="text"
              name="long"
              value={data.long}
              onChange={handleChange}
              placeholder="Longitude"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.long && <p className="text-red-500">{errors.long}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <Key size={24} className="text-indigo-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">OTP</label>
            <input
              type="text"
              name="otp"
              value={data.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.otp && <p className="text-red-500">{errors.otp}</p>}
          </div>
        </div>
    
        <div className="relative flex items-center group">
          <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
            <FileTextIcon size={24} className="text-pink-500 animate-bounce" />
          </span>
          <div className="w-full">
            <label className="block font-semibold text-green-dark mb-1">State Response</label>
            <input
              type="text"
              name="stateresp"
              value={data.stateresp}
              onChange={handleChange}
              placeholder="Enter state response"
              className="border p-3 pl-8 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            />
            {errors.stateresp && <p className="text-red-500">{errors.stateresp}</p>}
          </div>
        </div>
    
        <div className="mt-6">
          <button
            type="submit"
            className="bg-[#497D74] text-white p-2 rounded font-bold hover:bg-[#296e62] hover:scale-105 transition duration-300"
            disabled={processing}
          >
            {processing ? "Processing..." : "Submit Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transaction;