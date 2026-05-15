# Contributing to EduToken

Thank you for your interest in contributing to EduToken! This guide will help you get started.

## Table of Contents

- [Project Setup](#project-setup)
- [Coding Standards](#coding-standards)
- [Branch Naming](#branch-naming)
- [PR Process](#pr-process)
- [Issue Labeling](#issue-labeling)
- [Claiming a Bounty](#claiming-a-bounty)

## Project Setup

1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/EduToken-.git
   cd EduToken-
   ```
3. **Install dependencies**:
   ```bash
   # Frontend
   cd frontend && npm install
   
   # Smart contracts
   cargo build
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Coding Standards

- Follow consistent indentation (2 spaces for JS/TS, 4 spaces for Rust)
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features
- Keep functions small and focused
- Run `cargo fmt` and `cargo clippy` for Rust code

## Branch Naming

Use descriptive branch names with prefixes:

- `feature/` — New features (e.g., `feature/add-staking-module`)
- `fix/` — Bug fixes (e.g., `fix/reward-calculation-error`)
- `docs/` — Documentation changes (e.g., `docs/update-api-reference`)
- `refactor/` — Code refactoring (e.g., `refactor/token-utils`)
- `test/` — Test additions or updates

## PR Process

1. Ensure your code compiles and all tests pass
2. Update documentation if needed
3. Write a clear PR description explaining:
   - What changes were made
   - Why they were made
   - How to test them
4. Link related issues (e.g., `Fixes #123`)
5. Request a review from a maintainer
6. Address review feedback promptly

### PR Checklist

- [ ] Code compiles without errors
- [ ] Tests pass
- [ ] Documentation updated (if applicable)
- [ ] No unrelated changes included
- [ ] Branch is up to date with main

## Issue Labeling

| Label | Meaning |
|-------|---------|
| `bug` | Something isn't working |
| `feature` | New feature request |
| `enhancement` | Improvement to existing feature |
| `documentation` | Documentation improvements |
| `good first issue` | Great for newcomers |
| `help wanted` | Extra attention needed |
| `security` | Security-related issue |
| `community` | Community-related task |
| `high` / `medium` / `low` | Priority level |

## Claiming a Bounty

Some issues are marked with a bounty reward. To claim:

1. **Find a bounty issue** — Look for issues with the `bounty` label or bounty amount in the title
2. **Comment on the issue** — Express your interest and briefly describe your approach
3. **Wait for assignment** — A maintainer will assign the issue to you
4. **Implement the fix** — Follow the PR process above
5. **Submit your PR** — Reference the bounty issue in your PR description
6. **Get reviewed and merged** — Once merged, the bounty will be processed

### Bounty Guidelines

- Only one contributor per bounty issue (first to submit a valid PR)
- PRs must be quality work — no placeholder or incomplete submissions
- Bounties are paid after the PR is merged
- If you can't complete a bounty, comment on the issue so others can take it

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing to EduToken! 🚀