# Stories: TodoNow

- Slug: `todonow` · PRD: `prd.md` · Requirements signed off 2026-10-13 by Cong; change (log out
  and password rule, FR-26, FR-27) re-signed 2026-10-13 by Cong
- Limit: at most 5 acceptance criteria per story (`limits.story_max_ac`)
- Priority reflects delivery order only; every story is required for the Tet 2027 launch (Q-07).

## Revision log
| Date | Revision | Change |
|---|---|---|
| 2026-10-13 | 1 | First draft: S-01..S-28 |
| 2026-10-13 | 2 | GATE 2 feedback ("add log out, and passwords of at least 8 characters including lowercase letters, uppercase letters, digits and special characters"), applied after Q-33/Q-34 and GATE 1 re-sign-off. Changed: S-02 (password rule AC), S-03 ("stay logged in" AC, log out pointer), S-04 (password rule AC, other phones stay logged in), S-23 (pointer to S-32). Added: S-29 password rule, S-30 log out on this phone, S-31 log out on all devices, S-32 no share notifications after log out. |

## Stories
| ID | Title | Priority | ACs | Covers | Depends on |
|---|---|---|---|---|---|
| S-01 | Read the privacy notice | P0 | 4 | FR-23 | none |
| S-02 | Sign up with email and password | P0 | 5 | FR-03, FR-24, FR-27, NFR-04 | S-01 |
| S-03 | Log in with email and password | P0 | 5 | FR-01, FR-02 | S-02 |
| S-04 | Reset a forgotten password | P0 | 4 | FR-03, FR-27 | S-03 |
| S-05 | Create a task | P0 | 5 | FR-04, FR-08 | S-03 |
| S-06 | See my tasks in priority order | P0 | 5 | FR-05, NFR-07 | S-05 |
| S-07 | Choose a task priority | P0 | 3 | FR-08 | S-05 |
| S-08 | Overdue tasks stand out | P0 | 4 | FR-07, FR-05 | S-06 |
| S-09 | Mark a task done and see the done list | P0 | 4 | FR-06, FR-17 | S-06 |
| S-10 | Undo "done" | P0 | 2 | FR-06 | S-09 |
| S-11 | Edit a task | P0 | 3 | FR-12, FR-08 | S-07, S-08 |
| S-12 | Delete a task | P0 | 2 | FR-12 | S-09 |
| S-13 | See today's and overdue tasks when I open the app | P1 | 4 | FR-11 | S-08 |
| S-14 | App language follows my phone | P1 | 4 | FR-13, NFR-03 | none |
| S-15 | Add TodoNow to my phone's Home Screen | P1 | 3 | NFR-01, NFR-02 | S-03 |
| S-16 | Create a family | P1 | 3 | FR-14 | S-03 |
| S-17 | Invite a person to my family | P1 | 4 | FR-14 | S-16 |
| S-18 | Join a family with an invitation | P1 | 5 | FR-15 | S-17 |
| S-19 | See and cancel unused invitations | P1 | 4 | FR-25 | S-18 |
| S-20 | Share a task with chosen family members | P1 | 5 | FR-09, FR-05, NFR-07 | S-18, S-06 |
| S-21 | Change who a task is shared with, or delete a shared task | P1 | 3 | FR-09, FR-12 | S-20, S-12 |
| S-22 | A shared task done by anyone is done for everyone | P1 | 4 | FR-06, FR-18 | S-20, S-10 |
| S-23 | Get a phone notification when a task is shared with me | P1 | 5 | FR-10 | S-21, S-15, S-14 |
| S-24 | Leave my family | P1 | 4 | FR-19 | S-20 |
| S-25 | Remove a member from my family | P1 | 3 | FR-20 | S-20 |
| S-26 | Hand over the creator role | P1 | 3 | FR-22 | S-18 |
| S-27 | Delete my family | P1 | 4 | FR-21 | S-20, S-19 |
| S-28 | Delete my account | P1 | 4 | FR-16, NFR-08 | S-20, S-26 |
| S-29 | Passwords follow the password rule | P0 | 5 | FR-27, NFR-04 | S-02, S-04 |
| S-30 | Log out on this phone | P0 | 4 | FR-26, FR-01, NFR-07 | S-03 |
| S-31 | Log out on all devices | P1 | 3 | FR-26, NFR-07 | S-30 |
| S-32 | No share notifications on a phone after I log out | P1 | 5 | FR-26, FR-10, NFR-07 | S-23, S-30, S-31 |

