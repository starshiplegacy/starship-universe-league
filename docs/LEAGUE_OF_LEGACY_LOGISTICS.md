# League Of Legacy — Logistics and Delivery Plan

**Review date:** 17 November 2026  
**Repository:** `starshiplegacy/starship-universe-league` · `main`  
**Status:** Development planning only. No deployment authorized.

## 1. Executive decision

League Of Legacy should move forward as a sequence of small, testable releases—not as a single large multiplayer launch. The current repository has a mode selector, a central map registry and prepared Three.js loading paths. It does **not** yet contain a complete playable match loop or production multiplayer service.

The recommended first playable milestone is a **single-player Training vertical slice using an original or rights-cleared map**. It gives the project a controlled way to validate camera, movement, scale, collision, spawn placement, performance and browser compatibility before matchmaking is introduced.

## 2. Current baseline

| Workstream | Verified repository state | Delivery status |
|---|---|---|
| Main menu → mode selector | `JUGAR` opens `game-modes.html` | Connected; browser QA pending |
| Mode/map registry | `map-registry.js` maps modes to map IDs and ruleset IDs | Implemented |
| Battle Royale / Ranked | Both assigned to Summoner's Rift; separate ruleset IDs | Assignment recorded; map rights block |
| Versus 1 to 3 | BeginningLobby FBX candidate; CC BY-NC license file | Blocked for commercial use pending compatible permission/replacement |
| Versus 4 to 5 | GLB candidate and loader path | Rights and visual validation pending |
| Training | GLB candidate and loader path | Rights and visual validation pending |
| Matchmaking / sessions | Not implemented | Not started |
| Server-authoritative game state | Not implemented | Not started |
| Physics / collision / spawns | Not implemented | Not started |
| Supabase persistence | Canonical project not confirmed | Blocked |
| Production release | Not approved | Blocked |

A loader being present is not proof that a map renders correctly, is licensed, is optimized, or is playable.

## 3. Mode design register

Keep map identity separate from ruleset identity. Battle Royale and De Clasificatoria intentionally share one map assignment, but must not share rules by accident.

| Mode | Map assignment | Ruleset work still required |
|---|---|---|
| Battle Royale | Summoner's Rift | Player cap, solo/teams, safe-zone or round flow, eliminations, respawn policy, scoring and victory |
| De Clasificatoria | Summoner's Rift | Ranked team format, queue eligibility, rating rules, match length, tie handling, penalties and results |
| Versus 1 to 3 | Dedicated Versus map | Exact supported player count, team arrangement, round format, objectives and victory |
| Versus 4 to 5 | Dedicated Versus map | Exact supported player count, team arrangement, round format, objectives and victory |
| Entrenamiento | Dedicated Training map | Practice activities, reset behavior, target/dummy behavior and session boundaries |

Do not invent final numbers or competitive rules in code. Product decisions must be written and approved before implementing the corresponding ruleset.

## 4. Delivery phases and gates

### Phase 0 — Repository protection and baseline
**Priority:** Immediate  
**State:** Partially established

Tasks:
- Preserve `main` and all original map/model files.
- Keep the repository private while rights and backend decisions remain open.
- Confirm the map inventory against the recursive Git tree. The 17 November recount verifies 421 tracked files (633.82 MiB) under `assets/league-of-legacy/Map/`; the previous 411 figure was stale.
- Run `python scripts/repo_audit.py` and JavaScript syntax checks.
- Record the commit SHA, audit output and any outstanding failures.

Exit gate:
- One consistent inventory, clean static audit or a documented list of known failures, and a recoverable commit baseline.

### Phase 1 — Rights clearance and asset provenance
**Priority:** Critical  
**State:** Blocked / evidence required

Tasks:
- Summoner's Rift: obtain applicable written authorization from Riot Games or replace it with an original map.
- Versus 1 to 3: obtain a commercial-compatible written license or replace the CC BY-NC asset.
- Versus 4 to 5 and Training: record creator, source, license, attribution requirements and permission evidence.
- Record rights for textures, materials, audio and any embedded third-party components—not only the top-level model.
- Store evidence references and attribution in an asset-rights register. Do not mark an asset `cleared` based on an assumption.

Exit gate:
- Every asset used by a mode has documented rights compatible with the intended distribution and business model.

### Phase 2 — Asset validation and map preparation
**Priority:** High  
**State:** Loaders prepared; validation pending

Tasks:
- Inspect scale, orientation, origin, materials, UVs, missing textures, geometry complexity and file size.
- Check GLB/OBJ rendering in a real browser on desktop and mobile.
- Create optimized runtime assets from authorized source files; preserve originals.
- Define walkable areas, collision geometry, spawn markers and navigation data.
- Establish loading progress, timeout, cancellation, retry and readable error states.
- Set performance budgets for download size, memory, frame rate and initial load time.

Exit gate:
- Rights-cleared map loads consistently, has verified scale/materials, valid collision and spawn data, and meets agreed performance budgets.

### Phase 3 — Mode rules and game design
**Priority:** High  
**State:** Not specified sufficiently for implementation

Tasks:
- Approve player limits, teams, objectives, round timers, scoring, respawns, win conditions and tie handling for every mode.
- Define ranked rating, matchmaking eligibility, abandon penalties and result validation separately from Battle Royale.
- Define Training interactions and reset behavior.
- Write mode specifications and acceptance scenarios before implementation.

