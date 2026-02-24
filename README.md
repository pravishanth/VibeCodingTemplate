# [Project Name]

> [One-line description of what this app does.]

## Contents

- [About This Template](#about-this-template)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [How We Build](#how-we-build)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Reporting Bugs & Requesting Features](#reporting-bugs--requesting-features)
- [Docs Index](#docs-index)

---

## About This Template

This is a **project starter template** for small teams building apps with AI agents (Cursor, Codex, Copilot). It provides the folder structure, docs, workflows, and prompts you need so the AI agent has full context from day one — no setup guesswork.

**What's included:**

| Folder / File | Purpose |
|---------------|---------|
| `docs/` | Product brief, data model, architecture decisions, feature specs, testing strategy — the agent reads these before building |
| `.cursor/rules/` | Agent instructions auto-loaded on every prompt — conventions, stack, what to do and not do |
| `.github/workflows/` | CI pipeline (lint + typecheck + test on every PR) and auto-triage for new issues |
| `.github/ISSUE_TEMPLATE/` | Structured templates for bug reports, feature requests, and UX issues |
| `src/` | App source code — screens, components, services, hooks, utils, assets |
| `cli/` | CLI tool for testing backend logic before building UI |
| `SDLC_PROCESS.md` | Full SDLC process — phases, prompting workflow, feedback loop, CI/CD, build methodology |

**From idea to product:**

1. Copy this template to a new repo
2. Start a conversation with the AI agent — discuss your idea, users, and problem
3. Agent drafts the PRD, data model, and architecture decisions into `docs/`
4. Fill in `.cursor/rules/project.mdc` with your tech stack and conventions
5. For each feature, agent writes a spec to `docs/[feature-name].md`
6. Agent builds from the spec — engine first, then UI

Every step has a ready-to-use prompt. See `SDLC_PROCESS.md` → **Prompting Workflow** for the full list, starting from ideation through to shipping.

---

## Quick Start

### Prerequisites
- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Supabase account](https://supabase.com) (or your backend of choice)
- iOS Simulator (Xcode) and/or Android Emulator (Android Studio)

### Setup
```bash
# Clone the repo
git clone [repo-url]
cd [project-name]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase URL, anon key, etc.

# Start the app
npx expo start
```

### CLI Tool
```bash
# Install CLI dependencies
cd cli/
npm install

# Run a command
node cli/index.js [command] --[flag] [value]
```

---

## Project Structure

```
.cursor/rules/          → Agent instructions (auto-loaded by Cursor)
docs/                   → Product brief, data model, feature specs
  ├── prd.md            → What we're building and why
  ├── data-model.md     → Database tables, fields, relationships
  ├── testing-strategy.md → How we test
  └── [feature].md      → One spec per feature
cli/                    → CLI tool for testing backend logic
src/
  ├── screens/          → One file per screen
  ├── components/       → Reusable UI pieces
  ├── services/         → API calls (backend client wrapper)
  ├── hooks/            → Custom React hooks
  ├── navigation/       → Navigation setup
  ├── utils/            → Helpers, constants, types
  └── assets/           → Images, fonts
SDLC_PROCESS.md         → Team process and workflow
```

---

## How We Build

1. **Define** — Write a feature spec in `docs/[feature-name].md`
2. **Engine first** — Build the backend logic + CLI command
3. **Test** — Verify via CLI before touching UI
4. **Build UI** — Wire screens to the tested engine
5. **Ship** — Test on device, merge, release

See `SDLC_PROCESS.md` for the full process.
See `docs/testing-strategy.md` for how we test.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| **App** | [e.g., React Native + Expo] |
| **Backend** | [e.g., Supabase] |
| **Database** | [e.g., PostgreSQL + PostGIS] |
| **Auth** | [e.g., Supabase Auth] |
| **Maps** | [e.g., React Native Maps / Mapbox] |
| **Testing** | [e.g., Jest, Maestro] |
| **IDE** | Cursor |

---

## Environment Variables

Create a `.env` file in the root:

```
SUPABASE_URL=[your-supabase-url]
SUPABASE_ANON_KEY=[your-anon-key]
# Add other keys as needed
```

> Do NOT commit `.env` to git. It's in `.gitignore`.

---

## Scripts

```bash
npm start          # Start Expo dev server
npm test           # Run unit tests
npm run lint       # Run linter
./scripts/test-cli.sh   # Run CLI/API tests
```

---

## Deployment

### Backend
- [e.g., Supabase handles hosting — push schema changes via Supabase CLI]

### Mobile App
- **iOS:** [e.g., TestFlight → App Store]
- **Android:** [e.g., Internal testing track → Play Store]

```bash
# Build for production
npx expo build:ios
npx expo build:android
```

---

## Contributing

1. Branch off `main` (`feature/[name]` or `fix/[name]`)
2. Write or update the feature spec in `docs/`
3. Build engine + CLI first, then UI
4. Open a PR, get a review, merge
5. Keep branches short — 1-3 days max

## Reporting Bugs & Requesting Features

Use GitHub Issues — templates are provided:

- **Bug Report** — something is broken or crashing
- **Feature Request** — new capability or improvement
- **UX Issue** — works but feels wrong or confusing

See `SDLC_PROCESS.md` → Feedback Loop for how issues get triaged and fixed.

---

## Docs Index

| Document | Path | Purpose |
|----------|------|---------|
| Product Brief | `docs/prd.md` | What we're building and why |
| Data Model | `docs/data-model.md` | Tables, fields, relationships |
| Architecture Decisions | `docs/decisions.md` | Why we chose X over Y |
| Feature Spec Template | `docs/feature-spec-template.md` | Template for new features |
| Testing Strategy | `docs/testing-strategy.md` | How and what we test |
| SDLC Process | `SDLC_PROCESS.md` | Team workflow and process |
| Agent Instructions | `.cursor/rules/project.mdc` | AI agent configuration |
