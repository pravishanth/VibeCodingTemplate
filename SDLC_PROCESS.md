# SDLC Process — [Project Name]

A lightweight process for a small team building with AI agents.

## Contents

- [How We Build (5 Phases)](#how-we-build-5-phases)
- [Documents (5 Essential Docs)](#documents-5-essential-docs)
- [How We Work With AI Agents](#how-we-work-with-ai-agents)
- [CI/CD Pipeline](#cicd-pipeline-automated-on-every-pr)
- [Git Workflow](#git-workflow)
- [Weekly Rhythm](#weekly-rhythm)
- [Feedback Loop](#feedback-loop-bugs-user-feedback-improvements)
- [Build Methodology](#build-methodology)
- [Reference: 8090.ai Mapping](#reference-how-this-maps-to-8090ai-chamaths-software-factory)
- [Reference: Peter Steinberger's Best Practices](#reference-peter-steinbergers-best-practices)

---

## How We Build (5 Phases)

### Phase 1: Define & Design (1–2 weeks)

**Goal:** Know exactly what you're building before writing code.

- Write the **Product Brief** → `docs/prd.md`
- Define the **Data Model** → `docs/data-model.md`
- Sketch **Screen Flows** → Figma, Excalidraw, or paper
- Pick your **Tech Stack** and document in `README.md` and `.cursor/rules/project.mdc`

**Output:** Filled-in PRD, data model, wireframes.

### Phase 2: Build the Engine (2–4 weeks)

**Goal:** Get the backend working and testable before touching the UI.

- Build core business logic
- Expose it via a **CLI** for fast testing (see `HowToBuildCLI.md`)
- Set up the database
- Write API endpoints
- Automate tests against the CLI / API (see `docs/testing-strategy.md`)

**Output:** Working API, CLI tool, automated test suite.

### Phase 3: Build the App (3–6 weeks)

**Goal:** Wire the UI to the tested engine.

- Set up the project (Expo recommended for React Native)
- Build screens incrementally — one feature at a time
- For each feature:
  1. Write a **Feature Spec** → `docs/[feature-name].md` (use `docs/feature-spec-template.md`)
  2. Build engine + CLI command first
  3. Test via CLI
  4. Build the UI
  5. Update the feature spec with any changes
- Use **feature branches** — one branch per feature, merge via PR
- Test on device early and often

**Output:** Working app connected to real backend.

### Phase 4: Polish & Test (1–2 weeks)

**Goal:** Make it reliable and presentable.

- Fix bugs from real-device testing (iOS + Android)
- Add error handling, loading states, empty states
- Run E2E tests on core user flows
- Performance check
- Get 2–3 people to try it and collect feedback

**Output:** Stable build ready for release.

### Phase 5: Ship & Iterate

**Goal:** Get it into users' hands, then improve based on data.

- Deploy backend
- Submit to App Store / Play Store (or TestFlight / internal testing first)
- Set up crash reporting (Sentry or Bugsnag)
- Plan the next iteration based on user feedback

**Output:** Live app, feedback loop.

---

## Documents (5 Essential Docs)

| Document | Path | Purpose | When |
|----------|------|---------|------|
| **Product Brief** | `docs/prd.md` | What we're building and why | Phase 1 |
| **Data Model** | `docs/data-model.md` | Tables, fields, relationships | Phase 1 |
| **Screen Flows** | Figma / Excalidraw | How users move through the app | Phase 1 |
| **Feature Specs** | `docs/[feature].md` | Per-feature detail for the agent | Phase 2–3 |
| **README** | `README.md` | Setup, run, test, deploy | Phase 2 |

Supporting docs (already in the repo):
- Agent instructions: `.cursor/rules/project.mdc`
- Architecture decisions: `docs/decisions.md`
- Testing strategy: `docs/testing-strategy.md`
- CLI guide: `HowToBuildCLI.md`
- Build & test philosophy: `buildAndTestEngine.md`

---

## How We Work With AI Agents

### The Agent's Context Chain
```
.cursor/rules/project.mdc    ← Auto-loaded on every prompt (conventions, stack, rules)
        ↓
docs/prd.md                  ← Product context (what are we building)
        ↓
docs/decisions.md            ← Architecture decisions (why we chose X over Y)
        ↓
docs/data-model.md           ← Schema truth (what data exists)
        ↓
docs/[feature].md            ← Feature spec (what to build right now)
        ↓
CLI                          ← Verification loop (did it work?)
        ↓
Feedback → Update feature spec → Prompt agent again
```

### Prompting Workflow

#### Phase 1: Idea → Specs

**To explore an idea:**
> "I want to build [idea]. Help me think through: Who would use it? What problem does it solve? What are similar apps? What would the MVP look like?"

**To draft the PRD:**
> "Based on our discussion, write a product brief to `docs/prd.md` using the template. Include problem, target users, MVP features, and success metrics."

**To research and decide the tech stack:**
> "I'm building [type of app] with [constraints]. Research the best stack options. Compare trade-offs. Write your recommendations to `docs/decisions.md`."

**To design the data model:**
> "Read `docs/prd.md`. Design the database schema — tables, fields, relationships, indexes. Write to `docs/data-model.md`."

**To map out screen flows:**
> "Read `docs/prd.md`. List the screens needed and how users navigate between them. Describe each screen in 1-2 sentences."

#### Phase 2–3: Build

**To plan a feature:**
> "Read `docs/prd.md` and `docs/data-model.md`. I want to build [feature]. Write a feature spec to `docs/[feature-name].md`."

**To build the engine:**
> "Read `docs/[feature-name].md`. Build the backend logic and expose it as a CLI command: `[project-cli] [command] --[flag] [value]`. Test it."

**To build the UI:**
> "Read `docs/[feature-name].md`. Build the screen and components. Wire them to the API. Follow the conventions in `.cursor/rules/`."

**To test a feature:**
> "Read `docs/[feature-name].md` and `docs/testing-strategy.md`. Run all CLI tests. Generate edge case tests from the acceptance criteria and edge cases sections. Run them. Report pass/fail for each."

**To review before merging (code quality + refactoring + security):**
> "Review the changes in this branch against the conventions in `.cursor/rules/project.mdc`. Check for:
> - **Quality:** missing error handling, missing loading/empty states, direct backend calls from screens, unused imports, raw `console.log` (use logger instead), anything that contradicts the feature spec
> - **Refactoring:** duplicated logic that should be extracted, files over 300 lines that should be split, unclear naming, tightly coupled code that should be decoupled
> - **Security:** hardcoded secrets or API keys, SQL injection risks, user data exposed in API responses, missing RLS policies, missing input validation, unverified auth checks
>
> Report findings grouped by category. Fix quality and refactoring issues. Flag security issues for human review."

**To fix a bug:**
> "Read `docs/[feature-name].md`. Bug #[number] is in Edge Cases — fix it, write a regression test, and update the spec."

**To refactor:**
> "Read the code in `src/[area]/`. Refactor for clarity: extract shared logic, remove duplication, simplify. Don't change behavior. Run all tests after to confirm nothing broke."

**To update docs after building:**
> "Update `docs/[feature-name].md` with any changes made during implementation."

---

## CI/CD Pipeline (Automated on Every PR)

Tests and checks run automatically when code is pushed. Nothing merges without passing.

### What Runs on Every PR

```
Developer pushes to branch / opens PR
        ↓
GitHub Actions automatically runs (in parallel):
  ┌──────────────────────────────────────┐
  │  1. Lint (ESLint / Prettier)         │
  │  2. Type check (tsc --noEmit)        │
  │  3. Unit tests (Jest)                │
  │  4. CLI / API tests (when set up)    │
  │  5. Security scan (Dependabot)       │
  └──────────────────────────────────────┘
        ↓
All pass → PR shows ✅ → Human reviews + merges
Any fail → PR blocked ❌ → Fix before merging
```

### Pipeline Files

| File | What It Does |
|------|-------------|
| `.github/workflows/ci.yml` | Lint, typecheck, and test on every push/PR to main |
| `.github/workflows/triage.yml` | Auto-label and classify new GitHub Issues by type + severity |

### Minimum Bar for Merging

- [ ] CI pipeline passes (lint + typecheck + tests)
- [ ] No new security warnings from Dependabot
- [ ] Code review completed (agent or human)
- [ ] Tested on at least one device
- [ ] Feature spec acceptance criteria checked

### Issue Triage (Automated)

When a new GitHub Issue is created, the triage workflow automatically:
1. Reads the issue template prefix (`[Bug]`, `[Feature]`, `[UX]`)
2. Detects severity from the checkbox the reporter checked (P0–P3)
3. Applies labels (`bug`, `P1`, etc.)
4. Posts a comment with next steps

Human still confirms the triage is correct and assigns it to a feature spec.

---

## Git Workflow

```
main          ← always deployable
  └── feature/[feature-name]
  └── fix/[bug-description]
```

- Branch off `main` for every feature or fix
- Open a PR, get a quick review, merge
- No long-lived branches — keep them short (1–3 days max)
- Write commit messages that explain *why*, not *what*

---

## Weekly Rhythm

| Day | Activity |
|-----|----------|
| **Monday** | Quick sync — what's the focus this week? |
| **Daily** | Async updates — what did you ship? any blockers? |
| **Friday** | Demo what's working on a real device. Decide what's next. |

No sprints, no story points, no Jira. A shared task list (GitHub Issues, Linear, or a markdown file) is enough.

---

## Feedback Loop (Bugs, User Feedback, Improvements)

How feedback becomes action — from report to fix.

### The Flow

```
Tester / User finds issue
        ↓
Files a GitHub Issue (using issue template)
        ↓
You triage (30 seconds — severity, type, which feature)
        ↓
Update the relevant feature spec in docs/
        ↓
Prompt the agent to fix it
        ↓
Agent fixes → updates spec → you verify → close the issue
```

### Step 1: Report (GitHub Issues)

Testers and users file issues using templates in `.github/ISSUE_TEMPLATE/`:

| Template | File | When to Use |
|----------|------|-------------|
| **Bug Report** | `bug_report.md` | Something is broken or crashing |
| **Feature Request** | `feature_request.md` | New capability or improvement |
| **UX Issue** | `ux_issue.md` | Works but feels wrong or confusing |

Each template collects: description, steps to reproduce (for bugs), severity, device info, and screenshots.

### Step 2: Triage (You — 30 seconds per issue)

Read the issue and decide three things:

1. **Type:** Bug / UX issue / Feature request / Performance
2. **Severity:**

| Severity | Meaning | Action |
|----------|---------|--------|
| **P0** | App crashes, data loss, unusable | Fix immediately |
| **P1** | Feature broken, no workaround | Fix this week |
| **P2** | Broken but has workaround | Fix next cycle |
| **P3** | Minor / cosmetic | Backlog |

3. **Which feature does it belong to?** → This determines which `docs/[feature].md` to update.

Label the issue with type + severity (e.g., `bug`, `P1`).

### Step 3: Bridge to Feature Spec

The GitHub Issue is where it's *reported*. The feature spec is where the agent *reads it*. You connect them:

| Type | Where to Add It | What to Write |
|------|----------------|---------------|
| **Bug** | Feature spec → **Edge Cases** section | Describe the bug + link to issue (`Fixes #42`) |
| **UX issue** | Feature spec → **User Flow** section | Note what needs to change + link to issue |
| **Feature request** | Create a **new feature spec** from template | Full spec for the new feature + link to issue |
| **Performance** | Feature spec → **Acceptance Criteria** | Add a performance criterion + link to issue |

### Step 4: Prompt the Agent

| Type | Agent Prompt |
|------|-------------|
| **Bug** | *"Read `docs/[feature].md`. Bug #42 is in Edge Cases — fix it, write a test, and update the spec."* |
| **UX issue** | *"Read `docs/[feature].md`. The user flow needs to change per issue #38 — update the spec and rebuild."* |
| **Feature request** | *"Read `docs/prd.md` and `docs/data-model.md`. Write a feature spec for [feature] to `docs/[feature-name].md`."* |
| **Performance** | *"Read `docs/[feature].md`. Performance issue #51 is in Acceptance Criteria — optimize and update the spec."* |

### Step 5: Close the Loop

- Agent fixes the code
- Agent updates the feature spec
- You verify the fix on device
- Close the GitHub Issue with a reference to the commit or PR
- The feature spec stays as the permanent record

### The Rules

> 1. Every bug or request starts as a **GitHub Issue** — this is the front door.
> 2. Every issue gets **triaged within 24 hours** — severity + type + feature.
> 3. Every issue gets **bridged to a feature spec** — that's how the agent knows about it.
> 4. The issue gets **closed when verified** — not when the code is written.

---

## Build Methodology

1. Build the engine first and test using the CLI
2. Only build UI after the engine is solid
3. Write a Feature Spec before building — it's context for you and the agent
4. Ship the smallest useful version first
5. Iterate based on real feedback, not assumptions
6. **Refactor when you feel friction** — when agent prompts take too long, when the same bug pattern repeats, or when adding a feature requires touching too many files. Don't schedule it, just do it.

---

## Reference: How This Maps to 8090.ai (Chamath's Software Factory)

8090 charges $200/seat/month for an AI-native SDLC platform with four modules. This template replicates the same workflow using free markdown files.

| # | 8090 Module | What It Does | Your Template Equivalent | File |
|---|-------------|-------------|--------------------------|------|
| ① | **Refinery** | Refine requirements — turn vague ideas into clear specs | PRD + Feature Spec | `docs/prd.md` + `docs/[feature].md` |
| ② | **Foundry** | Capture architecture & engineering decisions early | Data Model + Decisions + Agent Rules | `docs/data-model.md` + `docs/decisions.md` + `.cursor/rules/project.mdc` |
| ③ | **Planner** | Turn product intent into structured work orders | Feature Spec (acceptance criteria, data, API, screens) | `docs/[feature].md` |
| ④ | **Validator** | Convert feedback into actionable tasks | Testing Strategy + Feedback Loop + CI/CD | `docs/testing-strategy.md` + GitHub Issues + `.github/workflows/ci.yml` |

**The flow:** ① Requirements → ② Architecture → ③ Work Orders → ④ Validation → loops back to ① for the next iteration.

**The difference:** 8090 automates the flow between modules with a UI and knowledge graph. You do it manually by pointing the agent to the right doc. For a small team, manual is enough — the docs *are* the product.

> Source: [8090.ai](https://8090.ai) / [Ry Walker Research](https://rywalker.com/research/8090-software-factory)

---

## Reference: Peter Steinberger's Best Practices

Key practices from [Shipping at Inference-Speed](https://steipete.me/posts/2025/shipping-at-inference-speed) that shaped this template:

### Start With CLI, Not UI

> *"Whatever you build, start with the model and a CLI first. Agents can call it directly and verify output — closing the loop."*

This is why Phase 2 builds the engine and CLI before Phase 3 touches the UI. The CLI is the agent's test harness.

### Docs as Agent Context

> *"I maintain docs for subsystems and features in a docs folder in each project, and use instructions to force the model to read docs on certain topics."*

This is the `docs/` folder — one file per feature, read by the agent before building. Not documentation for humans; context for the agent.

### Don't Read Much Code — Watch the Stream

> *"These days I don't read much code anymore. I watch the stream and sometimes look at key parts."*

When the agent builds from a feature spec with clear acceptance criteria, you verify the output, not the code. The CI pipeline and CLI tests catch what you miss.

### Language and Dependencies Are the Hard Decisions

> *"The important decisions these days are language/ecosystem and dependencies."*

This is why `docs/decisions.md` exists — log your stack choices and why, so the agent (and future-you) never re-debates them.

### Prompts Got Shorter

> *"My prompts gotten much shorter... If you show the model what's wrong, just a few words are enough."*

Good context docs mean short prompts. Instead of a paragraph explaining the feature, you write: *"Read docs/search.md. Build it."* The spec does the heavy lifting.

### Refactor When You Feel Friction

> *"I do this much more ad-hoc now. Whenever prompts start taking too long or I see sth ugly flying by in the code stream, I'll deal with it right away."*

No scheduled refactoring. When agent prompts take too long or the same bug keeps appearing — refactor now.

### Engineer for Agents, Not Just Humans

> *"I don't design codebases to be easy to navigate for me, I engineer them so agents can work in it efficiently."*

This is why `.cursor/rules/project.mdc` exists — the agent reads it on every prompt. The folder structure, naming conventions, and file organization are designed for agent comprehension, not just human readability.

### No Plan Mode — Just Conversations

> *"Instead of plan mode, I simply start a conversation with the model, ask a question, let it explore code, create a plan together, and when I'm happy, I write 'build'."*

This is the Phase 1 prompting workflow — explore the idea with the agent, let it draft the PRD and data model, review together, then say "build."

> Source: [Shipping at Inference-Speed — Peter Steinberger](https://steipete.me/posts/2025/shipping-at-inference-speed)