Exit gate:
- Each mode has a versioned ruleset specification with testable outcomes and no unresolved core rules.

### Phase 4 — Backend decision and multiplayer contracts
**Priority:** Critical before persistence  
**State:** Blocked until canonical Supabase project is confirmed

Tasks:
- Confirm which Supabase project is the approved backend for League Of Legacy. The frontend currently points to `wvyveduslbsuvyekeccf`; other project refs have appeared and must not be assumed equivalent.
- Do not use the separate catalog/Django project as the game backend.
- Design contracts for player profile, queue ticket, lobby, match, participant, team, event and result.
- Decide which operations run server-side and how identity, authorization, rate limits and reconnects work.
- Define RLS, grants, private data boundaries and server-side secrets before adding tables.
- Keep service-role credentials out of browser code and version control.

Exit gate:
- Backend owner/project confirmed; data contracts, authorization model, migration plan and threat review approved.

### Phase 5 — First playable vertical slice
**Priority:** First implementation target  
**State:** Not started

Recommended scope:
- One player enters Training.
- One rights-cleared Training map loads.
- Player can spawn, move, look around and interact with a simple practice target.
- Collision prevents walking through solid geometry.
- Session can reset safely.
- Loading, failure and low-performance states are handled.

Exit gate:
- A complete Training loop works in supported desktop browsers and has repeatable QA evidence. Do not add online matchmaking to this milestone.

### Phase 6 — Online sessions and matchmaking
**Priority:** After the vertical slice

Tasks:
- Implement lobby creation/joining, queues, invites, team assignment and reconnect handling.
- Make the server authoritative for match state, score, eliminations, timers and results.
- Validate every client action server-side; do not trust client-reported wins or scores.
- Add rate limits, abuse controls, logging, disconnect recovery and operational monitoring.
- Test concurrent users, latency, packet loss and malicious client behavior.

Exit gate:
- End-to-end online match tests pass under defined load and failure scenarios.

### Phase 7 — Mode rollout and release readiness
**Priority:** Last

Tasks:
- Roll out modes one at a time after their individual map, rights and rules gates pass.
- Complete desktop/mobile browser QA, accessibility checks and performance profiling.
- Verify privacy/security, error monitoring, backups, rollback and support procedures.
- Obtain explicit release approval before deployment.

Exit gate:
- All release checklist items pass, rollback is tested, and deployment is explicitly authorized.

## 5. Work dependencies

```text
Repository baseline
  ├─ Rights clearance ─ Asset validation ─ Map collision/spawns ─ Training vertical slice
  ├─ Mode specifications ─ Ruleset implementation ─ Mode QA
  └─ Confirm backend ─ Security/data contracts ─ Server-authoritative sessions
                                                    └─ Matchmaking ─ Online mode QA
All approved gates ─ Release review ─ Explicit deployment approval
```

The Training vertical slice can proceed without matchmaking. Online persistence must wait for backend confirmation. No map may bypass the rights gate.

## 6. Logistics, ownership and change control

| Role | Responsibility | Assignment |
|---|---|---|
| Product owner | Approves mode rules, priorities and release scope | To be assigned |
| Rights owner | Obtains and stores licenses/permissions | To be assigned |
| Technical lead | Architecture, code review, integration and rollback | To be assigned |
| Game/3D developer | Map optimization, collision, spawns and gameplay | To be assigned |
| Backend developer | Auth, queues, sessions, server authority and data | To be assigned |
| QA | Browser, gameplay, performance and regression tests | To be assigned |

For each task, record: owner, priority, dependencies, status, evidence, acceptance criteria and rollback. Use GitHub issues for actionable work; use pull requests for code changes. Keep risky work on feature branches and merge only after review. Do not combine unrelated asset, backend and gameplay changes in one commit.

## 7. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Unlicensed third-party maps/textures | Critical | Block preview/release until permission or replacement |
| Wrong Supabase project | Critical | Confirm project ref before schema or data changes |
| Client-controlled score/results | Critical | Server-authoritative validation |
| Large map and texture payloads | High | Optimize, compress, stream and profile memory |
| Missing collision/spawn/navigation data | High | Build and validate map gameplay metadata |
| Undefined rulesets | High | Approve written mode specifications |
| Browser-only testing gaps | Medium | Desktop/mobile smoke and regression tests |
| Inventory count mismatch | Medium | Recount tracked tree and update all inventories together |

## 8. Immediate next actions

1. Confirm whether the Versus 4 to 5 and Training GLB files are original creations or have documented usage permission.
2. Map inventory reconciled: 421 tracked files (633.82 MiB), verified against the recursive Git tree on 17 November 2026.
3. Confirm the canonical Supabase project before any database work.
4. Approve the Training mode's basic controls and practice-loop requirements.
5. Start browser QA only with a rights-cleared test map.

## 9. Current operating rule

**Development only. No deployment, no database mutation, no license-status promotion and no modification of original map binaries without the required approval and evidence.**

Related documents:
- [Engineering audit](ENGINEERING_AUDIT.md)
- [Mode/map matrix](MAP_MODE_MATRIX.md)
- [Technical operating plan](TECHNICAL_OPERATING_PLAN.md)
- [Asset manifest](../assets/ASSET_MANIFEST.md)
