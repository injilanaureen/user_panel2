import { useState } from "react";
import axios from "axios";

import {
    User,
    CreditCard,
    Banknote,
    Info,
    Phone,
    Landmark,
    Calendar,
    MapPin,
    FileText,
    FileCheck2,
    BadgeCheck 
} from "lucide-react";


export default function PennyDropForm() {
    const [formData, setFormData] = useState({
        mobile: "",
        accno: "",
        bankid: "",
        benename: "",
        referenceid: "",
        pincode: "",
        address: "",
        dob: "",
        gst_state: "",
        bene_id: ""
    });
    
    const [responseData, setResponseData] = useState(null);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/penny-drop", formData);
            setResponseData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error processing transaction", error);
        }
    };
    
    return (


      <div className="p-4 max-w-full">
<h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-900 via-green-500 to-pink-300 text-white p-3 rounded-lg shadow-lg text-center">
    Penny Drop Verification
</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
            <div key={key} className="relative flex items-center ">
                <span className="absolute left-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                    {key === "mobile" ? (
                        <Phone size={24} className="text-blue-500 animate-bounce" />
                    ) : key === "accno" ? (
                        <CreditCard size={24} className="text-purple-500 animate-bounce" />
                    ) : key === "bankid" ? (
                        <Banknote size={24} className="text-orange-500 animate-bounce" />
                    ) : key === "benename" ? (
                        <User size={24} className="text-green-500 animate-bounce" />
                    ) : key === "referenceid" ? (
                        <FileText size={24} className="text-indigo-500 animate-bounce" />
                    ) : key === "pincode" ? (
                        <MapPin size={24} className="text-yellow-500 animate-bounce" />
                    ) : key === "address" ? (
                        <Landmark size={24} className="text-teal-500 animate-bounce" />
                    ) : key === "dob" ? (
                        <Calendar size={24} className="text-red-500 animate-bounce" />
                    ) : key === "gst_state" ? (
                        <FileCheck2 size={24} className="text-pink-500 animate-bounce" />
                    ) : key === "bene_id" ? (
                        <BadgeCheck size={24} className="text-gray-500 animate-bounce" />
                    ) : (
                        <Info size={20} className="text-red-500 animate-bounce" />
                    )}
                </span>
                <input
                    type="text"
                    name={key}
                    placeholder={key.replace("_", " ").toUpperCase()}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border p-3 pl-8 mt-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
                />
            </div>
        ))}
        <button type="submit" className=" bg-primary_color text-white p-2 rounded font-bold hover:bg-secondary_color hover:scale-105 transition duration-300">
            Submit
        </button>
    </form>

    {responseData && (
        <div className="mt-4">
            <h3 className="text-cl font-bold">Transaction Response</h3>
            <table className="border-collapse border border-gray-400 mt-6 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        {Object.keys(responseData).map((key) => (
                            <th key={key} className="border p-2">{key.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.values(responseData).map((value, index) => (
                            <td key={index} className="border p-2">{value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )}
</div>
        
    );
}
