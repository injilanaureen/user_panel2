import React, { useState } from 'react';
import { MapPin, Phone, Landmark, Hash, Map, User, Building } from 'lucide-react';
import { motion } from "framer-motion";



const BoardingPoint = () => {
  const [bpId, setBpId] = useState('');
  const [tripId, setTripId] = useState('');
  const [boardingPoint, setBoardingPoint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseInfo, setResponseInfo] = useState(null);

  const fetchBoardingPoint = async () => {
    setLoading(true);
    setError(null);
    setBoardingPoint(null);
    setResponseInfo(null);

    try {
      const response = await axios.post('/admin/busTicket/fetchboardingpointdetails', {
        bpId: parseInt(bpId, 10),
        trip_id: parseInt(tripId, 10),
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('API Response:', data);

      setResponseInfo({
        status: data?.status ?? false,
        responseCode: data?.response_code ?? 'No response code',
        errorMsg: typeof data?.data === 'string' ? data.data : 'No specific error',
      });

      if (data.status && data.response_code === 1 && typeof data.data === 'object') {
        setBoardingPoint(data.data);
      } else {
        throw new Error(
          `Error: ${typeof data.data === 'string' ? data.data : 'Unknown error'}`
        );
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to fetch boarding point');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bpId && tripId) {
      fetchBoardingPoint();
    } else {
      setError('Both BP ID and Trip ID are required');
    }
  };
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5 }} 
    className="max-w-full mt-6 text-gray-200 rounded-lg shadow-xl "
  >
    <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
      Boarding Point Details
    </h1>
  
    <motion.form 
      onSubmit={handleSubmit} 
      className="mb-4  grid grid-cols-2 gap-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.3 }}
    >
      {/* BP ID */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
          <Hash className="w-5 h-5 text-red-500 animate-bounce" />
        </span>
        <input
          type="number"
          value={bpId}
          onChange={(e) => setBpId(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-gray-100 border border-gray-500 rounded-md text-gray-800 focus:outline-none focus:ring-gray-300 focus:border-gray-300 transition-all"
          placeholder="BP ID"
          required
        />
      </div>
  
      {/* Trip ID */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
          <Map className="w-5 h-5 text-yellow-500 animate-bounce" />
        </span>
        <input
          type="number"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-gray-100 border border-gray-500 rounded-md text-gray-800 focus:outline-none focus:ring-gray-300 focus:border-gray-300 transition-all"
          placeholder="Trip ID"
          required
        />
      </div>
  
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.95 }}
        className={`w-full px-4 py-2 text-white rounded transition-all shadow-md border border-gray-500 ${
          loading ? "bg-gray-500" : "bg-[#356A5A] hover:bg-[#2B5A4D]"
        }`}
      >
        {loading ? "Loading..." : "Fetch Boarding Point"}
      </motion.button>
    </motion.form>
  
    {/* Boarding Point Details */}
    {boardingPoint && (
      <motion.div 
        className="mt-6 p-4 bg-gray-800 text-gray-200 rounded-lg space-y-4 shadow-md border border-gray-600"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-gray-100 underline decoration-gray-400">{boardingPoint.name}</h2>
        <p><Hash className="inline-block w-5 h-5 text-gray-100" /> <strong>ID:</strong> {boardingPoint.id}</p>
        <p><Map className="inline-block w-5 h-5 text-gray-100" /> <strong>Location:</strong> {boardingPoint.locationName}</p>
        <p><MapPin className="inline-block w-5 h-5 text-gray-100" /> <strong>Address:</strong> {boardingPoint.address}</p>
        <p><Phone className="inline-block w-5 h-5 text-gray-100" /> <strong>Contact:</strong> {boardingPoint.contactnumber}</p>
        <p><Landmark className="inline-block w-5 h-5 text-gray-100" /> <strong>Landmark:</strong> {boardingPoint.landmark}</p>
        <p><User className="inline-block w-5 h-5 text-gray-100" /> <strong>Name:</strong> {boardingPoint.name}</p>
        <p><Building className="inline-block w-5 h-5 text-gray-100" /> <strong>RB Master ID:</strong> {boardingPoint.rbMasterId}</p>
      </motion.div>
    )}
  </motion.div>
  
  );

};

export default BoardingPoint;