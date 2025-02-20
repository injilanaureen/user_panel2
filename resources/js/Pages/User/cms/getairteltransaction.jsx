import axios from "axios";
import { useState } from "react";

const CheckTransaction = () => {
  const [refid, setRefid] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/cms/airtel/check-status", { refid });
      console.log("API Response:", response.data);
      setResponseData(response.data);
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Check Transaction Status</h2>
      <form onSubmit={handleCheckStatus}>
        <label>
          Ref ID:
          <input type="text" value={refid} onChange={(e) => setRefid(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Check Status</button>
      </form>

      {responseData && <p>Response: {JSON.stringify(responseData)}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default CheckTransaction;
