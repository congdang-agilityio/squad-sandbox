# Stories: TodoNow user administration

- Slug: `user-admin` · PRD: `prd.md` · Requirements signed off 2026-10-13 by Cong
- Limit: at most 5 acceptance criteria per story (`limits.story_max_ac`)
- Priority reflects delivery order and importance within this release; every in-scope FR is
  required for the target of about 3 months after the TodoNow launch (Q-26).
- Open input: the contact address for the emails about admin actions (A-20) was not given at
  sign-off; S-23 needs it before it is built (`sources/stakeholder-notes.md`).

## Revision log
| Date | Revision | Change |
|---|---|---|
| 2026-10-13 | 1 | First draft: S-01..S-26 |

## Stories
| ID | Title | Priority | ACs | Covers | Depends on |
|---|---|---|---|---|---|
| S-01 | Log in to the admin area with an email code | P0 | 5 | FR-01, FR-08, NFR-06 | none |
| S-02 | Admin area language follows the browser | P1 | 5 | NFR-04, NFR-03, FR-01 | S-01 |
| S-03 | Give a team member admin access | P0 | 5 | FR-12, FR-06, NFR-01 | S-01 |
| S-04 | Change a staff member's role or remove their access | P1 | 5 | FR-12, FR-06 | S-03 |
| S-05 | Reset a forgotten admin password | P1 | 4 | FR-19, NFR-01 | S-03 |
| S-06 | Find user accounts by search | P0 | 5 | FR-03, FR-06 | S-01 |
| S-07 | Filter the user list | P1 | 4 | FR-03 | S-06 |
| S-08 | View a user account | P0 | 3 | FR-03, NFR-02 | S-06 |
| S-09 | Publish the updated privacy notice | P0 | 4 | FR-13, NFR-04 | none |
| S-10 | Create one user account | P0 | 5 | FR-02, FR-09, FR-06 | S-06, S-09 |
| S-11 | Start using a created account through the email link | P0 | 5 | FR-09, NFR-01 | S-10 |
| S-12 | Send the account email again | P1 | 5 | FR-15, FR-06 | S-11 |
| S-13 | Sign up with the email of a waiting account | P1 | 4 | FR-16 | S-10 |
| S-14 | Waiting accounts are deleted after 30 days | P1 | 5 | FR-14, NFR-02 | S-11 |
| S-15 | Import people from a CSV file | P1 | 5 | FR-07, FR-09, FR-06 | S-10 |
| S-16 | CSV import skips wrong and existing rows | P1 | 5 | FR-07 | S-15 |
| S-17 | CSV file size limit | P2 | 3 | NFR-07, FR-07 | S-16 |
| S-18 | Change a user's display name | P1 | 4 | FR-04, FR-06 | S-08 |
| S-19 | Send a user a link to set a new password | P1 | 4 | FR-10, FR-06, NFR-01 | S-08 |
| S-20 | Block and unblock a user | P1 | 5 | FR-11, FR-06 | S-08 |
| S-21 | Delete a user account | P1 | 4 | FR-05, FR-06, NFR-02 | S-08 |
| S-22 | Delete the account of a family creator | P1 | 5 | FR-05 | S-21 |
| S-23 | Email users about admin actions | P1 | 4 | FR-18, NFR-04 | S-18, S-20, S-21 |
| S-24 | Record of staff actions | P1 | 5 | FR-17, FR-06 | S-04, S-12, S-15, S-18, S-19, S-20, S-21 |
| S-25 | Record of staff actions: deleted users and 1-year limit | P1 | 4 | FR-17, FR-05, FR-14, NFR-02 | S-24, S-14 |
| S-26 | Existing users agree to the updated privacy notice | P1 | 5 | FR-20 | S-09 |

## FR → Story traceability
| FR | Stories |
|---|---|
| FR-01 | S-01, S-02 |
| FR-02 | S-10 |
| FR-03 | S-06, S-07, S-08 |
| FR-04 | S-18 |
| FR-05 | S-21, S-22, S-25 |
| FR-06 | S-03, S-04, S-06, S-10, S-12, S-15, S-18, S-19, S-20, S-21, S-24 |
| FR-07 | S-15, S-16, S-17 |
| FR-08 | S-01 |
| FR-09 | S-10, S-11, S-15 |
| FR-10 | S-19 |
| FR-11 | S-20 |
| FR-12 | S-03, S-04 |
| FR-13 | S-09 |
| FR-14 | S-14, S-25 |
| FR-15 | S-12 |
| FR-16 | S-13 |
| FR-17 | S-24, S-25 |
| FR-18 | S-23 |
| FR-19 | S-05 |
| FR-20 | S-26 |

