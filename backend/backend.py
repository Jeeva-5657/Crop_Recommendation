from flask import Flask, jsonify
import pandas as pd
import joblib
import random
from flask_cors import CORS

# Flask app initialization
app = Flask(__name__)

CORS(app)

# Load trained model
model = joblib.load("crop_recommendation_model.pkl")

# API route to return prediction
@app.route('/predict_crop', methods=['GET'])
def predict_crop():
    # Random values generation (simulate sensor data)
    input_data = [
        random.uniform(0, 150),  # Nitrogen
        random.uniform(0, 150),  # Phosphorus
        random.uniform(0, 150),  # Potassium
        random.uniform(20, 40),  # Temperature (°C)
        random.uniform(40, 90),  # Humidity (%)
        round(random.uniform(4.5, 9.0), 2),  # pH
        random.uniform(50, 300)  # Rainfall (mm)
    ]

    # Convert to DataFrame for prediction
    columns = ['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'pH', 'Rainfall']
    input_df = pd.DataFrame([input_data], columns=columns)

    # Predict using model
    prediction = model.predict(input_df)[0]

    return jsonify({
        "Predicted Crop": prediction,
        "Input Data": dict(zip(columns, input_data))
    })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
