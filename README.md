# [Project Name]

> [One-line description of what this app does.]

## Contents

- [About This Template](#about-this-template)
- [The Natural Flow — Discovery to Delivery](#the-natural-flow--discovery-to-delivery)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [How We Build](#how-we-build)
- [Reporting Bugs & Requesting Features](#reporting-bugs--requesting-features)
- [Docs Index](#docs-index)

---

## About This Template

This is a **project starter template** for small teams building apps with AI agents (Cursor, Codex, Copilot). You can use this template with **any tech stack** — frontend, backend, and tooling are up to you; the structure and workflow stay the same. It provides the folder structure, docs, workflows, and prompts you need so the AI agent has full context from day one — no setup guesswork.

**What's included:**

| Folder / File | Purpose |
|---------------|---------|
| `docs/discovery/` | Problem statement, personas, prioritization, epics, stories — the creative thinking that shapes what to build |
| `docs/` | PRD, data model, tech stack & decisions, feature specs, testing strategy — the agent reads these before building |
| `.cursor/rules/` | Agent instructions auto-loaded on every prompt — conventions, stack, what to do and not do |
| `.github/workflows/` | CI pipeline (lint + typecheck + test on every PR) and auto-triage for new issues |
| `.github/ISSUE_TEMPLATE/` | Structured templates for bug reports, feature requests, and UX issues |
| `src/` | App source code — screens, components, services, hooks, utils, assets |
| `cli/` | CLI tool for testing backend logic before building UI |
| `SDLC_PROCESS.md` | Full SDLC process — phases, prompting workflow, feedback loop, CI/CD, build methodology |

**From idea to product:**

1. Copy this template to a new repo
2. Start with discovery — fill in `docs/discovery/problem-statement.md`, then `personas.md`, then `prioritization.md`
3. Break features into epics (`docs/discovery/epics/`) and stories (`docs/discovery/stories/`)
4. Synthesize discovery into a PRD → `docs/prd.md` and tech stack → `docs/tech-stack-decisions.md`
5. For each feature, agent writes a spec to `docs/[feature-name].md`
6. Agent builds from the spec — engine first, then UI

Every step has a ready-to-use prompt. See `SDLC_PROCESS.md` → **Prompting Workflow** for the full list, starting from discovery through to shipping.

---

## The Natural Flow — Discovery to Delivery

This template has two layers: **Discovery** (the creative thinking) and **Execution** (the building). Discovery produces the inputs that the execution phase consumes.

```
DISCOVERY (docs/discovery/)                    EXECUTION (docs/ → src/)
───────────────────────────                    ────────────────────────
1. Problem Statement                           
   What pain are we solving?                   
        ↓                                      
2. Personas                                    
   Who has this problem?                       
        ↓                                      
3. Prioritization (MoSCoW)              ──→    PRD (docs/prd.md)
   What's MVP vs. later?                       What we're building and why
        ↓                                              ↓
4. Epics                                ──→    Tech Stack & Decisions (docs/tech-stack-decisions.md)
   Major feature areas                         Stack choices + architecture decisions
        ↓                                              ↓
5. User Stories                         ──→    Data Model (docs/data-model.md)
   Detailed requirements per epic              Tables, fields, relationships
                                                       ↓
                                               Feature Specs (docs/[feature].md)
                                               One spec per feature — the agent's build instructions
                                                       ↓
                                               Engine → CLI → UI → Ship
```

**Where to start:** `docs/discovery/problem-statement.md` — everything flows from there.

**Where specs live:** Discovery thinking lives in `docs/discovery/`. The PRD, data model, tech stack decisions, and feature specs that the AI agent builds from live in `docs/`.

---

## Quick Start

### Setup
```bash
# Clone the repo
git clone [repo-url]
cd [project-name]

```

---

## Project Structure

```
.cursor/rules/                → Agent instructions (auto-loaded by Cursor)
docs/
  ├── discovery/              → Creative thinking & product planning
  │   ├── problem-statement.md    → What pain we're solving and why
  │   ├── personas.md             → Who the users are, goals, frustrations
  │   ├── prioritization.md       → MoSCoW priorities + MVP definition
  │   ├── epics/                  → One file per major feature area
  │   │   └── epic-template.md
  │   └── stories/                → User stories broken down per epic
  │       └── [epic-name]/
  │           └── story-template.md
  ├── prd.md                  → What we're building and why (synthesized from discovery)
  ├── data-model.md           → Database tables, fields, relationships
  ├── tech-stack-decisions.md → Stack choices + architecture decision log
  ├── feature-spec-template.md → Template for new feature specs
  ├── testing-strategy.md     → How we test
  └── [feature].md            → One spec per feature
cli/                          → CLI tool for testing backend logic
src/
  ├── screens/                → One file per screen
  ├── components/             → Reusable UI pieces
  ├── services/               → API calls (backend client wrapper)
  ├── hooks/                  → Custom React hooks
  ├── navigation/             → Navigation setup
  ├── utils/                  → Helpers, constants, types
  └── assets/                 → Images, fonts
SDLC_PROCESS.md               → Team process and workflow
```

---

## How We Build

1. **Discover** — Define the problem, users, and priorities in `docs/discovery/`
2. **Spec** — Synthesize discovery into PRD, data model, and tech stack decisions in `docs/`
3. **Plan** — Write a feature spec in `docs/[feature-name].md` for each feature
4. **Engine first** — Build the backend logic + CLI command
5. **Test** — Verify via CLI before touching UI
6. **Build UI** — Wire screens to the tested engine
7. **Ship** — Test on device, merge, release

See `SDLC_PROCESS.md` for the full process (Phase 0 through Phase 5).
See `docs/testing-strategy.md` for how we test.

---

## Building Process

1. Start with discovery — fill in `docs/discovery/` templates
2. Synthesize into PRD (`docs/prd.md`) and tech stack (`docs/tech-stack-decisions.md`)
3. Branch off `main` (`feature/[name]` or `fix/[name]`)
4. Write or update the feature spec in `docs/`
5. Build engine + CLI first, then UI
6. Open a PR, get a review, merge
7. Keep branches short — 1-3 days max

## Reporting Bugs & Requesting Features

Use GitHub Issues — templates are provided:

- **Bug Report** — something is broken or crashing
- **Feature Request** — new capability or improvement
- **UX Issue** — works but feels wrong or confusing

See `SDLC_PROCESS.md` → Feedback Loop for how issues get triaged and fixed.

---

## Docs Index

### Discovery (start here)

| Document | Path | Purpose |
|----------|------|---------|
| Problem Statement | `docs/discovery/problem-statement.md` | What pain we're solving and why |
| Personas | `docs/discovery/personas.md` | Who the users are + roles/permissions |
| Prioritization | `docs/discovery/prioritization.md` | MoSCoW priorities + MVP definition |
| Epic Template | `docs/discovery/epics/epic-template.md` | Template for major feature areas |
| Story Template | `docs/discovery/stories/epic-name/story-template.md` | Template for user stories |

### Execution (build from here)

| Document | Path | Purpose |
|----------|------|---------|
| Product Brief | `docs/prd.md` | What we're building and why |
| Data Model | `docs/data-model.md` | Tables, fields, relationships |
| Tech Stack & Decisions | `docs/tech-stack-decisions.md` | Stack choices + architecture decision log |
| Feature Spec Template | `docs/feature-spec-template.md` | Template for new features |
| Testing Strategy | `docs/testing-strategy.md` | How and what we test |
| SDLC Process | `SDLC_PROCESS.md` | Team workflow and process |
| Agent Instructions | `.cursor/rules/project.mdc` | AI agent configuration |
