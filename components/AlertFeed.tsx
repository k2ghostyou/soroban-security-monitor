"use client";

import { usePolling } from "@/hooks/usePolling";
import { MOCK_ALERTS } from "@/lib/mockData";
import type { Alert, AlertSeverity } from "@/lib/types";
import WidgetShell from "./WidgetShell";
import { relativeTime } from "@/lib/utils";

// TODO: Replace with real API fetch, e.g. GET /api/alerts
async function fetchAlerts(): Promise<Alert[]> {
  return MOCK_ALERTS;
}

const SEVERITY_STYLES: Record<AlertSeverity, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-gray-100 text-gray-600",
};

export default function AlertFeed() {
  const { data, loading, error, refresh } = usePolling(fetchAlerts, 15_000);

  return (
    <WidgetShell
      title="Alert Feed"
      onRefresh={refresh}
      loading={loading}
      error={error}
      empty={!data?.length}
    >
      <ul className="space-y-2">
        {data?.map((alert) => (
          <li key={alert.id} className="flex gap-3 items-start text-sm">
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium uppercase ${SEVERITY_STYLES[alert.severity]}`}
            >
              {alert.severity}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 truncate">{alert.message}</p>
              <p className="text-gray-400 text-xs">
                {alert.contract} · {relativeTime(alert.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}