All 20 in-scope FRs are covered; no FR is deferred.

## NFR coverage
| NFR | Where it is checked |
|---|---|
| NFR-01 | S-03, S-05, S-11, S-19 (password rule); passwords never readable and encrypted connections apply to every story |
| NFR-02 | S-08 (no tasks), S-14 (30 days), S-21, S-25 (record without deleted users' data, 1 year) |
| NFR-03 | S-02 |
| NFR-04 | S-02 (admin area); S-01, S-03, S-05, S-10, S-12, S-19, S-23 (bilingual emails); S-09 (notice) |
| NFR-05 | Project constraint: within about 3 months after the TodoNow launch |
| NFR-06 | S-01 |
| NFR-07 | S-17 |

## Assumptions used by the stories
Accepted at GATE 1 (2026-10-13): A-03 (S-03, S-05, S-11), A-07 (S-02), A-08 (S-19), A-09
(S-20, S-21), A-10 (S-04), A-11 (S-01, S-03), A-12 (S-20), A-13 (S-22), A-14 (S-20), A-15
(S-12, S-14), A-16 (S-16), A-17 (S-01), A-18 (S-03), A-19 (S-24, S-14), A-20 (S-23, S-14),
A-21 (S-12), A-22 (S-13), A-23 (S-04, S-05), A-24 (S-17), A-25 (S-26), A-26 (S-07), A-27
(S-01, S-03, S-05), A-28 (S-25).

## Points not stated in the requirements (no AC written)
- How closely search text must match (S-06).
- What unblocking a never-activated (waiting) account returns it to (S-20).
- Logging out of the admin area (S-01).
- S-10 AC 4 (missing or invalid email, missing display name refused) and S-18 AC 3 (empty
  display name refused) apply the same input rule as CSV rows (A-16) to single entry.
- S-19 AC 4 (no password link for waiting accounts) follows BR-07: a waiting account becomes
  usable only after agreeing to the privacy notice.

## Size self-check
| Story | ACs | ≤ limit? | Split pattern used |
|---|---|---|---|
| S-01 | 5 | yes | by workflow: admin login, happy path first (recovery in S-05) |
| S-02 | 5 | yes | by business rule: language |
| S-03 | 5 | yes | CRUD: create admin access |
| S-04 | 5 | yes | CRUD: update and delete admin access |
| S-05 | 4 | yes | by workflow: admin recovery |
| S-06 | 5 | yes | CRUD: read list, simple version first (filters in S-07) |
| S-07 | 4 | yes | simple version first: filters added to search |
| S-08 | 3 | yes | CRUD: read one account |
| S-09 | 4 | yes | by channel: privacy notice content |
| S-10 | 5 | yes | CRUD: create one, happy path first (activation in S-11) |
| S-11 | 5 | yes | by role: invited person activates |
| S-12 | 5 | yes | by workflow: resend |
| S-13 | 4 | yes | by channel: self sign-up |
| S-14 | 5 | yes | by business rule: 30-day deletion |
| S-15 | 5 | yes | by data type/channel: CSV, happy path first |
| S-16 | 5 | yes | by workflow: errors and duplicates |
| S-17 | 3 | yes | by business rule: file size |
| S-18 | 4 | yes | CRUD: update |
| S-19 | 4 | yes | by workflow: password help |
| S-20 | 5 | yes | by business rule: reversible block |
| S-21 | 4 | yes | CRUD: delete, simple case first |
| S-22 | 5 | yes | by business rule: creator hand-over |
| S-23 | 4 | yes | by channel: email to users |
| S-24 | 5 | yes | by role: Administrator views record |
| S-25 | 4 | yes | by business rule: privacy of the record |
| S-26 | 5 | yes | by role: existing app user |

Every story has at most 5 acceptance criteria. Bundles split before drafting: login / language /
recovery; give access / change and remove; search / filter / view; create / activate / resend /
sign-up / 30-day deletion; import / skipped rows / size limit; delete / delete creator; record /
record privacy; notice text / existing users agree.
