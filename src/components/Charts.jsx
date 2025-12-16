import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Helper function to get current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const RechartsCharts = () => {
  const [sensorData, setSensorData] = useState([]);
  const [predictedCrop, setPredictedCrop] = useState("");

  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict_crop"); // Make sure this matches your Flask port
      const result = await response.json();
      const time = getCurrentTime();
      const data = result["Input Data"];
      const newEntry = {
        time,
        N: data["Nitrogen"],
        P: data["Phosphorus"],
        K: data["Potassium"],
        Temp: data["Temperature"],
        Humidity: data["Humidity"],
        pH: data["pH"]
      };

      setPredictedCrop(result["Predicted Crop"]);

      setSensorData(prevData => {
        const updated = [...prevData, newEntry];
        return updated.length > 5 ? updated.slice(updated.length - 5) : updated;
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData(); // Initial fetch
    const interval = setInterval(fetchSensorData, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", padding: "2rem 0" }}>
      <h2 style={{ textAlign: "center" }}>Live IoT Sensor Readings</h2>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={sensorData} margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="N" stroke="#0088FE" name="Nitrogen" />
          <Line type="monotone" dataKey="P" stroke="#00C49F" name="Phosphorus" />
          <Line type="monotone" dataKey="K" stroke="#FFBB28" name="Potassium" />
          <Line type="monotone" dataKey="Temp" stroke="#FF8042" name="Temperature" />
          <Line type="monotone" dataKey="Humidity" stroke="#8884d8" name="Humidity" />
          <Line type="monotone" dataKey="pH" stroke="#AA336A" name="pH" />
        </LineChart>
      </ResponsiveContainer>
      {predictedCrop && (
        <>
          <h3 style={{ textAlign: "center", marginTop: "2rem", color: "green" }}>
            ✅ Predicted Crop: <strong>{predictedCrop}</strong>
          </h3>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href={`/blog/${predictedCrop.toLowerCase()}`}
              style={{ textDecoration: "none", color: "#006400", fontWeight: "bold", fontSize: "1.1rem" }}
            >
              🌾 Learn more about growing {predictedCrop} →
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default RechartsCharts;
