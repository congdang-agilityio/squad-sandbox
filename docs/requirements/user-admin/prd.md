# PRD: TodoNow user administration

- Slug: `user-admin` · Analysis: `requirements.md` (signed off 2026-10-13 by Cong) · Version: 1
- Epic title: TodoNow admin area: user administration for the TodoNow team

## 1. Summary
An admin area, used in a computer browser in Vietnamese and English, where the TodoNow team
manages all TodoNow user accounts (Q-01, Q-04, Q-16). Staff log in with a separate admin
account and a one-time email code (Q-21, Q-22) and have one of two roles, Administrator or
Support (Q-20). Administrators find, view, create, rename, block, unblock and delete user
accounts, add groups of people from an organisation by CSV import, and manage staff access;
Support finds and views accounts and sends password links. Created and imported people start
through a bilingual account email (Q-07, Q-25). It ships after the Tet 2027 launch, within
about 3 months after it (Q-05, Q-26).

## 2. Goals and success metrics
| Goal | Metric | Target |
|---|---|---|
| TodoNow team can manage all user accounts without the technical team | Every in-scope FR delivered (stories in §8) | Within about 3 months after the TodoNow launch (NFR-05, Q-26) |
| Groups of people are added at once | One CSV import of up to about 1,000 people completes with a list of skipped rows | NFR-07, Q-19 |
| Staff actions are traceable | Every recorded action is viewable by Administrators for 1 year | FR-17, Q-14, Q-34 |
| Other success metrics | Not stated by the stakeholder | n/a |

## 3. Users
- Staff member with role Administrator (all admin-area actions).
- Staff member with role Support (list, search, filter and view accounts; send password link).
- New staff member (sets their own admin password through an email link).
- Technical team (sets up the first Administrator outside the admin area).
- TodoNow user (subject of management; gets emails about admin actions; agrees to the updated
  privacy notice).
- Invited person (created one by one or imported; activates through the account email or by
  signing up).
- Stakeholder (approves the updated privacy notice text).

## 4. Scope
- **In this release:**
  - FR-01 admin area in a computer browser, separate admin accounts
  - FR-02 create one user account
  - FR-03 list, search, filter and view account data (never tasks)
  - FR-04 change a user's display name
  - FR-05 permanent delete, with automatic creator hand-over
  - FR-06 roles Administrator and Support
  - FR-07 CSV import (email, display name), skipping wrong and existing rows
  - FR-08 email code as second login step
  - FR-09 bilingual account email with a 7-day link
  - FR-10 staff send a link to set a new password
  - FR-11 block and unblock
  - FR-12 give, change and remove admin access
  - FR-13 updated privacy notice
  - FR-14 automatic deletion of accounts not activated within 30 days
  - FR-15 send the account email again
  - FR-16 self sign-up completes a waiting account
  - FR-17 record of staff actions, kept 1 year, no personal data of deleted users
  - FR-18 bilingual email to users about name change, block and deletion
  - FR-19 admin "forgot password"
  - FR-20 existing users agree to the updated privacy notice
- **Out / later:** new roles for app users (Q-02); admin area on phones (Q-04); admin area in
  the Tet 2027 launch (Q-05); people outside the TodoNow team using it (Q-01); staff setting
  passwords for users or staff (Q-07, Q-30); staff seeing tasks or task counts (Q-08); changing
  a user's email or family membership (Q-09); joining imported people to a family (Q-11);
  updating existing accounts by CSV (Q-12); authenticator app or SMS (Q-22); hiding blocked
  users from others (Q-29); recovering an admin account whose mailbox is lost (Q-31); Support
  viewing the record (Q-20); a language setting (Q-16, Q-25); keeping deleted users' data in the
  record (Q-33); keeping records longer than 1 year (Q-34). Not stated, so not added: user
  export, task import, dashboards, organisation grouping, record export or search, email on
  unblock.

