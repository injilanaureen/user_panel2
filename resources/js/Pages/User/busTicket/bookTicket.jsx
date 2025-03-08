import React, { useState } from "react";
import axios from "axios";
import { FileText, Ticket, DollarSign, Phone, Mail, Calendar,Key } from "lucide-react";
import { motion } from "framer-motion";

const BookTicket = () => {
  const [formData, setFormData] = useState({
    refid: 3,
    amount: 6,
    base_fare: "5.50",
    blockKey: "150",
    passenger_phone: "9876543210",
    passenger_email: "example@email.com",
  });

  const [response, setResponse] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/busTicket/bookticket", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setResponse(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error(
        "Error booking ticket:",
        error.response ? error.response.data : error.message
      );
    }
  };  const fieldIcons = {
    refid: <Ticket className="w-5 h-5 text-[#497D74]" />, 
    amount: <DollarSign className="w-5 h-5 text-[#497D74]" />, 
    base_fare: <DollarSign className="w-5 h-5 text-[#497D74]" />, 
    blockKey: <Key className="w-5 h-5 text-[#497D74]" />, 
    passenger_phone: <Phone className="w-5 h-5 text-[#497D74]" />, 
    passenger_email: <Mail className="w-5 h-5 text-[#497D74]" />, 
  };

  return (
  
  
    <div className="p-4 max-w-full mx-auto rounded-xl shadow-lg w-full bg-gradient-to-r from-gray-100 to-gray-400 border border-[#497D74]">
    <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center flex items-center gap-2">
      <Ticket className="text-white w-6 h-6" /> Book Ticket
    </h1>
    
    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-2">
    {Object.keys(formData).map((key) => (
      <div key={key} className="relative flex items-center group">
        <span className="absolute left-3 text-[#497D74] transition-transform  ease-in-out group-hover:scale-110 animate-bounce">
          {fieldIcons[key] || <FileText className="w-5 h-5 animate-bounce" />}
        </span>
        <input
          type="text"
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="w-full p-3 pl-10 border-2 border-[#497D74] rounded-lg focus:ring-4 focus:ring-[#1A759F] focus:outline-none shadow-inner bg-white text-gray-800"
          placeholder={key.replace("_", " ")}
        />
      </div>
    ))}
    
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#497D74] text-white px-8 py-3 rounded-lg hover:bg-opacity-80 shadow-lg transform transition-all w-full"
    >
      Book Ticket
    </motion.button>
  </form>
    
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-black flex items-center gap-2">
        <Calendar className="w-5 h-5 text-black" /> Booking History
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Ref ID</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Base Fare</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {response.map((ticket, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-[#497D74]" /> {ticket.refid}
                </td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#497D74]" /> {ticket.amount}
                </td>
                <td className="px-4 py-2 border">{ticket.base_fare}</td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#497D74]" /> {ticket.passenger_phone}
                </td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#497D74]" /> {ticket.passenger_email}
                </td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded ${ticket.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {ticket.status ? "Success" : "Failed"}
                  </span>
                </td>
                <td className="px-4 py-2 border">{ticket.message}</td>
                <td className="px-4 py-2 border">
                  {new Date(ticket.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
      );
    };
    
export default BookTicket;
