# Supabase ↔ GitHub synchronization audit

**Audit date:** 2026-11-16  
**Repository:** `starshiplegacy/starship-universe-league` (`main`)  
**Result:** BLOCKED — the Supabase project referenced by the frontend is not among the two projects available through the connected Supabase accounts.

## Verified GitHub state

- The repository is private and accessible; default branch: `main`.
- `index.html` configures Supabase URL `https://wvyveduslbsuvyekeccf.supabase.co`.
- `lyrielife.html` independently creates a Supabase client with the same URL.
- The frontend contains a Supabase publishable key. Publishable keys are intended for browser use; never place a service-role or secret key in frontend code.
- `save-system.js` expects the `public.game_saves` table.
- `gallery.js` expects `gallery_posts`, `gallery_starlights`, `gallery_comments`, `gallery_mentions`, and the `universe-gallery` Storage bucket.
- `account-settings.js` expects `universe-avatars`, `creator_verification_applications`, and `user_feedback`.
- `league-of-legacy.html` loads GLB models from `assets/league-of-legacy/characters/<name>.glb`.

## Verified Supabase projects available to the connected accounts

| Project ref | Connected account | Observed state | Assessment |
|---|---|---|---|
| `uyhcocdknweqvcqgbnez` | STARSHIP-LEAGE | ACTIVE_HEALTHY; 33 public tables; 3 Storage buckets | Not schema-aligned with the current frontend. It has community tables such as `posts`, `comments`, and `starlights`, but not the `gallery_*` tables or `game_saves` expected by this repository. Its buckets are `community-posts`, `profile-media`, and `shorts`, not `universe-gallery` or `universe-avatars`. All inspected public tables have RLS enabled. |
| `fixwovymcfpfididtmud` | Primary | ACTIVE_HEALTHY; catalog and Django tables | Appears to be a separate catalog/distribution backend, not this game's backend. Do not connect this repository to it. |

The frontend's configured ref, `wvyveduslbsuvyekeccf`, does not match either connected project. The correct project must be identified before changing client configuration or creating backend resources.

## Actions intentionally not taken

- No Supabase project URL or API key was replaced.
- No tables, policies, functions, or buckets were created or modified.
- No existing data or Storage objects were copied, deleted, or migrated.
- No deployment was triggered.

This is deliberate: pointing the frontend at the wrong project could break authentication or expose/mix unrelated user data. Creating the missing tables on an unconfirmed project could create a second, divergent backend.

## Required next step to unblock synchronization

Identify and connect the Supabase project whose ref is `wvyveduslbsuvyekeccf`, or explicitly designate another project as the canonical STARSHIP UNIVERSE LEAGUE backend. Then:

1. Confirm its URL and active publishable key.
2. Compare the frontend's required tables, columns, RLS policies, Storage buckets, and object policies against that project's live schema.
3. Create reviewed, version-controlled SQL migrations in GitHub for only the missing resources.
4. Apply migrations to the confirmed project and verify with SQL queries and Supabase security/performance advisors.
5. Centralize the project URL/key configuration so `index.html` and `lyrielife.html` cannot drift apart.
6. Add a GitHub Actions scheduled/manual health check using GitHub Actions secrets (never committed credentials) to compare the expected project ref and required schema/buckets, and fail visibly on mismatch.
7. Record each check result and migration version in the repository.

## Ongoing source-of-truth rules

- GitHub is the source of truth for application code, migrations, and static game assets.
- Supabase is the source of truth for live user data, auth, database schema state, and community uploads.
- A migration in GitHub is not considered applied until its version is confirmed in Supabase migration history.
- A Supabase change is not considered reproducible until its migration is committed to GitHub.
- Never use the music/catalog Supabase project for this game.


## Configuration cleanup

The current public URL and publishable key were centralized in `supabase-config.js`; `index.html` and `lyrielife.html` now read that shared configuration. The target remains `wvyveduslbsuvyekeccf` and is still unverified. No project switch was made.

The scheduled GitHub audit checks local assets, model/world/video paths, project-ref consistency, Auth health, and REST table exposure when Actions settings are configured. It intentionally does not enumerate Storage buckets with a browser publishable key; Storage inventory and object policies remain a manual Supabase dashboard check until a safe, narrowly scoped monitoring mechanism is designed.


## Supabase advisor review (2026-11-16)

Both connected projects were checked with Supabase security, performance, health, and migration advisors.

### Candidate game/community project: uyhcocdknweqvcqgbnez

- Status: ACTIVE_HEALTHY; 20 recorded migrations.
- Health advisor: no findings.
- Security advisor:
  - 2 tables have RLS enabled but no policies: private.geffen_whitelist and public.digital_codes. These may be intentionally closed; do not add permissive policies without reviewing ownership and intended access.
  - 9 SECURITY DEFINER RPC functions are executable by authenticated users. Review each function's SQL body, search_path, grants, and intended caller before changing permissions. Examples include create_chat_group, create_message_request, delete_chat_group, get_public_follow_counts, invite_to_existing_group, is_geffen_whitelisted, leave_chat_group, respond_group_invite, and respond_message_request.
  - Leaked-password protection is disabled in Supabase Auth. Enable after reviewing the Auth configuration and rollout impact.
- Performance advisor:
  - 17 foreign keys without covering indexes.
  - 12 RLS policies trigger repeated auth/current_setting evaluation; consider wrapping auth calls in scalar SELECTs after reviewing each policy.
  - 3 tables have multiple permissive policies for the same role/action.
  - Additional unused-index findings exist; do not remove indexes solely from a short usage window.

Remediation references:
- [RLS policy linter](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy)
- [SECURITY DEFINER function linter](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
- [Leaked password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
- [Unindexed foreign keys](https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys)
- [RLS init plan optimization](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select)
- [Multiple permissive policies](https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies)

### Separate catalog/Django project: fixwovymcfpfididtmud

- Status: ACTIVE_HEALTHY; 4 recorded migrations.
- Health advisor: no findings.
- Security advisor reports 7 Django/auth/content tables with RLS enabled but no policies. Do not connect the game frontend to this project or change its Django table policies as part of game work.
- Performance advisor reports 40 unused-index findings. Treat these as review candidates only, not automatic deletions.

No advisor remediation was applied during this audit. The findings are recorded for a deliberate security review; broad policy or function changes without source review could expose user data or break messaging and moderation.
