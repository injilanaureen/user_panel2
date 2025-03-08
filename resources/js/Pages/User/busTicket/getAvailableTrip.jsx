import React, { useState } from "react";
import { Loader2, BusFront, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const AvailableTrips = () => {
  const [formData, setFormData] = useState({
    source_id: "",
    destination_id: "",
    date_of_journey: "",
  });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    busType: "",
    availability: "",
    fareRange: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrips([]);

    try {
      const response = await fetch("/admin/busTicket/fetchAvailableTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setTrips(data.data.availableTrips);
    } catch (err) {
      setError(err.message || "Failed to fetch trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTrips = () => {
    if (!trips) return [];

    return trips.filter((trip) => {
      const matchBusType = !filters.busType || trip.busType === filters.busType;

      const seats = parseInt(trip.availableSeats);
      const matchAvailability = !filters.availability || (
        (filters.availability === "1-5" && seats <= 5) ||
        (filters.availability === "6-10" && seats > 5 && seats <= 10) ||
        (filters.availability === "11-20" && seats > 10 && seats <= 20) ||
        (filters.availability === "21+" && seats > 20)
      );

      const fare = parseFloat(trip.fares);
      const matchFare = !filters.fareRange || (
        (filters.fareRange === "low" && fare <= 50) ||
        (filters.fareRange === "medium" && fare > 50 && fare <= 200) ||
        (filters.fareRange === "high" && fare > 200)
      );

      return matchBusType && matchAvailability && matchFare;
    });
  };

  return (
<div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
    Find Your Bus 🚌
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <MapPin size={24} className="text-blue-500 animate-bounce" />
      </span>
      <input
        type="number"
        name="source_id"
        placeholder="SOURCE ID"
        value={formData.source_id}
        onChange={handleInputChange}
        className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
        required
      />
    </div>

    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <MapPin size={24} className="text-green-500 animate-bounce" />
      </span>
      <input
        type="number"
        name="destination_id"
        placeholder="DESTINATION ID"
        value={formData.destination_id}
        onChange={handleInputChange}
        className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
        required
      />
    </div>

    <div className="relative flex items-center group">
      <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
        <Calendar size={24} className="text-yellow-500 animate-bounce" />
      </span>
      <input
        type="date"
        name="date_of_journey"
        value={formData.date_of_journey}
        onChange={handleInputChange}
        className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
        required
        min={new Date().toISOString().split("T")[0]}
      />
    </div>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto flex items-center justify-center"
    >
      {loading ? <Loader2 size={24} className="animate-spin mr-2" /> : "Search Trips"}
    </motion.button>
  </form>

  {error && <p className="text-red-600 text-center mt-4">{error}</p>}

  {trips.length > 0 && !loading && (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4 text-green-light">Available Trips</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Bus Type</th>
              <th className="border p-2">Available Seats</th>
              <th className="border p-2">Fare</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTrips().map((trip) => (
              <motion.tr 
                key={trip.id} 
                whileHover={{ scale: 1.02 }}
                className="hover:bg-gray-100"
              >
                <td className="border p-2 flex items-center">
                  <BusFront size={24} className="text-blue-500 mr-2" />
                  {trip.busType}
                </td>
                <td className="border p-2 flex items-center">
                  <Users size={24} className="text-gray-500 mr-2" />
                  {trip.availableSeats} Seats
                </td>
                <td className="border p-2 flex items-center">
                  <DollarSign size={24} className="text-green-500 mr-2" />
                  ₹{trip.fares}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
  );
};

export default AvailableTrips;
