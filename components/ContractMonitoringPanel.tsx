"use client";

import { usePolling } from "@/hooks/usePolling";
import { MOCK_CONTRACTS } from "@/lib/mockData";
import type { MonitoredContract } from "@/lib/types";
import WidgetShell from "./WidgetShell";
import { relativeTime } from "@/lib/utils";

// TODO: Replace with real API fetch, e.g. GET /api/contracts
async function fetchContracts(): Promise<MonitoredContract[]> {
  return MOCK_CONTRACTS;
}

const STATUS_STYLES: Record<MonitoredContract["status"], string> = {
  ok: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
  unknown: "bg-gray-100 text-gray-500",
};

export default function ContractMonitoringPanel() {
  const { data, loading, error, refresh } = usePolling(fetchContracts, 30_000);

  return (
    <WidgetShell
      title="Contract Monitoring"
      onRefresh={refresh}
      loading={loading}
      error={error}
      empty={!data?.length}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100">
              <th className="pb-1 pr-3 font-medium">Contract</th>
              <th className="pb-1 pr-3 font-medium">Status</th>
              <th className="pb-1 pr-3 font-medium">24h Invocations</th>
              <th className="pb-1 font-medium">Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((c) => (
              <tr key={c.address} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-1.5 pr-3">
                  <p className="font-medium text-gray-800">{c.label}</p>
                  <p className="font-mono text-gray-400 truncate max-w-[120px]">{c.address}</p>
                </td>
                <td className="py-1.5 pr-3">
                  <span className={`rounded px-1.5 py-0.5 font-medium uppercase ${STATUS_STYLES[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-1.5 pr-3 text-gray-600">
                  {c.invocations24h.toLocaleString()}
                </td>
                <td className="py-1.5 text-gray-400">{relativeTime(c.lastChecked)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetShell>
  );
}
