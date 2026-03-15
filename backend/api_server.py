from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import httpx
import os
import random
from behavioral_nudging import generate_nudge
from drug_repositioning import suggest_repositioned_drugs
from microbiome_forecasting import forecast_microbiome_risk
from environmental_alerting import check_environmental_alerts
from active_learning import uncertainty_sampling, simulate_clinician_feedback
from fairness_monitor import compute_fairness_metrics
from risk_prediction import train_and_evaluate_xgboost

app = FastAPI(title="AASMA AI Agent Mesh", version="1.0.0")

# Simulated Kafka Producer
async def produce_event(topic: str, message: dict):
    print(f"[Kafka] Producing to {topic}: {message}")

class ChatRequest(BaseModel):
    message: str
    patient_id: Optional[str] = "P-102"

class FeedbackRequest(BaseModel):
    patient_id: str
    feedback: str

@app.get("/health")
async def health_check():
    return {"status": "healthy", "agents_active": 15}

@app.get("/agents/insights/{patient_id}")
async def get_patient_insights(patient_id: str, adherence_rate: Optional[float] = None):
    # Use provided adherence or default to random for simulation
    adherence = adherence_rate if adherence_rate is not None else random.uniform(0.3, 0.9)
    
    comorbidities = ["Hypertension", "Diabetes"]
    dietary_fiber = 22
    hr = random.randint(60, 110)
    
    insights = {
        "nudge": generate_nudge(adherence),
        "drug_suggestions": suggest_repositioned_drugs(comorbidities),
        "microbiome": forecast_microbiome_risk(dietary_fiber),
        "environmental": check_environmental_alerts(65, 110)
    }
    return insights

@app.post("/active-learning/initiate")
async def initiate_active_learning(background_tasks: BackgroundTasks):
    # Simulate the active learning cycle
    background_tasks.add_task(produce_event, "active-learning-queue", {"action": "start_cycle"})
    return {"message": "Active Learning cycle initiated across 4 nodes."}

@app.post("/chat/health-gpt")
async def health_gpt(req: ChatRequest):
    # Integration with NVIDIA NIM (Using provided API key and model)
    api_key = os.getenv("NV_API_KEY", "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")
    invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    payload = {
        "model": "qwen/qwen3.5-397b-a17b",
        "messages": [
            {"role": "system", "content": "You are AASMA Health GPT, a clinical assistant for Patient Sarah Jenkins (P-102)."},
            {"role": "user", "content": req.message}
        ],
        "max_tokens": 1024,
        "temperature": 0.6,
        "top_p": 0.95
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(invoke_url, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()
                return {"response": data['choices'][0]['message']['content']}
            else:
                return {"response": f"API Error ({response.status_code}): {response.text[:100]}... [Simulation Mode Active]"}
    except Exception as e:
        # Fallback to simulation if endpoint is unreachable
        if "risk" in req.message.lower():
            return {"response": "Based on current telemetry, the patient's cardiovascular risk is elevated due to a 15% increase in HR trend over the last 4 hours. Combined with the local PM2.5 spike (68 ug/m3), a 2.3x risk multiplier is active. [Simulation Mode]"}
        return {"response": f"Connection Error: {str(e)}. [Simulation Mode Active]"}

@app.get("/fairness/report")
async def get_fairness_report():
    # Simulate generating the report
    return {
        "disparity_score": "22.4%",
        "groups": ["Age", "Gender", "Ethnicity"],
        "critical_groups": ["75+"],
        "recommendation": "Prioritize data collection for age > 70"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
