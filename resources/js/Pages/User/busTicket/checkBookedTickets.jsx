import React, { useState } from "react";
import axios from "axios";
import {FileText} from "lucide-react"

const CheckBookedTicket = () => {
  const [ticketData, setTicketData] = useState(null);
  const [refid, setRefid] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/admin/busTicket/fetchBookedTickets", {
        refid: refid,
      });
      setTicketData(response.data.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full">
    <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
      Booked Ticket Details
    </h1>
    
    <form onSubmit={fetchData} className="grid grid-cols-1 gap-4 w-full">
      <div className="relative flex items-center group">
        <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
          <FileText size={24} className="text-indigo-500 animate-bounce" />
        </span>
        <input
          type="text"
          value={refid}
          onChange={(e) => setRefid(e.target.value)}
          className="border p-2 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
          placeholder="REFERENCE ID"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300 w-full md:w-auto"
      >
        {loading ? "Searching..." : "Search Ticket"}
      </button>
    </form>
  
    {ticketData && (
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="border-collapse border border-gray-400 mt-6 w-full min-w-[300px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Source</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Bus Type</th>
                <th className="border p-2">Travel Date</th>
                <th className="border p-2">Pickup</th>
                <th className="border p-2">Drop</th>
                <th className="border p-2">Passenger Name</th>
                <th className="border p-2">PNR</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border p-2">{ticketData.sourceCity}</td>
                <td className="border p-2">{ticketData.destinationCity}</td>
                <td className="border p-2">{ticketData.busType}</td>
                <td className="border p-2">{ticketData.doj}</td>
                <td className="border p-2">{ticketData.pickupLocation} ({ticketData.pickupTime})</td>
                <td className="border p-2">{ticketData.dropLocation} ({ticketData.dropTime})</td>
                <td className="border p-2">{ticketData.inventoryItems.passenger.name}</td>
                <td className="border p-2">{ticketData.pnr}</td>
                <td className="border p-2">{ticketData.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
  );
};

export default CheckBookedTicket;
