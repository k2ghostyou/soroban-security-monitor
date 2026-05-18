// TODO: Replace all mock data with real API calls to your Soroban indexer / horizon endpoint

import type {
  Alert,
  RiskScore,
  FailedTransaction,
  WhaleTransfer,
  MonitoredContract,
} from "./types";

export const MOCK_ALERTS: Alert[] = [
  {
    id: "a1",
    timestamp: new Date(Date.now() - 60_000).toISOString(),
    severity: "critical",
    contract: "CAABC...1234",
    message: "Reentrancy pattern detected in invoke_contract",
    txHash: "abc123",
  },
  {
    id: "a2",
    timestamp: new Date(Date.now() - 300_000).toISOString(),
    severity: "high",
    contract: "CBBDE...5678",
    message: "Unusual authorization bypass attempt",
    txHash: "def456",
  },
  {
    id: "a3",
    timestamp: new Date(Date.now() - 900_000).toISOString(),
    severity: "medium",
    contract: "CCCEF...9012",
    message: "Storage write spike: 3x above baseline",
  },
  {
    id: "a4",
    timestamp: new Date(Date.now() - 1_800_000).toISOString(),
    severity: "low",
    contract: "CDDFA...3456",
    message: "New invocation pattern from unknown account",
  },
];

const makeHistory = (base: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    t: new Date(Date.now() - (9 - i) * 3_600_000).toISOString(),
    v: Math.max(0, Math.min(100, base + Math.round((Math.random() - 0.5) * 20))),
  }));

export const MOCK_RISK_SCORES: RiskScore[] = [
  { contract: "CAABC...1234", score: 87, trend: "up", history: makeHistory(80) },
  { contract: "CBBDE...5678", score: 54, trend: "stable", history: makeHistory(55) },
  { contract: "CCCEF...9012", score: 31, trend: "down", history: makeHistory(40) },
];

export const MOCK_FAILED_TXS: FailedTransaction[] = [
  {
    id: "f1",
    timestamp: new Date(Date.now() - 120_000).toISOString(),
    txHash: "tx_aaa111",
    contract: "CAABC...1234",
    errorCode: "wasm_vm_error",
    ledger: 5_432_100,
  },
  {
    id: "f2",
    timestamp: new Date(Date.now() - 600_000).toISOString(),
    txHash: "tx_bbb222",
    contract: "CBBDE...5678",
    errorCode: "auth_failed",
    ledger: 5_432_050,
  },
  {
    id: "f3",
    timestamp: new Date(Date.now() - 1_200_000).toISOString(),
    txHash: "tx_ccc333",
    contract: "CCCEF...9012",
    errorCode: "insufficient_fee",
    ledger: 5_431_990,
  },
];

export const MOCK_WHALE_TRANSFERS: WhaleTransfer[] = [
  {
    id: "w1",
    timestamp: new Date(Date.now() - 180_000).toISOString(),
    from: "GABC...0001",
    to: "GXYZ...9999",
    amount: 2_500_000,
    asset: "XLM",
    txHash: "wh_aaa",
  },
  {
    id: "w2",
    timestamp: new Date(Date.now() - 720_000).toISOString(),
    from: "GDEF...0002",
    to: "GUVW...8888",
    amount: 1_100_000,
    asset: "USDC",
    txHash: "wh_bbb",
  },
];

export const MOCK_CONTRACTS: MonitoredContract[] = [
  {
    address: "CAABC...1234",
    label: "DEX Router",
    status: "critical",
    lastChecked: new Date(Date.now() - 30_000).toISOString(),
    invocations24h: 14_320,
  },
  {
    address: "CBBDE...5678",
    label: "Lending Pool",
    status: "warning",
    lastChecked: new Date(Date.now() - 60_000).toISOString(),
    invocations24h: 8_901,
  },
  {
    address: "CCCEF...9012",
    label: "Staking Vault",
    status: "ok",
    lastChecked: new Date(Date.now() - 90_000).toISOString(),
    invocations24h: 3_210,
  },
  {
    address: "CDDFA...3456",
    label: "Oracle Feed",
    status: "unknown",
    lastChecked: new Date(Date.now() - 600_000).toISOString(),
    invocations24h: 0,
  },
];
