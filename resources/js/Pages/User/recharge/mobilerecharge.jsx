import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

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
  const [formData2, setFormData2] = useState({
    amount: '',
    canumber: '',
    comm: '',
    dateadded: '',
    daterefunded: '',
    operatorid: '',
    operatorname: '',
    refid: '',
    refunded: false,
    refundtxnid: '',
    status: false,
    tds: '',
    txnid: '',
});
  const [statusReferenceId, setStatusReferenceId] = useState('');
  const [statusResult, setStatusResult] = useState(null);

  const headers = {
    'Authorisedkey': 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
    'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk4NjE1NjEsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5ODYxNTYxIn0.f1KVsIMsxbfaei6iA5zpoOc0g8FF_uu16hmeyRm4_LQ',
    'accept': 'text/plain',
    'content-type': 'application/json'
  };



  useEffect(() => {
    fetchOperators();
  }, []);
  const fetchOperators = async () => {
    try {
      setLoading(true);
  
      // Fetch CSRF token from Laravel
      const csrfResponse = await fetch('/get-csrf-token');
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrf_token; // Retrieve the CSRF token
  console.log(csrfToken);
      const response = await fetch('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/getoperator', {
        method: 'POST',
        headers
      });
  
      const data = await response.json();
      console.log(data)
  
      // Check if response data contains the expected properties
      if (data && data.data) {
        const dataPrepaid = data.data.filter((operator) => operator.category === 'Prepaid');
        setOperators(dataPrepaid); // Use filtered Prepaid operators here

        if (data.status) {
          // Sending Prepaid data to Laravel via the web route
          const savePrepaidResponse = await fetch('/save-prepaid-operators', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,  // Add CSRF token to the header
            },
            body: JSON.stringify({ operators: dataPrepaid }),
          });
  
          const savePrepaidData = await savePrepaidResponse.json();

          if (savePrepaidData.success) {
            setMessage({ type: 'success', text: 'Prepaid Operators saved successfully' });
          } else {
            setMessage({ type: 'error', text: savePrepaidData.message });
          }
        } else {
          setMessage({ type: 'error', text: data.message });
        }
      } else {
        setMessage({ type: 'error', text: 'No data available' });
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


      // 1. Call the external recharge API
      const response = await fetch('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/dorecharge', {
        method: 'POST',
        headers, 
        body: JSON.stringify(formData),
      });
      const data = await response.json();
       console.log(data)
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
          // recharge_date is omitted so backend defaults to now()
        });
  
        // 2. Fetch CSRF token from Laravel
        const csrfResponse = await fetch('/get-csrf-token');
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrf_token;
        console.log('CSRF Token:', csrfToken);
  
        // 3. Send recharge data (form data, message, status) to Laravel
        const saveResponse = await fetch('/save-recharge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({
            recharge_data: {
              form_data: formData,
              message: data.message,
              status: data.status,
              recharge_date: formData.recharge_date || null,
            },
          }),
        });
  console.log(saveResponse)
        // Get raw response text for debugging
        const rawResponse = await saveResponse.json();
        console.log('Raw Recharge Response:', rawResponse);
  
        } 
  
      
    } catch (error) {
      console.error('Error in recharge process:', error);
      setMessage({ type: 'error', text: 'Recharge failed' });
    } finally {
      setLoading(false);
    }
  };
  
  
  const checkStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
            // Fetch CSRF token from Laravel
            const csrfResponse = await fetch('/get-csrf-token');
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrf_token; // Retrieve the CSRF token
      const response = await fetch('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/status ', {
        method: 'POST',
        headers,
        body: JSON.stringify({ referenceid: statusReferenceId })
      });
      const data = await response.json();
      console.log('API Response:', data);
      setStatusResult(data);
  
      if (data.status) {
        // Send the data to your Laravel backend
        const saveResponse = await fetch('/save-recharge-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken, // Ensure you have the CSRF token available
          },
          body: JSON.stringify(data.data), // Adjust this based on your backend's expected structure
        });
  
        if (!saveResponse.ok) {
          throw new Error('Failed to save data to the backend');
        }
  
        // const saveData = await saveResponse.json();
        console.log('Save Response:', saveResponse);
  
  
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error in checkStatus:', error);
      setMessage({ type: 'error', text: 'An error occurred while processing the request' });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Operator List
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Recharge
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Status Enquiry
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Operator List Panel */}
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.map((op) => (
                      <tr key={op.id} className="border-b">
                        <td className="p-4">{op.id}</td>
                        <td className="p-4">{op.name}</td>
                        <td className="p-4">{op.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>

            {/* Recharge Panel */}
            <Tab.Panel>
              <form onSubmit={handleRecharge} className="space-y-4">
              <select
    value={formData.operator || ""}
    onChange={(e) =>
      setFormData({ ...formData, operator: e.target.value })
    }
    required
    className="w-full border p-2 rounded"
  >
    <option value="">Select Operator</option>
    {operators.map((op) => (
      <option key={op.id} value={op.id}>
        {op.name}
      </option>
    ))}
  </select>

                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.canumber}
                  onChange={(e) => setFormData({...formData, canumber: e.target.value})}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full"
                />

                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                  min="1"
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="reference Number"
                  value={formData.referenceid}
                  onChange={(e) => setFormData({...formData, referenceid: e.target.value})}
                  required
                  min="1"
                  className="w-full"
                />

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Recharge'}
                </Button>
              </form>
            </Tab.Panel>

            {/* Status Enquiry Panel */}
            <Tab.Panel>
              <form onSubmit={checkStatus} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Reference ID"
                  value={statusReferenceId}
                  onChange={(e) => setStatusReferenceId(e.target.value)}
                  required
                  className="w-full"
                />

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Check Status'}
                </Button>
              </form>

              {statusResult && statusResult.status && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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
          <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
            <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default RechargeComponent;