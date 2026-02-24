# Testing Strategy — [Project Name]

## Philosophy
Build the engine first. Test it via CLI. If the engine works, the app will too.

---

## Test Layers

| Layer | What It Tests | Tool | When It Runs |
|-------|--------------|------|-------------|
| **CLI / API tests** | Backend logic, queries, data integrity | CLI + script (Bash/Python) | Every PR, before merge |
| **Unit tests** | Utility functions, helpers, formatters | Jest | Every PR |
| **Component tests** | Critical UI behavior (forms, lists, filters) | Jest + React Native Testing Library | Every PR |
| **E2E tests** | Core user flows on real device/simulator | Maestro (or Detox) | Before each release |
| **Manual testing** | Look and feel, real-device quirks | Human on device | Before each release |

---

## CLI / API Tests (Most Important)

Every backend feature gets a CLI command. Tests run the command and check the output.

**Test case format:**
```json
{
  "command": "[project-cli] search --city Austin --max-price 500000",
  "expected": "results where every price < 500000"
}
```

**How to run:**
```bash
# Run all CLI tests
./scripts/test-cli.sh

# Run a single test
[project-cli] [command] --[flags]
```

**Who writes them:**
- You define the test cases (or let the AI agent generate them from the data model)
- AI agent runs them, checks output, reports pass/fail

---

## Unit Tests

- Located in `src/**/__tests__/` or alongside the file as `[file].test.ts`
- Cover: utility functions, data transformations, formatters
- Skip: simple components that are just layout

```bash
# Run unit tests
npm test
```

---

## Component Tests

- Use React Native Testing Library
- Focus on components with logic: forms, search filters, conditional rendering
- Test user interactions: "user types in search → results update"

---

## E2E Tests

- Use **Maestro** (simpler than Detox for small teams)
- Cover the 3-5 core user flows:
  1. [e.g., Sign up → land on home screen]
  2. [e.g., Search for property → view results → tap a card]
  3. [e.g., Add a listing → see it appear in search]
  4. [e.g., Open map → see nearby markers]
  5. [e.g., Log out → log back in]

```bash
# Run E2E tests
maestro test .maestro/
```

---

## Manual Testing Checklist (Before Release)

- [ ] App installs and launches on iOS
- [ ] App installs and launches on Android
- [ ] All core flows work end-to-end
- [ ] Error states display correctly (no network, empty results, invalid input)
- [ ] Loading states appear (no blank screens while fetching)
- [ ] Performance is acceptable (smooth scrolling, fast map load)
- [ ] No crashes during normal usage

---

## Minimum Bar for Merging a PR

- [ ] CLI/API tests pass
- [ ] No new linter warnings
- [ ] Tested on at least one device (iOS or Android)
- [ ] Feature spec acceptance criteria are all checked

## Minimum Bar for Releasing

- [ ] All of the above
- [ ] E2E tests pass on both iOS and Android
- [ ] Manual testing checklist completed
- [ ] No known P0 bugs
