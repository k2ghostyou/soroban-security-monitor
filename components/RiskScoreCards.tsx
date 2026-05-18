"use client";

import { usePolling } from "@/hooks/usePolling";
import { MOCK_RISK_SCORES } from "@/lib/mockData";
import type { RiskScore } from "@/lib/types";
import WidgetShell from "./WidgetShell";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

// TODO: Replace with real API fetch, e.g. GET /api/risk-scores
async function fetchRiskScores(): Promise<RiskScore[]> {
  return MOCK_RISK_SCORES;
}

function scoreColor(score: number) {
  if (score >= 75) return "text-red-600";
  if (score >= 50) return "text-orange-500";
  if (score >= 25) return "text-yellow-500";
  return "text-green-600";
}

function TrendIcon({ trend }: { trend: RiskScore["trend"] }) {
  if (trend === "up") return <span className="text-red-500 text-xs">▲</span>;
  if (trend === "down") return <span className="text-green-500 text-xs">▼</span>;
  return <span className="text-gray-400 text-xs">—</span>;
}

export default function RiskScoreCards() {
  const { data, loading, error, refresh } = usePolling(fetchRiskScores, 30_000);

  return (
    <WidgetShell
      title="Risk Scores"
      onRefresh={refresh}
      loading={loading}
      error={error}
      empty={!data?.length}
    >
      <div className="space-y-3">
        {data?.map((item) => (
          <div
            key={item.contract}
            className="flex items-center gap-3 rounded border border-gray-100 p-2"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 truncate">{item.contract}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-xl font-bold ${scoreColor(item.score)}`}>
                  {item.score}
                </span>
                <TrendIcon trend={item.trend} />
              </div>
            </div>
            <div className="w-24 h-10 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.history}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={item.score >= 75 ? "#ef4444" : item.score >= 50 ? "#f97316" : "#22c55e"}
                    dot={false}
                    strokeWidth={1.5}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 10, padding: "2px 6px" }}
                    formatter={(v: number) => [v, "score"]}
                    labelFormatter={() => ""}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}