## FR → Story traceability
| FR | Stories |
|---|---|
| FR-01 | S-03, S-30 |
| FR-02 | S-03 |
| FR-03 | S-02, S-04 |
| FR-04 | S-05 |
| FR-05 | S-06, S-08, S-20 |
| FR-06 | S-09, S-10, S-22 |
| FR-07 | S-08 |
| FR-08 | S-05, S-07, S-11 |
| FR-09 | S-20, S-21 |
| FR-10 | S-23, S-32 |
| FR-11 | S-13 |
| FR-12 | S-11, S-12, S-21 |
| FR-13 | S-14 |
| FR-14 | S-16, S-17 |
| FR-15 | S-18 |
| FR-16 | S-28 |
| FR-17 | S-09 |
| FR-18 | S-22 |
| FR-19 | S-24 |
| FR-20 | S-25 |
| FR-21 | S-27 |
| FR-22 | S-26 |
| FR-23 | S-01 |
| FR-24 | S-02 |
| FR-25 | S-19 |
| FR-26 | S-30, S-31, S-32 |
| FR-27 | S-02, S-04, S-29 |

All 27 in-scope FRs are covered; no FR is deferred.

## NFR coverage
| NFR | Where it is checked |
|---|---|
| NFR-01 | S-15 |
| NFR-02 | S-15 (applies to every page) |
| NFR-03 | S-14 (every story with visible text provides Vietnamese and English, A-13) |
| NFR-04 | S-02 (password not stored readable), S-29 (password rule); encrypted connections apply to every story |
| NFR-05 | Project constraint: release before 2027-02-06 |
| NFR-06 | Project constraint: small budget |
| NFR-07 | S-06, S-20, S-30, S-31, S-32 |
| NFR-08 | S-28, S-01 (stated in the privacy notice); applies to every story |

## Assumptions used by the revised stories
Accepted at the change re-sign-off (GATE 1, 2026-10-13): A-18 (rule applies at sign-up and
new password after "forgot password": S-02, S-04, S-29), A-19 (stay logged in until log out:
S-03, S-30), A-20 (list of keyboard symbols: S-29), A-21 (password reset does not log out
other phones: S-04).

## Size self-check
| Story | ACs | ≤ limit? | Split pattern used |
|---|---|---|---|
| S-01 | 4 | yes | by workflow (notice before sign-up) |
| S-02 | 5 | yes | CRUD: create account (rule details split into S-29) |
| S-03 | 5 | yes | by workflow: login (log out split into S-30, S-31) |
| S-04 | 4 | yes | by workflow: recovery split from login (rule details in S-29) |
| S-05 | 5 | yes | CRUD: create, simple version first (default priority) |
| S-06 | 5 | yes | CRUD: read; business rule (ordering) |
| S-07 | 3 | yes | by business rule: priority choice |
| S-08 | 4 | yes | by business rule: overdue |
| S-09 | 4 | yes | by workflow: done, happy path |
| S-10 | 2 | yes | by workflow: undo split from done |
| S-11 | 3 | yes | CRUD: update |
| S-12 | 2 | yes | CRUD: delete (own tasks only) |
| S-13 | 4 | yes | by channel: in-app reminder |
| S-14 | 4 | yes | by business rule: language |
| S-15 | 3 | yes | by channel: Home Screen install |
| S-16 | 3 | yes | CRUD: create family |
| S-17 | 4 | yes | by workflow: invite |
| S-18 | 5 | yes | by workflow: join (cancelled invitations in S-19) |
| S-19 | 4 | yes | by business rule: cancel invitations |
| S-20 | 5 | yes | by workflow: share, happy path first |
| S-21 | 3 | yes | CRUD: update and delete for shared tasks |
| S-22 | 4 | yes | by business rule: shared done status |
| S-23 | 5 | yes | by channel: phone notification (logged-out cases in S-32) |
| S-24 | 4 | yes | by role: member leaves |
| S-25 | 3 | yes | by role: creator removes |
| S-26 | 3 | yes | by role: creator handover |
| S-27 | 4 | yes | by role: creator deletes family |
| S-28 | 4 | yes | CRUD: delete account |
| S-29 | 5 | yes | by business rule: password rule cases |
| S-30 | 4 | yes | by workflow: log out on this phone, simple version first |
| S-31 | 3 | yes | by workflow: log out on all devices |
| S-32 | 5 | yes | by channel: phone notifications after log out |

Every story has at most 5 acceptance criteria. Stories that bundle several sub-features were
split before drafting (sign-up / login / recovery / password rule; log out / log out on all
devices / notifications after log out; done / undo / shared done; share / change recipients /
notification; invite / join / cancel).
