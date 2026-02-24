# Data Model — [Project Name]

## Overview
<!-- Brief description of the database setup -->
- **Database:** [e.g., PostgreSQL via Supabase]
- **Extensions:** [e.g., PostGIS for geospatial queries]
- **Auth:** [e.g., Supabase Auth with email/password + Google OAuth]

---

## Tables

### `users`
| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | uuid | no | auth.uid() | Primary key, linked to Supabase Auth |
| email | text | no | | |
| full_name | text | yes | | |
| role | text | no | 'user' | 'user', 'agent', 'admin' |
| created_at | timestamptz | no | now() | |

### `[table_name]`
| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | uuid | no | gen_random_uuid() | Primary key |
| [column] | [type] | [yes/no] | [default] | [notes] |
| [column] | [type] | [yes/no] | [default] | [notes] |
| created_at | timestamptz | no | now() | |

### `[table_name]`
| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | uuid | no | gen_random_uuid() | Primary key |
| [column] | [type] | [yes/no] | [default] | [notes] |
| created_at | timestamptz | no | now() | |

---

## Relationships
<!-- Describe how tables connect -->
- `[table_a].user_id` → `users.id` (many-to-one)
- `[table_a].category_id` → `[table_b].id` (many-to-one)

---

## Indexes
<!-- List any important indexes, especially for search/geo queries -->
- `[table_name](column)` — speeds up [what query]
- `[table_name] USING GIST(location)` — spatial index for geo queries

---

## Row-Level Security (RLS)
<!-- If using Supabase, document your RLS policies -->
| Table | Policy | Rule |
|-------|--------|------|
| `[table]` | Users can read all | `SELECT: true` |
| `[table]` | Users can only update their own | `UPDATE: auth.uid() = user_id` |
| `[table]` | Only admins can delete | `DELETE: role = 'admin'` |

---

## Notes
- [e.g., PostGIS `geography` type is used for location columns — stores lat/lng as a point]
- [e.g., All timestamps are stored in UTC]
- [e.g., Images are stored in Supabase Storage, URLs are saved in the table]