## 5. Requirements
| ID | Summary | Decided by |
|---|---|---|
| FR-01 | Admin area in a computer browser; separate admin accounts | Q-01, Q-04, Q-21 |
| FR-02 | Administrator creates one account (email, display name) | Q-07, Q-09, Q-11, Q-20 |
| FR-03 | List, search, filter and view account data; never tasks | Q-08, Q-18, Q-20 |
| FR-04 | Change display name only | Q-09, Q-20 |
| FR-05 | Permanent delete; creator role passes automatically | Q-10, Q-28, Q-33 |
| FR-06 | Roles Administrator and Support | Q-02, Q-20 |
| FR-07 | CSV import, skip wrong and existing rows | Q-06, Q-11, Q-12, Q-19 |
| FR-08 | One-time code to the admin email | Q-03, Q-22 |
| FR-09 | Account email, Vietnamese and English, 7-day link | Q-07, Q-23, Q-25 |
| FR-10 | Staff send a link to set a new password | Q-09, Q-20 |
| FR-11 | Block and unblock, nothing changes for others | Q-10, Q-29 |
| FR-12 | Give, change and remove admin access | Q-13, Q-30 |
| FR-13 | Updated privacy notice approved by the stakeholder | Q-17 |
| FR-14 | Waiting accounts deleted after 30 days | Q-24, Q-33 |
| FR-15 | Send the account email again | Q-23 |
| FR-16 | Self sign-up completes a waiting account | Q-27 |
| FR-17 | Record of staff actions | Q-14, Q-33, Q-34 |
| FR-18 | Email to users about admin actions | Q-15, Q-25 |
| FR-19 | Admin "forgot password" | Q-31 |
| FR-20 | Existing users agree to the updated notice | Q-32, Q-35 |
| NFR-01 | Passwords never readable, encrypted connections, password rule | A-03 |
| NFR-02 | Privacy limits on staff access and retention | Q-08, Q-24, Q-33, Q-34 |
| NFR-03 | Computer browsers only | Q-04 |
| NFR-04 | Vietnamese and English | Q-16, Q-25 |
| NFR-05 | Within about 3 months after launch | Q-05, Q-26 |
| NFR-06 | Separate admin account plus email code | Q-03, Q-21, Q-22 |
| NFR-07 | Up to about 1,000 people per CSV file | Q-19 |

## 6. Key decisions
| Question | Decision |
|---|---|
| Q-01 | Users are the TodoNow team, managing all user accounts |
| Q-02 | Roles are for admin-area staff only |
| Q-04 | Computer browser only |
| Q-05, Q-26 | After the Tet 2027 launch, within about 3 months |
| Q-06, Q-11, Q-19 | CSV adds groups from organisations; email and display name; up to about 1,000 rows |
| Q-07, Q-23, Q-25 | Account email with a 7-day link; resendable; Vietnamese and English in one email |
| Q-08 | Staff see account data only, never tasks |
| Q-09 | Staff may change the display name and send a password link |
| Q-10, Q-28, Q-29 | Block (no effect on others) and delete (creator role passes automatically) |
| Q-12 | Import good rows, skip and list wrong and existing ones |
| Q-13, Q-30 | Technical team sets up the first Administrator; new staff set their own password by link |
| Q-14, Q-33, Q-34 | Record viewable by Administrators; "deleted user" after deletion; kept 1 year |
| Q-15 | Users get an email about name change, block and deletion |
| Q-16 | Admin area follows the browser language |
| Q-17, Q-32, Q-35 | Privacy notice updated; existing users agree the next time they open the app |
| Q-18 | Search by email or display name, plus filters |
| Q-20 | Administrator does everything; Support looks and sends password links |
| Q-21, Q-22 | Separate admin account; one-time code sent to the admin email |
| Q-24 | Waiting accounts deleted after 30 days |
| Q-27 | Self sign-up completes a waiting account |
| Q-31 | Admin "forgot password"; lost mailbox means remove and give access again |

## 7. Assumptions, deferred items and risks
- Remaining assumptions (each accepted at GATE 1 on 2026-10-13, where the stakeholder confirmed
  `understanding.md` including its assumption list): A-03, A-07 to A-28 as written in
  `requirements.md` §10. They are used in the stories (see `stories.md`).
- Open input (not a decision): the TodoNow team contact address shown in the email about admin
  actions (A-20) was not given at sign-off (`sources/stakeholder-notes.md`). S-23 cannot be
  finished until the stakeholder provides it.
- Deferred: none.
- Risks: R-01 deadline relative to the launch; R-02 legal and privacy (Decree 13/2023, no legal
  advice); R-03 Administrator account misuse, admin mailbox controls code and recovery; R-04
  CSV data quality; R-05 email delivery, including up to about 1,000 emails per import; R-06
  the updated notice interrupts existing users and depends on stakeholder approval.

## 8. Story map
Suggested delivery order:
1. S-01 Log in to the admin area with an email code
2. S-02 Admin area language follows the browser
3. S-03 Give a team member admin access
4. S-04 Change a staff member's role or remove their access
5. S-05 Reset a forgotten admin password
6. S-06 Find user accounts by search
7. S-07 Filter the user list
8. S-08 View a user account
9. S-09 Publish the updated privacy notice
10. S-10 Create one user account
11. S-11 Start using a created account through the email link
12. S-12 Send the account email again
13. S-13 Sign up with the email of a waiting account
14. S-14 Waiting accounts are deleted after 30 days
15. S-15 Import people from a CSV file
16. S-16 CSV import skips wrong and existing rows
17. S-17 CSV file size limit
18. S-18 Change a user's display name
19. S-19 Send a user a link to set a new password
20. S-20 Block and unblock a user
21. S-21 Delete a user account
22. S-22 Delete the account of a family creator
23. S-23 Email users about admin actions
24. S-24 Record of staff actions
25. S-25 Record of staff actions: deleted users and 1-year limit
26. S-26 Existing users agree to the updated privacy notice
