
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: { labels: { color: "#fff" } },
    title: { display: true, text: title, color: "#fff" }
  },
  scales: {
    x: { ticks: { color: "#fff" }, grid: { color: "#555" } },
    y: { ticks: { color: "#fff" }, grid: { color: "#555" } }
  }
});

const chartData = {
  labels: ["Well A", "Well B", "Well C"],
  dsre: [86.5, 79.3, 80.4],
  dilution: [1.33, 1.13, 1.17],
  mudBuild: [200, 300, 250],
  reserve: [180, 280, 220],
  sce: [2042, 1438, 1755],
  dilutionTotal: [4393, 2353, 2492],
  dilutionRatio: [3.0, 1.53, 2.16],
  discardRatio: [2.29, 1.53, 1.92]
};

export default function DrillingDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <header className="text-2xl font-bold text-center mb-4">
        <i className="fas fa-oil-can"></i> Custom Drilling Dashboard
      </header>
      <nav className="flex justify-around mb-6">
        {["Dashboard", "Statistical Analysis", "Cost & Performance"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setTab(idx)}
            className={`px-4 py-2 rounded ${tab === idx ? "bg-gray-700" : "bg-gray-800"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      {tab === 0 && (
        <div className="space-y-8">
          <Bar data={{
            labels: chartData.labels,
            datasets: [{
              label: "DSRE%",
              data: chartData.dsre,
              backgroundColor: "rgba(0, 188, 212, 0.7)"
            }]
          }} options={chartOptions("DSRE% by Well")} />

          <Line data={{
            labels: chartData.labels,
            datasets: [{
              label: "Dilution Ratio",
              data: chartData.dilution,
              borderColor: "rgba(255, 193, 7, 0.7)",
              fill: false
            }]
          }} options={chartOptions("Dilution Ratio")} />

          <Bar data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "Mud Build",
                data: chartData.mudBuild,
                backgroundColor: "rgba(255, 193, 7, 0.7)"
              },
              {
                label: "Reserve",
                data: chartData.reserve,
                backgroundColor: "rgba(103, 58, 183, 0.7)"
              }
            ]
          }} options={chartOptions("Mud Build vs Reserve")} />

          <Bar data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "Total SCE",
                data: chartData.sce,
                backgroundColor: "rgba(255, 87, 34, 0.7)"
              },
              {
                label: "Total Dilution",
                data: chartData.dilutionTotal,
                backgroundColor: "rgba(33, 150, 243, 0.7)"
              }
            ]
          }} options={chartOptions("Total SCE vs Dilution")} />

          <Line data={{
            labels: chartData.labels,
            datasets: [{
              label: "Dilution per Hole Volume Ratio",
              data: chartData.dilutionRatio,
              borderColor: "rgba(0, 150, 136, 0.7)",
              fill: false
            }]
          }} options={chartOptions("Dilution per Hole Volume Ratio")} />

          <Pie data={{
            labels: chartData.labels,
            datasets: [{
              label: "Discard Ratio",
              data: chartData.discardRatio,
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"]
            }]
          }} options={chartOptions("Discard Ratio by Well")} />
        </div>
      )}
      {tab === 1 && <p className="text-center">Statistical Analysis content here...</p>}
      {tab === 2 && <p className="text-center">Cost & Performance content here...</p>}
    </div>
  );
}
