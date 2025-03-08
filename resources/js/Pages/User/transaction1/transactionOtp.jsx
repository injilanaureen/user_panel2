import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { 
  Phone, CreditCard, Banknote, User, Tag, MapPin, Home, Calendar, 
  Building, Badge, IndianRupee, Globe
} from "lucide-react";
const TransactionOTP = () => {
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
      post(route("register.processtransaction1OTP"));

    } catch (error) {
        console.error("Error processing transaction", error);
    }
  };

  return (
      <div className="p-4">
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary_color via-purple-500 to-pink-500 text-white p-3 rounded-lg shadow-lg text-center">
  Transaction Send OTP
</h1>

<form onSubmit={handleSubmit} className="mt-4 space-y-3 max-w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Mobile */}
    <div className="relative">
      <label className="block font-semibold">Mobile</label>
      <div className="relative">
        <Phone className="absolute left-2 top-3 text-blue-600  animate-bounce" size={20} />
        <input type="text" name="mobile" value={data.mobile} onChange={handleChange} placeholder="9999999999" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
    </div>

    {/* Reference ID */}
    <div className="relative">
      <label className="block font-semibold">Reference ID</label>
      <div className="relative">
        <Tag className="absolute left-2 top-3 text-purple-600  animate-bounce" size={20} />
        <input type="text" name="referenceid" value={data.referenceid} onChange={handleChange} placeholder="12345677" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.referenceid && <p className="text-red-500">{errors.referenceid}</p>}
    </div>

    {/* Beneficiary Name */}
    <div className="relative">
      <label className="block font-semibold">Beneficiary Name</label>
      <div className="relative">
        <User className="absolute left-2 top-3 text-green-600  animate-bounce" size={20} />
        <input type="text" name="benename" value={data.benename} onChange={handleChange} placeholder="John Doe" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.benename && <p className="text-red-500">{errors.benename}</p>}
    </div>

    {/* Amount */}
    <div className="relative">
      <label className="block font-semibold">Amount</label>
      <div className="relative">
        <IndianRupee className="absolute left-2 top-3 text-yellow-600  animate-bounce" size={20} />
        <input type="text" name="amount" value={data.amount} onChange={handleChange} placeholder="Enter amount" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.amount && <p className="text-red-500">{errors.amount}</p>}
    </div>

    {/* Pincode */}
    <div className="relative">
      <label className="block font-semibold">Pincode</label>
      <div className="relative">
        <MapPin className="absolute left-2 top-3 text-red-600  animate-bounce" size={20} />
        <input type="text" name="pincode" value={data.pincode} onChange={handleChange} placeholder="Enter pincode" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
    </div>

    {/* Address */}
    <div className="relative">
      <label className="block font-semibold">Address</label>
      <div className="relative">
        <Home className="absolute left-2 top-3 text-indigo-600  animate-bounce" size={20} />
        <input type="text" name="address" value={data.address} onChange={handleChange} placeholder="Enter address" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.address && <p className="text-red-500">{errors.address}</p>}
    </div>

    {/* Date of Birth */}
    <div className="relative">
      <label className="block font-semibold">Date of Birth</label>
      <div className="relative">
        <Calendar className="absolute left-2 top-3 text-blue-700  animate-bounce" size={20} />
        <input type="date" name="dob" value={data.dob} onChange={handleChange} 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.dob && <p className="text-red-500">{errors.dob}</p>}
    </div>

    {/* GST State */}
    <div className="relative">
      <label className="block font-semibold">GST State</label>
      <div className="relative">
        <Building className="absolute left-2 top-3 text-teal-600  animate-bounce" size={20} />
        <input type="text" name="gst_state" value={data.gst_state} onChange={handleChange} placeholder="Enter GST state" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.gst_state && <p className="text-red-500">{errors.gst_state}</p>}
    </div>

    {/* Latitude */}
    <div className="relative">
      <label className="block font-semibold">Latitude</label>
      <div className="relative">
        <Globe className="absolute left-2 top-3 text-pink-700  animate-bounce" size={20} />
        <input type="text" name="lat" value={data.lat} onChange={handleChange} placeholder="Latitude" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.lat && <p className="text-red-500">{errors.lat}</p>}
    </div>

    {/* Longitude */}
    <div className="relative">
      <label className="block font-semibold">Longitude</label>
      <div className="relative">
        <Globe className="absolute left-2 top-3 text-orange-700  animate-bounce" size={20} />
        <input type="text" name="long" value={data.long} onChange={handleChange} placeholder="Longitude" 
          className="border p-2 pl-8 w-full rounded" />
      </div>
      {errors.long && <p className="text-red-500">{errors.long}</p>}
    </div>

  </div>

  <div className="mt-6">
    <button type="submit" className="bg-primary_color text-white px-4 py-2 rounded hover:bg-secondary_color transition duration-300" disabled={processing}>
      {processing ? "Processing..." : "Submit Transaction"}
    </button>
  </div>
</form>
      </div>
  );
};

export default TransactionOTP;