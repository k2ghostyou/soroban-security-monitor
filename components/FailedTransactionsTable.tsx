"use client";

import { usePolling } from "@/hooks/usePolling";
import { MOCK_FAILED_TXS } from "@/lib/mockData";
import type { FailedTransaction } from "@/lib/types";
import WidgetShell from "./WidgetShell";
import { relativeTime } from "@/lib/utils";

// TODO: Replace with real API fetch, e.g. GET /api/failed-transactions
async function fetchFailedTxs(): Promise<FailedTransaction[]> {
  return MOCK_FAILED_TXS;
}

function shortHash(hash: string) {
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

export default function FailedTransactionsTable() {
  const { data, loading, error, refresh } = usePolling(fetchFailedTxs, 20_000);

  return (
    <WidgetShell
      title="Failed Transactions"
      onRefresh={refresh}
      loading={loading}
      error={error}
      empty={!data?.length}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100">
              <th className="pb-1 pr-3 font-medium">Tx Hash</th>
              <th className="pb-1 pr-3 font-medium">Contract</th>
              <th className="pb-1 pr-3 font-medium">Error</th>
              <th className="pb-1 pr-3 font-medium">Ledger</th>
              <th className="pb-1 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-1.5 pr-3 font-mono text-blue-600">
                  {/* TODO: Link to Stellar Explorer when txHash is real */}
                  {shortHash(tx.txHash)}
                </td>
                <td className="py-1.5 pr-3 font-mono text-gray-600 truncate max-w-[100px]">
                  {tx.contract}
                </td>
                <td className="py-1.5 pr-3">
                  <span className="rounded bg-red-50 text-red-600 px-1.5 py-0.5">
                    {tx.errorCode}
                  </span>
                </td>
                <td className="py-1.5 pr-3 text-gray-500">{tx.ledger.toLocaleString()}</td>
                <td className="py-1.5 text-gray-400">{relativeTime(tx.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetShell>
  );
}
