import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, Calendar, Loader2, AlertCircle, Info } from 'lucide-react'; // or your icon library


const GetCurrentTripDetails = () => {
  const [tripId, setTripId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  };

  const transformApiResponse = (apiData) => {
    const boardingPoints = apiData.boardingTimes?.map(bp => ({
      id: bp.bpId,
      name: bp.bpName,
      address: bp.address,
      city: bp.city,
      contactNumber: bp.contactNumber,
      landmark: bp.landmark,
      time: parseInt(bp.time),
      isPrime: bp.prime === 'true'
    })).sort((a, b) => a.time - b.time) || [];

    const primaryBoardingPoint = boardingPoints.find(bp => bp.isPrime) || boardingPoints[0];

    const passengers = apiData.passengers?.map(passenger => ({
      name: passenger.name,
      age: passenger.age,
      gender: passenger.gender,
      seatNumber: passenger.seatNumber,
      fare: passenger.fare,
      status: passenger.status,
      idType: passenger.idType,
      idNumber: passenger.idNumber
    })) || [];

    return {
      pnrNumber: apiData.pnrNumber,
      bookingId: apiData.bookingId,
      travelDate: apiData.travelDate,
      status: apiData.status,
      operatorName: apiData.operatorName,
      busType: apiData.busType,
      source: apiData.source,
      destination: apiData.destination,
      departureTime: primaryBoardingPoint?.time,
      boardingTime: primaryBoardingPoint?.time,
      boardingPoint: primaryBoardingPoint?.name,
      duration: apiData.duration,
      totalFare: apiData.totalFare,
      boardingPoints: boardingPoints,
      passengers: passengers,
      additionalInfo: apiData.additionalInfo,
      cancellationPolicy: apiData.cancellationPolicy,
      partialCancellationAllowed: apiData.partialCancellationAllowed,
      operatorContact: apiData.operatorContact,
      operatorAddress: apiData.operatorAddress
    };
  };

  const saveTripDetails = async (transformedData) => {
    try {
      const boardingPointsData = transformedData.boardingPoints.map(point => ({
        location: point.name,
        address: point.address,
        city: point.city,
        time: point.time,
        landmark: point.landmark || null,
        contact: point.contactNumber || null
      }));

      const response = await fetch('/admin/busTicket/storeTripDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify({
          trip_id: tripId,
          boarding_points: boardingPointsData
        })
      });

      const result = await response.json();
      
      if (!result.status) {
        throw new Error(result.message || 'Failed to save trip details');
      }

      setSaveStatus({ type: 'success', message: 'Trip details saved successfully' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: error.message || 'Failed to save trip details' });
    }
  };

  const getCurrentTripDetails = async () => {
    if (!tripId) {
      setError('Please enter a Trip ID.');
      return;
    }

    setLoading(true);
    setError(null);
    setTripDetails(null);
    setSaveStatus(null);

    try {
      // Updated endpoint to match the new route
      const response = await fetch('/admin/busTicket/fetchTripDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify({
          trip_id: tripId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message || 'Failed to fetch trip details');
      }

      const transformedData = transformApiResponse(data.data);
      setTripDetails(transformedData);
      
      // Save the trip details after successful fetch
      await saveTripDetails(transformedData);
    } catch (error) {
      setError(error.message || 'Failed to load trip details');
    }

    setLoading(false);
};

  const formatTime = (time) => {
    if (!time) return 'N/A';
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
   
<div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
  {/* Trip ID Input */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4"
  >
    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center flex items-center justify-center gap-3">
      <Bus size={24} /> Enter Trip ID
    </h2>
    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <Bus size={24} className="text-indigo-500 animate-bounce" />
      </span>
      <input
        type="text"
        className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
        placeholder="TRIP ID"
        value={tripId}
        onChange={(e) => setTripId(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-primary_color text-white p-2 ml-4 mt-4 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300"
        onClick={getCurrentTripDetails}
      >
        Fetch Details
      </motion.button>
    </div>
  </motion.div>

  {loading && (
    <div className="flex items-center justify-center mt-4">
      <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
    </div>
  )}

  {error && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 mt-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
    >
      <AlertCircle className="text-red-600" />
      <p className="text-red-600">{error}</p>
    </motion.div>
  )}

  {saveStatus && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 mt-4 border rounded-lg flex items-center gap-2 ${
        saveStatus.type === "success"
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <Info className={saveStatus.type === "success" ? "text-green-600" : "text-red-600"} />
      <p className={saveStatus.type === "success" ? "text-green-600" : "text-red-600"}>{saveStatus.message}</p>
    </motion.div>
  )}

  {tripDetails && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      <h2 className="text-xl font-bold mb-4 text-green-500">Current Trip Details</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-400 w-full min-w-[300px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">PNR</th>
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Operator</th>
              <th className="border p-2">Bus Type</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border p-2 flex items-center">
                <Calendar size={24} className="text-blue-500 mr-2" />
                {tripDetails.pnrNumber}
              </td>
              <td className="border p-2">{tripDetails.bookingId}</td>
              <td className="border p-2">{tripDetails.operatorName}</td>
              <td className="border p-2 flex items-center">
                <Bus size={24} className="text-gray-500 mr-2" />
                {tripDetails.busType}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  )}
</div>
 
  );
};

export default GetCurrentTripDetails;