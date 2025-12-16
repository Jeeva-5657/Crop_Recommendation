import { useState } from "react";
import { motion } from "framer-motion";

export default function CropPredictionForm() {
  const [formData, setFormData] = useState({
    Nitrogen: "50",
    Phosphorus: "12",
    Potassium: "63",
    Temperature: "60.87974371",
    Humidity: "72.00274423",
    pH: "9.502985292",
    Rainfall: "102.9355362",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [predictedCrop, setPredictedCrop] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictedCrop(null);

    try {
      const res = await fetch("http://localhost:5000/get-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      setPredictedCrop(data.predicted_crop);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-100 to-white rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-green-800 mb-2">
        🌾 Smart Crop Prediction
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter soil & climate parameters to predict the best crop
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {Object.keys(formData).map((key) => (
          <div key={key} className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              {key}
            </label>
            <input
              type="number"
              step="any"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-green-700 to-green-600 text-white py-3 rounded-2xl text-lg font-semibold shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-60"
          >
            {loading ? "🔄 Predicting Crop..." : "🌱 Predict Best Crop"}
          </button>
        </div>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm mt-6 text-center"
        >
          {error}
        </motion.p>
      )}

      {predictedCrop && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-10 p-6 bg-green-100 rounded-2xl text-center shadow-inner"
        >
          <p className="text-xl font-bold text-green-800">
            ✅ Recommended Crop
          </p>
          <p className="text-3xl mt-2 font-extrabold text-green-900">
            {predictedCrop}
          </p>

          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <a
              href={`/blog/${predictedCrop.toLowerCase()}`}
              style={{
                textDecoration: "none",
                color: "#006400",
                fontWeight: "bold",
                fontSize: "1.15rem",
              }}
            >
              🌾 Learn more about growing {predictedCrop} →
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
