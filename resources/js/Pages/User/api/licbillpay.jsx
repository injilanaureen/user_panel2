import React, { useState } from "react";
import axios from "axios";
import { CreditCard, Calendar, ClipboardList, Mail, Smartphone, FileText, DollarSign, CheckSquare, XSquare, Hash } from "lucide-react";


export default function LicBillPay() {
  const [formData, setFormData] = useState({
    canumber: "",
    mode: "online",
    amount: "",
    ad1: "",
    ad2: "",
    ad3: "",
    referenceid: "",
    latitude: "27.2232",
    longitude: "78.26535",
    bill_fetch: {
      billNumber: "",
      billAmount: "",
      billnetamount: "",
      billdate: "",
      acceptPayment: true,
      acceptPartPay: false,
      cellNumber: "",
      dueFrom: "11/05/2021",
      dueTo: "11/05/2021",
      validationId: "",
      billId: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("bill_fetch.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bill_fetch: { ...prev.bill_fetch, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // First API call to PaySprint
        const apiResponse = await axios.post(
            "https://sit.paysprint.in/service-api/api/v1/service/bill-payment/bill/paylicbill",
            formData,
            {
            
                    headers: {
                      Authorisedkey: "Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=",
                      Token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk5NTgwMjEsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5OTU4MDIxIn0.yAT45LjmoPr595zvgccFYVkfGD2GqDY_mEEDV6SvNtA",
                      Accept: "text/plain",
                      "Content-Type": "application/json"
                    }
            }
        );

        console.log("API Response:", apiResponse.data);

        if (apiResponse.data.status === true) {
            // Prepare data to send to Laravel backend
            const saveData = {
                ...formData,
                response_code: apiResponse.data.response_code,
                operatorid: apiResponse.data.operatorid,
                ackno: apiResponse.data.ackno,
                refid: apiResponse.data.refid,
                message: apiResponse.data.message,
                // Ensure bill_fetch is included
                bill_fetch: {
                    ...formData.bill_fetch
                }
            };

            console.log("Data being sent to Laravel:", saveData);

            // Send data to Laravel for saving
            const saveResponse = await axios.post("/save-bill-payment", saveData, {
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (saveResponse.data.status) {
                alert("Bill Payment Successful and Data Saved!");
            } else {
                alert(saveResponse.data.message || "Failed to save data");
            }

        } else {
            alert("Bill Payment Failed: " + apiResponse.data.message);
        }

    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
            console.error("Error Response:", error.response.data);
            alert(error.response.data.message || "An error occurred while processing payment.");
        } else {
            alert("An error occurred while processing payment.");
        }
    }
};
  
  return (
<div className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
  <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-center mb-6 text-gray-700">
    <CreditCard className="w-6 h-6 text-secondary_color" />
    LIC Bill Payment
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
    {/* CA Number */}
    <div className="flex items-center gap-3">
      <Hash className="w-6 h-6 text-blue-600" />
      <input type="number" name="canumber" placeholder="CA Number" value={formData.canumber} onChange={handleChange} className=" p-2 w-full border-primary_color border-2 rounded" required />
    </div>

    {/* Payment Mode */}
    <div className="flex items-center gap-3">
      <ClipboardList className="w-6 h-6 text-green-600" />
      <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded">
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>
    </div>

    {/* Amount */}
    <div className="flex items-center gap-3">
      <DollarSign className="w-6 h-6 text-red-600" />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Email */}
    <div className="flex items-center gap-3">
      <Mail className="w-6 h-6 text-orange-600" />
      <input type="text" name="ad1" placeholder="Email" value={formData.ad1} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Date */}
    <div className="flex items-center gap-3">
      <Calendar className="w-6 h-6 text-purple-600" />
      <input type="text" name="ad2" placeholder="Date" value={formData.ad2} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Transaction ID */}
    <div className="flex items-center gap-3">
      <ClipboardList className="w-6 h-6 text-blue-600" />
      <input type="text" name="ad3" placeholder="Transaction ID" value={formData.ad3} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Reference ID */}
    <div className="flex items-center gap-3">
      <FileText className="w-6 h-6 text-gray-600" />
      <input type="text" name="referenceid" placeholder="Reference ID" value={formData.referenceid} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Bill Number */}
    <div className="flex items-center gap-3">
      <Hash className="w-6 h-6 text-yellow-600" />
      <input type="text" name="bill_fetch.billNumber" placeholder="Bill Number" value={formData.bill_fetch.billNumber} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Bill Amount */}
    <div className="flex items-center gap-3">
      <DollarSign className="w-6 h-6 text-red-500" />
      <input type="number" name="bill_fetch.billAmount" placeholder="Bill Amount" value={formData.bill_fetch.billAmount} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Bill Net Amount */}
    <div className="flex items-center gap-3">
      <DollarSign className="w-6 h-6 text-red-500" />
      <input type="number" name="bill_fetch.billnetamount" placeholder="Bill Net Amount" value={formData.bill_fetch.billnetamount} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Bill Date */}
    <div className="flex items-center gap-3">
      <Calendar className="w-6 h-6 text-purple-600" />
      <input type="text" name="bill_fetch.billdate" placeholder="Bill Date" value={formData.bill_fetch.billdate} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Accept Payment */}
    <div className="flex items-center gap-3">
      <CheckSquare className="w-6 h-6 text-green-500" />
      <select name="bill_fetch.acceptPayment" value={formData.bill_fetch.acceptPayment} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded">
        <option value={true}>Accept Payment</option>
        <option value={false}>Don't Accept Payment</option>
      </select>
    </div>

    {/* Accept Part Payment */}
    <div className="flex items-center gap-3">
      <CheckSquare className="w-6 h-6 text-green-500" />
      <select name="bill_fetch.acceptPartPay" value={formData.bill_fetch.acceptPartPay} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded">
        <option value={true}>Accept Part Payment</option>
        <option value={false}>Don't Accept Part Payment</option>
      </select>
    </div>

    {/* Cell Number */}
    <div className="flex items-center gap-3">
      <Smartphone className="w-6 h-6 text-blue-700" />
      <input type="text" name="bill_fetch.cellNumber" placeholder="Cell Number" value={formData.bill_fetch.cellNumber} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Validation ID */}
    <div className="flex items-center gap-3">
      <FileText className="w-6 h-6 text-gray-600" />
      <input type="text" name="bill_fetch.validationId" placeholder="Validation ID" value={formData.bill_fetch.validationId} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Bill ID */}
    <div className="flex items-center gap-3">
      <FileText className="w-6 h-6 text-gray-600" />
      <input type="text" name="bill_fetch.billId" placeholder="Bill ID" value={formData.bill_fetch.billId} onChange={handleChange} className="w-full p-2 border-primary_color border-2 rounded" required />
    </div>

    {/* Submit Button */}
    <button type="submit" className="w-full col-span-2 bg-secondary_color text-white p-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold hover:bg-opacity-90 transition">
      <CreditCard className="w-6 h-6 text-white" />
      Pay Bill
    </button>
  </form>
</div>


  );
}
