# Feature Spec: [Feature Name]

> Copy this template to `docs/[feature-name].md` for each feature.
> Fill in the sections, then point the AI agent to this file before building.

---

## What It Does
<!-- 2-3 sentences. What does this feature do from the user's perspective? -->
[Describe the feature clearly.]

## User Flow
<!-- Step-by-step — what the user does and sees -->
1. User [action] → sees [result]
2. User [action] → sees [result]
3. User [action] → sees [result]
4. [End state]

## Data
<!-- Which tables and fields does this feature touch? -->
- **Table:** `[table_name]`
- **Key fields:** [list the columns this feature reads or writes]
- **Query:**
```sql
-- Example query this feature runs
SELECT * FROM [table]
WHERE [condition]
ORDER BY [column];
```

## API
<!-- How does the app call the backend for this feature? -->
- **Supabase call:** `supabase.from('[table]').select('*').eq('[column]', value)`
- **CLI equivalent:** `[project-cli] [command] --[flag] [value]`
- **Response shape:**
```json
{
  "id": "uuid",
  "field": "value"
}
```

## Screens & Components
<!-- Which screens and components need to be built or modified? -->
- **Screen:** `src/screens/[ScreenName].tsx`
- **Components:**
  - `[ComponentName]` — [what it does]
  - `[ComponentName]` — [what it does]
- **Navigation:** [how does the user get to this screen?]

## Acceptance Criteria
<!-- Checkboxes the agent (and you) can verify against -->
- [ ] [Criterion 1 — e.g., "Search returns results matching all filters"]
- [ ] [Criterion 2 — e.g., "Empty state shown when no results"]
- [ ] [Criterion 3 — e.g., "Loading spinner while fetching"]
- [ ] [Criterion 4 — e.g., "CLI command returns same results as app"]
- [ ] [Criterion 5 — e.g., "Error message shown on network failure"]

## Testing
<!-- What tests does this feature need? Reference docs/testing-strategy.md for the overall approach. -->
- **CLI test:** `[project-cli] [command] --[flag] [value]` → expected output: [describe]
- **Unit tests:** [e.g., "Test price formatting util", "Test distance calculation helper"]
- **Component tests:** [e.g., "Test filter form submits correct params", "Test empty state renders"]
- **E2E flow:** [e.g., "User searches → sees results → taps card → sees detail"]

## Edge Cases
<!-- What could go wrong? What are the boundary conditions? -->
- [e.g., No results found]
- [e.g., User has no network connection]
- [e.g., Very large result set — needs pagination?]
- [e.g., Required permission denied by user]

## Dependencies
<!-- What must exist before this feature can be built? -->
- [e.g., `users` table must exist (see docs/data-model.md)]
- [e.g., Auth must be set up (see docs/auth.md)]
- [e.g., Requires [npm package] for [reason]]

## References
<!-- Links to related docs, designs, or external resources -->
- Data model: `docs/data-model.md`
- PRD: `docs/prd.md`
- Design: [Figma link or "TBD"]
