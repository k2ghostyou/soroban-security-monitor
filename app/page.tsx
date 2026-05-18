import AlertFeed from "@/components/AlertFeed";
import RiskScoreCards from "@/components/RiskScoreCards";
import FailedTransactionsTable from "@/components/FailedTransactionsTable";
import WhaleTransferNotifications from "@/components/WhaleTransferNotifications";
import ContractMonitoringPanel from "@/components/ContractMonitoringPanel";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Soroban Security Monitor</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {/* TODO: Show connected network (mainnet / testnet) from config */}
            Monitoring Soroban smart contracts · data refreshes automatically
          </p>
        </div>
        {/* TODO: Add network selector and global pause/resume for polling */}
      </header>

      {/* Top row: alerts + risk scores + whale transfers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AlertFeed />
        <RiskScoreCards />
        <WhaleTransferNotifications />
      </div>

      {/* Bottom row: failed txs + contract panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FailedTransactionsTable />
        <ContractMonitoringPanel />
      </div>
    </div>
  );
}
