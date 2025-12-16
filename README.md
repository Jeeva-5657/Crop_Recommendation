# Crop Recommendation 🌾

**Crop Recommendation** is a showcase project that predicts the most suitable crop for provided soil and environmental features. The model is a Random Forest classifier (scikit-learn) trained on `data/Crop_recommendation.csv`. The repo contains a small Flask backend (`backend/`) and an Astro frontend (`src/`).

---

## 🔍 Highlights 

- Model: **Random Forest classifier** trained with `scikit-learn` (see `data/crop_model.py`).
- Added the Random parameters to predict the crop.
- Two API endpoints to fetch predictions:
  - **GET /predict_crop** — returns a prediction using randomly sampled sensor-like input (demo).
  - **POST /get-details** — accepts a JSON body with the seven features and returns a prediction (for real input).
- Clean UI and charts are served from `src/` (Astro + React components).

---

## 🧾 API Reference

### 1) GET /predict_crop
- Description: Returns a predicted crop using randomly generated inputs. Helpful for quick demos.
- Example:
  ```bash
  curl http://127.0.0.1:5000/predict_crop
  ```
  Response:
  ```json
  {
    "Predicted Crop": "maize",
    "Input Data": {"Nitrogen": 85.0, "Phosphorus": 60.0, "Potassium": 40.0, "Temperature": 28.5, "Humidity": 78.2, "pH": 6.5, "Rainfall": 180.4}
  }
  ```

### 2) POST /get-details
- Description: Accepts JSON body with the fields `Nitrogen`, `Phosphorus`, `Potassium`, `Temperature`, `Humidity`, `pH`, and `Rainfall` and returns the predicted crop.
- Example request (curl):
  ```bash
  curl -X POST http://127.0.0.1:5000/get-details \
    -H "Content-Type: application/json" \
    -d '{"Nitrogen":80,"Phosphorus":60,"Potassium":40,"Temperature":28.5,"Humidity":70,"pH":6.5,"Rainfall":150}'
  ```
  Example response:
  ```json
  {"predicted_crop":"maize"}
  ```

---

## ⚙️ Prerequisites

- Node.js (>=16) and npm
- Python 3.8+
- Python packages: `flask`, `flask-cors`, `pandas`, `scikit-learn`, `joblib`, `matplotlib`

---

## 🚀 Quick Start (Run & Test)

1. Frontend
   ```bash
   npm install
   npm run dev
   # Open: http://localhost:4321
   ```

2. Backend
   ```powershell
   cd backend
   python -m venv venv
   venv\Scripts\Activate.ps1
   pip install -r requirements.txt  # or: pip install flask flask-cors pandas scikit-learn joblib
   python backend.py
   ```
   - Flask default: http://127.0.0.1:5000

3. Train model (if you want to retrain / update):
   ```bash
   python data/crop_model.py
   # Copies / moves crop_recommendation_model.pkl into backend/ for serving
   ```
---

## 📁 Project Structure

```
Crop_Recommendation/
├─ backend/
│  ├─ backend.py
│  └─ crop_recommendation_model.pkl
├─ data/
│  ├─ Crop_recommendation.csv
│  └─ crop_model.py
├─ public/
│  └─ screenshots/  # add your screenshots here
├─ src/
├─ package.json
└─ README.md
```
--- 
## 📈 Future Enhancements

- ✅ Add the IOT integration to collect the real time data.
- 🔜 Use more advanced ML algorithms (Random Forest, XGBoost)
- 🔜 Integrate the AI to enhance the prediction accuracy.
---
## 🌐 Connect
- Author : Jeeva Vadivel
- Email : jeevavadivel01@gmail.com
- Github : [Jeeva-5657](https://github.com/Jeeva-5657)
- LinkedIn : [Jeeva Vadivel](https://www.linkedin.com/in/jeeva-vadivel/)