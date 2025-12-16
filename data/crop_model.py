# Import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier as rc
from sklearn.metrics import accuracy_score, classification_report
import joblib  # Import joblib for saving and loading models

# Load dataset (Replace with your dataset path)
data = pd.read_csv("data/Crop_recommendation.csv")

# Preview the dataset
print(data.head())

# Define Features (X) and Target (y)
X = data[['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'pH', 'Rainfall']]  
y = data['Crop']

# Split the dataset into Training and Testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest Classifier
rf_model = rc(n_estimators=100, max_depth=5, min_samples_split=5, random_state=42)

# Train the model
rf_model.fit(X_train, y_train)

# Save the trained model as a .pkl file
model_filename = 'crop_recommendation_model.pkl'
joblib.dump(rf_model, model_filename)
print(f"Model saved as {model_filename}")

# Make Predictions
y_pred = rf_model.predict(X_test)

# Evaluate the Model
accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Feature Importance
feature_importance = pd.Series(rf_model.feature_importances_, index=X.columns).sort_values(ascending=False)
print("\nFeature Importance:\n", feature_importance)

# Calculate Training Accuracy
y_train_pred = rf_model.predict(X_train)
train_accuracy = accuracy_score(y_train, y_train_pred)
print(f"Training Accuracy: {train_accuracy * 100:.2f}%")

# -------------------- Visualization --------------------

# Varying the number of trees to observe accuracy changes
n_estimators_range = [10, 50, 100, 150, 200, 250, 300]
train_accuracies = []
test_accuracies = []

for n in n_estimators_range:
    rf = rc(n_estimators=n, max_depth=5, min_samples_split=5, random_state=42)
    rf.fit(X_train, y_train)

    y_train_pred = rf.predict(X_train)
    y_test_pred = rf.predict(X_test)

    train_accuracies.append(accuracy_score(y_train, y_train_pred))
    test_accuracies.append(accuracy_score(y_test, y_test_pred))

# Plot Training vs Testing Accuracy
plt.figure(figsize=(8, 5))
plt.plot(n_estimators_range, train_accuracies, marker='o', label="Training Accuracy", linestyle='dashed')
plt.plot(n_estimators_range, test_accuracies, marker='s', label="Testing Accuracy", linestyle='solid')
plt.xlabel("Number of Trees (n_estimators)")
plt.ylabel("Accuracy")
plt.title("Training vs Testing Accuracy for Random Forest")
plt.legend()
plt.grid(True)
plt.show()

# Plot Feature Importance
plt.figure(figsize=(8, 5))
feature_importance.sort_values().plot(kind="barh", color="teal")
plt.xlabel("Feature Importance Score")
plt.ylabel("Features")
plt.title("Feature Importance in Crop Recommendation Model")
plt.grid(True)
plt.show()

# loaded_rf_model = joblib.load("A:\FINAL_YEAR_PROJECT\Astro\crop_model.py")
