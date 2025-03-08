import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, List, RefreshCw, Search } from "lucide-react";

const RechargeComponent = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    operator: '',
    canumber: '',
    amount: '',
    referenceid: '',
  });
  const [statusReferenceId, setStatusReferenceId] = useState('');
  const [statusResult, setStatusResult] = useState(null);

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      const response = await fetch('/recharge/fetch-operators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });
      const data = await response.json();

      if (data.success) {
        setOperators(data.operators);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch operators' });
    } finally {
      setLoading(false);
    }
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/recharge/do-recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setMessage({
        type: data.status ? 'success' : 'error',
        text: data.message,
      });

      if (data.status) {
        setFormData({
          operator: '',
          canumber: '',
          amount: '',
          referenceid: '',
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Recharge failed' });
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/recharge/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ referenceid: statusReferenceId }),
      });
      const data = await response.json();

      setStatusResult(data);

      if (!data.status) {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Status check failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-[#497D74] to-white shadow-xl rounded-lg border border-green-400">
      <CardContent className="p-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gradient-to-r from-green-800 to-white p-1 mb-6 shadow-md">
            {[
              { name: "Operator List", icon: <List className="w-5 h-5 mr-2" /> },
              { name: "Recharge", icon: <RefreshCw className="w-5 h-5 mr-2" /> },
              { name: "Status Enquiry", icon: <Search className="w-5 h-5 mr-2" /> },
            ].map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 shadow-md
                  ${selected ? "bg-white text-[#497D74] shadow-lg" : "text-green-100 hover:bg-white/[0.12] hover:text-white"}`
                }
              >
                {tab.icon} {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="w-full border border-green-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-200 to-white text-green-900">
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.map((op) => (
                      <tr key={op.id} className="border-b hover:bg-green-50 transition duration-200">
                        <td className="p-4">{op.id}</td>
                        <td className="p-4">{op.name}</td>
                        <td className="p-4">{op.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <form onSubmit={handleRecharge} className="space-y-4">
                <select
                  value={formData.operator || ""}
                  onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                  required
                  className="w-full border border-green-400 p-3 rounded-lg bg-white shadow-md text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-50 transition-all"
                >
                  <option value="" className="text-gray-500">Select Operator</option>
                  {operators.map((op) => (
                    <option key={op.id} value={op.id} className="text-green-800">
                      {op.name}
                    </option>
                  ))}
                </select>
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.canumber}
                  onChange={(e) => setFormData({ ...formData, canumber: e.target.value })}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full border shadow-md"
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  min="1"
                  className="w-full border shadow-md"
                />
                <Input
                  type="number"
                  placeholder="Reference Number"
                  value={formData.referenceid}
                  onChange={(e) => setFormData({ ...formData, referenceid: e.target.value })}
                  required
                  min="1"
                  className="w-full border shadow-md"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#497D74] to-gray-400 text-white hover:shadow-lg transition-all duration-300"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Recharge"}
                </Button>
              </form>
            </Tab.Panel>

            <Tab.Panel>
              <form onSubmit={checkStatus} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Reference ID"
                  value={statusReferenceId}
                  onChange={(e) => setStatusReferenceId(e.target.value)}
                  required
                  className="w-full border shadow-md"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#497D74] to-gray-400 text-white hover:shadow-lg transition-all duration-300"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Check Status"}
                </Button>
              </form>

              {statusResult && statusResult.status && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg shadow-md border border-green-300">
                  <h3 className="font-medium mb-2">Transaction Details:</h3>
                  <div className="space-y-2">
                    <p>Transaction ID: {statusResult.data?.txnid}</p>
                    <p>Operator: {statusResult.data?.operatorname}</p>
                    <p>Mobile Number: {statusResult.data?.canumber}</p>
                    <p>Amount: ₹{statusResult.data?.amount}</p>
                    <p>Status: {statusResult.data?.status === "1" ? "Success" : "Failed"}</p>
                    <p>Reference ID: {statusResult.data?.refid}</p>
                    <p>Date: {statusResult.data?.dateadded}</p>
                  </div>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {message.text && (
          <Alert className={`mt-4 ${message.type === "error" ? "bg-red-50" : "bg-green-50"}`}>
            <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default RechargeComponent;