export type AlertSeverity = "critical" | "high" | "medium" | "low";

export interface Alert {
  id: string;
  timestamp: string; // ISO
  severity: AlertSeverity;
  contract: string;
  message: string;
  txHash?: string;
}

export interface RiskScore {
  contract: string;
  score: number; // 0–100
  trend: "up" | "down" | "stable";
  history: { t: string; v: number }[]; // last N data points
}

export interface FailedTransaction {
  id: string;
  timestamp: string;
  txHash: string;
  contract: string;
  errorCode: string;
  ledger: number;
}

export interface WhaleTransfer {
  id: string;
  timestamp: string;
  from: string;
  to: string;
  amount: number; // in XLM
  asset: string;
  txHash: string;
}

export interface MonitoredContract {
  address: string;
  label: string;
  status: "ok" | "warning" | "critical" | "unknown";
  lastChecked: string;
  invocations24h: number;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
