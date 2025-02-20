import React, { useState, useEffect } from 'react';

const RechargeStatusTable = () => {
  const [statusResult, setStatusResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch('/recharge-statuses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStatusResult(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatusData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Operator</th>
            <th>Mobile Number</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Reference ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {statusResult.map((status) => (
            <tr key={status.id}>
              <td>{status.txnid}</td>
              <td>{status.operatorname}</td>
              <td>{status.canumber}</td>
              <td>₹{status.amount}</td>
              <td>{status.status === '1' ? 'Success' : 'Failed'}</td>
              <td>{status.refid}</td>
              <td>{status.dateadded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RechargeStatusTable;
