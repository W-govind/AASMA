"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Heart,
  Wind,
  User as UserIcon,
  Brain,
  Target,
  ShieldIcon
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

const PRIORITY_CARDS = [
  {
    title: "Multimodal Fusion",
    description: "0.6 EHR + 0.4 Wearable synchronization active.",
    date: "Real-time",
    icon: <ShieldIcon className="size-4 text-emerald-300" />,
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-slate-800 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-slate-950/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "Fairness Guard",
    description: "Demographic parity violation in 75+ group.",
    date: "2m ago",
    icon: <AlertTriangle className="size-4 text-amber-300" />,
    className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-slate-800 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-slate-950/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "Active Learning",
    description: "Uncertainty sampling identified 12 edge cases.",
    date: "Just now",
    icon: <Target className="size-4 text-blue-300" />,
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { time: "00:00", f_score: 45, heartRate: 72, riskPrediction: 0.1 },
  { time: "04:00", f_score: 42, heartRate: 68, riskPrediction: 0.1 },
  { time: "08:00", f_score: 48, heartRate: 85, riskPrediction: 0.2 },
  { time: "12:00", f_score: 55, heartRate: 92, riskPrediction: 0.4 },
  { time: "16:00", f_score: 82, heartRate: 115, riskPrediction: 0.9 }, // XGBoost spike
  { time: "20:00", f_score: 64, heartRate: 90, riskPrediction: 0.7 },
];

import { useEffect, useState } from "react";
import { getLiveWeather } from "@/app/actions/weather-actions";
import { CloudSun } from "lucide-react";

export default function Dashboard() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    getLiveWeather().then(setWeather);
  }, []);
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Patient Oversight</h1>
          <p className="text-slate-400 text-lg">Real-time multimodal risk analysis and fusion metrics.</p>
          <div className="flex items-center gap-4 mt-6">
            <Badge className="bg-emerald-500 text-slate-950 font-bold px-4 py-1.5 rounded-full">System Live</Badge>
            <div className="text-sm font-semibold text-slate-400 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Sync: 12ms
            </div>
            {weather && (
              <div className="text-sm font-semibold text-slate-400 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 animate-in fade-in slide-in-from-right-4 duration-700">
                <CloudSun className="w-4 h-4 text-blue-400" />
                {weather.temp}{weather.unit} • {weather.humidity}% Humidity
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <DisplayCards cards={PRIORITY_CARDS} />
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-2xl font-semibold text-slate-400 mb-4 uppercase tracking-widest">
              Advanced Clinical Diagnostics
            </h1>
            <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none text-white block">
              Predictive Health Metrics
            </span>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <StatCard
            title="Overall Risk Index"
            value="45"
            unit="/ 100"
            trend="-2.4%"
            trendType="positive"
            icon={Activity}
            color="text-amber-500"
          />
          <StatCard
            title="Microbiome Index"
            value="0.22"
            unit="Dysbiosis"
            trend="Stable"
            trendType="positive"
            icon={Wind}
            color="text-emerald-500"
          />
          <StatCard
            title="Env. PM2.5 Alert"
            value="68"
            unit="µg/m³"
            trend="Hazardous"
            trendType="negative"
            icon={AlertTriangle}
            color="text-rose-500"
          />
          <StatCard
            title="FL Site Sync"
            value="3"
            unit="Nodes"
            trend="Secured"
            trendType="positive"
            icon={Brain}
            color="text-blue-500"
          />
        </div>

        <div className="mt-8 px-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="f_score" stroke="#10b981" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={2} name="Fusion Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ContainerScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Multi-Parameter Trend Analysis
            </CardTitle>
            <CardDescription className="text-slate-500">
              Correlating physiological metrics with unified AI risk scores over 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="f_score"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRisk)"
                  strokeWidth={2}
                  name="Fusion Score"
                />
                <Area
                  type="monotone"
                  dataKey="riskPrediction"
                  stroke="#f59e0b"
                  fillOpacity={0}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="XGBoost Prob."
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Active System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AlertItem
              type="critical"
              title="Environmental Hazards Detected"
              message="Local PM2.5 spike (>55 µg/m³) detected via sensor fusion. Automated high-risk multipliers (2.3x) applied."
              time="Just now"
            />
            <AlertItem
              type="info"
              title="FL Global Weight Aggregation"
              message="Secure FedAvg complete for Round 14. 3 sites synchronized (N=3,500). Privacy verified via MPC logic."
              time="5m ago"
            />
            <AlertItem
              type="warning"
              title="Behavioral Compliance Nudge"
              message="Loss Aversion nudge triggered for Cohort B (Adherence < 50%). Proximity to cardiovascular threshold flagged."
              time="12m ago"
            />
            <AlertItem
              title="Clinician Burnout Detection"
              message="Staff Cognitive Load Limit Reached (Dr. Smith: 13hrs). Recommendation: Mandatory shift handover."
              time="15 min ago"
              type="critical"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Microbiome Forecasting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Wind className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Dysbiosis Risk Prediction</p>
                <p className="text-xs text-slate-400 mt-1">
                  Regression model forecasting 72h stability based on current dietary fiber (22g).
                </p>
              </div>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">Stable</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Federated Learning Site Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Multi-Institutional Sync</p>
                <p className="text-xs text-slate-400 mt-1">
                  Hospital A, B, and C nodes contributing masked weights to global model.
                </p>
              </div>
              <Badge className="bg-emerald-500 text-slate-950">Active Round</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, trend, trendType, icon: Icon, color }: any) {
  return (
    <Card className="bg-slate-900/40 border-slate-800 hover:border-emerald-500/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 rounded-lg bg-slate-800", color)}>
            <Icon size={20} />
          </div>
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            trendType === "positive" ? "bg-emerald-500/10 text-emerald-400" :
              trendType === "neutral" ? "bg-blue-500/10 text-blue-400" :
                "bg-rose-500/10 text-rose-400"
          )}>
            {trend}
          </span>
        </div>
        <div>
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
            <span className="text-xs text-slate-500 font-medium">{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ type, title, message, time }: any) {
  const colors = {
    critical: "bg-rose-500 text-rose-500",
    warning: "bg-amber-500 text-amber-500",
    info: "bg-blue-500 text-blue-500",
  };

  return (
    <div className="flex gap-4 group">
      <div className={cn("w-1 self-stretch rounded-full", colors[type as keyof typeof colors].split(' ')[0])} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className={cn("text-xs font-bold uppercase tracking-wider", colors[type as keyof typeof colors].split(' ')[1])}>
            {type}
          </p>
          <span className="text-[10px] text-slate-600 font-medium">{time}</span>
        </div>
        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
