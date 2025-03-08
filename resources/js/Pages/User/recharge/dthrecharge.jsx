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
    referenceid: ''
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
  
      // Fetch DTH operators from the external API
      const response = await fetch('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/getoperator', {
        method: 'POST',
        headers,
      });
  
      const data = await response.json();
    
  
      // Check if response data contains the expected properties
      if (data && data.data) {
        const dataDth = data.data.filter((operator) => operator.category === 'DTH');
        console.log(dataDth);
        setOperators(dataDth); // Use filtered DTH operators here
  
        if (data.status) {
          // Sending DTH data to Laravel via the web route
          const saveDthResponse = await fetch('/save-dth-operators', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,  // Add CSRF token to the header
            },
            body: JSON.stringify({ operators: dataDth }),
          });
  
          const saveDthData = await saveDthResponse.json();
          console.log(saveDthData);
          if (saveDthData.success) {
            setMessage({ type: 'success', text: 'DTH Operators saved successfully' });
          } else {
            setMessage({ type: 'error', text: saveDthData.message });
          }
        } else {
          setMessage({ type: 'error', text: data.message });
        }
      } else {
        setMessage({ type: 'error', text: 'No data available' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch DTH operators' });
    } finally {
      setLoading(false);
    }
  };
  

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {


  // console.log(csrfToken);
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
        const saveResponse = await fetch('/save-dth', {
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
        const saveResponse = await fetch('/save-dth-status', {
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
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#497D74] to-white shadow-xl rounded-lg border border-green-400">
      <CardContent className="p-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gradient-to-r from-green-800 to-white p-1 mb-6 shadow-md">
            <Tab className={({ selected }) =>
              `w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 shadow-md
              ${selected ? 'bg-white text-[#497D74] shadow-lg' : 'text-green-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Operator List
            </Tab>
            <Tab className={({ selected }) =>
              `w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 shadow-md
              ${selected ? 'bg-white text-[#497D74] shadow-lg' : 'text-green-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Recharge
            </Tab>
            <Tab className={({ selected }) =>
              `w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 shadow-md
              ${selected ? 'bg-white text-[#497D74] shadow-lg' : 'text-green-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Status Enquiry
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Operator List Panel */}
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

            {/* Recharge Panel */}
            <Tab.Panel>
              <form onSubmit={handleRecharge} className="space-y-4">
                <select
  value={formData.operator || ""}
  onChange={(e) =>
    setFormData({ ...formData, operator: e.target.value })
  }
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
                  type="number"
                  placeholder="DTH Number"
                  value={formData.canumber}
                  onChange={(e) => setFormData({...formData, canumber: e.target.value})}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full border shadow-md"
                />

                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                  min="1"
                  className="w-full border shadow-md"
                />
                <Input
                  type="number"
                  placeholder="Reference Number"
                  value={formData.referenceid}
                  onChange={(e) => setFormData({...formData, referenceid: e.target.value})}
                  required
                  min="1"
                  className="w-full border shadow-md"
                />
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
                  className="w-full border shadow-md"
                />

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Check Status"}
                </Button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </CardContent>
    </Card>
  );

};

export default RechargeComponent;
