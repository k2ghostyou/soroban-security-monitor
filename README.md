# Soroban Security Monitor

A real-time frontend dashboard for monitoring the security of Soroban smart contracts on the Stellar blockchain.

## The Problem

Soroban smart contracts handle real value — token swaps, lending pools, staking vaults. When something goes wrong (a reentrancy attack, an authorization bypass, an unusual spike in failed transactions), operators need to know immediately. Without a dedicated monitoring view, you're flying blind: logs are scattered, on-chain data requires manual querying, and there's no single place to see the health of your contracts at a glance.

## What This Solves

This dashboard gives you a live operational view of your Soroban contracts. It surfaces:

- **Security alerts** as they happen, ranked by severity
- **Risk scores** per contract, so you can see which contracts are trending toward danger
- **Failed transactions** with error codes and ledger numbers, so you can diagnose problems fast
- **Whale transfers** above a configurable threshold, flagging large movements that may indicate exploits or coordinated activity
- **Contract status** — invocation counts, health status, and last-checked timestamps for every monitored contract

All data refreshes automatically via polling. No page reloads needed.

## Stack

| Tool | Version | Role |
|---|---|---|
| Next.js | 16 (App Router) | Framework |
| TypeScript | 5 | Type safety |
| TailwindCSS | 4 | Styling |
| Recharts | 2 | Sparkline charts |

## Project Structure

```
app/
  layout.tsx              # Root layout, fonts, metadata
  page.tsx                # Dashboard — assembles all widgets
  globals.css             # TailwindCSS v4 import

components/
  WidgetShell.tsx         # Shared loading / error / empty state wrapper
  AlertFeed.tsx           # Live security alerts with severity badges
  RiskScoreCards.tsx      # Per-contract risk scores with sparkline history
  FailedTransactionsTable.tsx  # Failed txs with error codes and ledger numbers
  WhaleTransferNotifications.tsx  # Large transfer alerts above a threshold
  ContractMonitoringPanel.tsx  # Status and invocation stats per contract

hooks/
  usePolling.ts           # Generic polling hook — swap the fetcher for any API

lib/
  types.ts                # Shared TypeScript interfaces
  mockData.ts             # Stub data (replace with real API calls)
  utils.ts                # Shared utilities (relativeTime, etc.)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting Real Data

Every data-fetching function has a `// TODO:` comment pointing to the expected API endpoint. Search for `TODO:` across the codebase to find every integration point.

The pattern is the same in every widget:

```ts
// TODO: Replace with real API fetch, e.g. GET /api/alerts
async function fetchAlerts(): Promise<Alert[]> {
  return MOCK_ALERTS; // ← replace this line
}
```

Swap the mock return for a `fetch()` call to your Soroban indexer or Horizon endpoint, and the widget will start showing live data automatically.
