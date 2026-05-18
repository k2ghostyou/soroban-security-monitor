"use client";

import { usePolling } from "@/hooks/usePolling";
import { MOCK_WHALE_TRANSFERS } from "@/lib/mockData";
import type { WhaleTransfer } from "@/lib/types";
import WidgetShell from "./WidgetShell";
import { relativeTime } from "@/lib/utils";

// TODO: Replace with real API fetch, e.g. GET /api/whale-transfers?minAmount=1000000
async function fetchWhaleTransfers(): Promise<WhaleTransfer[]> {
  return MOCK_WHALE_TRANSFERS;
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export default function WhaleTransferNotifications() {
  const { data, loading, error, refresh } = usePolling(fetchWhaleTransfers, 20_000);

  return (
    <WidgetShell
      title="Whale Transfers"
      onRefresh={refresh}
      loading={loading}
      error={error}
      empty={!data?.length}
    >
      <ul className="space-y-2">
        {data?.map((tx) => (
          <li
            key={tx.id}
            className="rounded border border-gray-100 p-2 text-xs flex items-start gap-2"
          >
            <span className="text-lg leading-none mt-0.5" aria-hidden>🐋</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-mono text-gray-600">{shortAddr(tx.from)}</span>
                <span className="text-gray-400">→</span>
                <span className="font-mono text-gray-600">{shortAddr(tx.to)}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-semibold text-gray-800">
                  {tx.amount.toLocaleString()} {tx.asset}
                </span>
                <span className="text-gray-400">{relativeTime(tx.timestamp)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}
