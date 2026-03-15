# AASMA - Advanced AI Healthcare Platform

AASMA is a full-stack multimodal AI healthcare platform integrating real-time wearable telemetry, environmental data, and personalized risk prediction.

## 🏗️ Project Structure
- **/aasma**: Next.js (TypeScript) Frontend + Prisma (SQLite).
- **/aasma/backend**: Python ML Pipeline (XGBoost, SHAP, Hybrid Anomaly, Burnout Detection).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ 
- **Python**: v3.9+
- **Prisma**: installed via npm

---

### 2. Frontend Setup (Next.js)
Navigate to the root directory `/aasma`:

```bash
# Install dependencies
npm install

# Setup SQLite database with Prisma
npx prisma db push

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

### 3. Backend Setup (Python ML)
Navigate to `aasma/backend`:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the full ML verification pipeline
python run_pipeline.py
```
This script validates Data Ingestion, Fusion Engine, Risk Prediction, SHAP Explainability, Hybrid Anomaly Detection, and Burnout Detection.

---

## 🔬 Core AI Features
- **SHAP Explainability**: Visualizes feature attribution for risk scores.
- **Hybrid Anomaly Detection**: Uses Isolation Forest & HR Z-Score.
- **Counterfactual Simulation**: "What-if" scenario modeling.
- **Multimodal Fusion**: Weights EHR risk (0.6) and Wearable risk (0.4).
- **Burnout Detection**: Threshold-based clinician workload monitoring.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Shadcn/UI.
- **Backend**: Python, XGBoost, SHAP, Scikit-Learn, Pandas.
- **Database**: SQLite + Prisma ORM.
