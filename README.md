<!--
  README: reorganized for clarity and developer friendliness.
  - Added badges and table of contents
  - Added Quick Start, Development, and Contribution sections
  - Kept the project's vision and technical overview concise
-->

# EduToken

![License: MIT](https://img.shields.io/badge/license-MIT-green)
![Stellar](https://img.shields.io/badge/blockchain-Stellar-blue)

EduToken is an open-source protocol on the Stellar Network that brings transparency, stability, and automation to school fees and scholarship disbursement.

Table of Contents
- [Vision](#vision)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

## Vision

Educational access suffers from opaque fund flows and currency volatility. EduToken provides a transparent "trust layer" for donors, schools, and parents by combining Soroban smart contracts, stablecoins, and on-chain credentialing.

- For donors: on-chain proof and traceability of funds.
- For schools: automated invoicing and reduced admin overhead.
- For parents: stable-value payments and digital receipts.

## Key Features

- Transparent scholarship pools with conditional releases (Proof of Enrollment).
- Stablecoin support (USDC, PYUSD) to protect value.
- On-chain, non-transferable enrollment receipts issued via Stellar.
- Decentralized invoice dashboard for schools to bill parent wallets.

## Tech Stack

- Smart Contracts: Soroban (Rust)
- Frontend: Next.js (TypeScript) + Tailwind CSS
- Backend / Indexing: Go
- Blockchain: Stellar Network
- Wallets: Freighter, Albedo

## Architecture

1. EduVault (Soroban): escrow for scholarship and fee funds.
2. Anchor Interface: integrations with Stellar Anchors for fiat on-/off-ramps.
3. Verification Engine: validates school credentials and triggers contract releases.

## Quick Start

These steps get you up and running locally with the minimal environment.

Prerequisites
- Git
- Node.js (18+), pnpm or npm
- Rust + cargo (for Soroban contracts)
- Soroban SDK/CLI (for building/deploying contracts)
- Go (for backend services)

Clone and install

```bash
git clone https://github.com/BigJohn-dev/EduToken-.git
cd EduToken-
# frontend
cd frontend && pnpm install
# contracts (Rust / Soroban)
cd ../contracts && cargo build
```

Local run (example)

```bash
# Start the frontend
cd frontend && pnpm dev

# Build contracts
cd ../contracts && cargo build
```

Notes: specific commands and scripts may be added as the monorepo matures.

## Development

- Branching: feature branches with descriptive names (feature/..., fix/...)
- Commit style: small, focused commits; reference issues where applicable
- Tests: add unit and integration tests for contracts and backend services

## Roadmap (high-level)

- Phase 1: Foundation — deploy basic Vault contract, MVP school invoice dashboard, wallet integrations
- Phase 2: Transparency — donor tracking dashboard, automated Proof of Enrollment minting
- Phase 3: Scale — integrate local anchors, mobile apps for parents

## Contributing

We welcome contributors across engineering, design, and documentation.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Describe your change"`
4. Push and open a PR

See CONTRIBUTING.md (when available) for detailed guidelines.

## License & Contact

Distributed under the MIT License — see the `LICENSE` file.

Project Lead: John Imeobong

GitHub: https://github.com/BigJohn-dev
Repository: https://github.com/BigJohn-dev/EduToken-

---

Built to improve educational access and transparency across regions.