# Contributing to EduToken

Thank you for your interest in contributing! EduToken is an open-source protocol — contributions across engineering, design, and documentation are all welcome.

## Getting Started

1. Fork the repository and clone it locally.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes (see guidelines below).
4. Commit with a clear message: `git commit -m "feat: describe your change"`
5. Push and open a Pull Request against `main`.

## Development Setup

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Soroban Smart Contracts (Rust)

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add wasm target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked soroban-cli

# Build the contract
cd contracts/eduvault
cargo build --release --target wasm32-unknown-unknown
```

## Code Guidelines

- **Frontend**: TypeScript strict mode; follow existing component patterns.
- **Contracts**: Keep functions minimal and well-documented; always `require_auth()` for mutations.
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) style (`feat:`, `fix:`, `docs:`, etc.).
- **Tests**: Add contract unit tests for any new entry points.

## Reporting Issues

Open an issue on GitHub with a clear description and reproduction steps.

## Code of Conduct

Be respectful and constructive. We're here to build something meaningful together.
