# Requirement analysis: User administration (user-admin)

Signed-off: 2026-10-13 by Cong (stakeholder reply: "Xác nhận")

- Slug: `user-admin`
- Status: Signed off 2026-10-13. Open input: contact address for admin-action emails (A-20),
  not given at sign-off.
- Sources: see the table below

## Changelog
| Date | Round | Change |
|---|---|---|
| 2026-10-13 | 1 | Initial analysis of SRC-1 against the signed-off TodoNow requirements (SRC-2). Almost every requirement is provisional: the brief is one sentence. 19 questions written, Q-01..Q-07 in the first batch. |
| 2026-10-13 | 2 | Applied Q-01..Q-07. Q-01: administrators are the TodoNow team managing all user accounts (FR-01; A-01 confirmed; G-01, AMB-02 resolved). Q-02: roles are for admin-area staff only; app-user roles out of scope (FR-06; AMB-01 resolved). Q-03: admin login needs a second step (FR-08 added; G-02 partly resolved). Q-04: computer browsers only (NFR-03; G-06, C-04 resolved). Q-05: after the Tet 2027 launch (NFR-05; G-07 resolved; R-01 reduced). Q-06: CSV import adds groups of people from organisations, repeatedly (FR-07; G-04 resolved; R-02 updated). Q-07: created and imported people get an email with a link to set their password and agree to the privacy notice (FR-09 added, FR-02, FR-07 updated, BR-01 updated, BR-07 added; C-01 resolved; R-05 updated). Added follow-ups Q-20..Q-27, gaps G-16..G-20, assumption A-07. Revised options of unasked Q-08, Q-09, Q-11, Q-18 to remove app-user roles. |
| 2026-10-13 | 3 | Applied Q-08, Q-09, Q-10, Q-11, Q-13, Q-20, Q-21. Q-08: staff see account data only, never tasks (FR-03, BR-04; G-10, C-02 resolved). Q-09: staff may change the display name and send a link to set a new password; email and family changes out of scope (FR-04 updated, FR-10 added; G-05 resolved). Q-10: both block (reversible) and delete (permanent) (FR-05 updated, FR-11 added, BR-09 added; AMB-03 resolved; C-03 still open → Q-28). Q-11: CSV holds email and display name only (FR-07; G-08 resolved). Q-13: the technical team sets up the first Administrator; Administrators then give and remove admin access (FR-12 added; G-03 resolved; A-02 confirmed). Q-20: roles Administrator and Support with fixed rights (FR-06, BR-08; G-16 resolved). Q-21: separate admin accounts, not usable in the app (FR-01, FR-08 updated, BR-10 added). Added follow-ups Q-28..Q-31, gaps G-21..G-24, assumptions A-08..A-12. Revised option D of unasked Q-25. |
| 2026-10-13 | 4 | Applied Q-12, Q-17, Q-22, Q-24, Q-28, Q-29, Q-30. Q-22: the second login step is a one-time code sent to the staff member's admin email (FR-08, NFR-06; G-02 resolved). Q-30: a new staff member gets an email link to set their own password (FR-12; G-23 resolved). Q-28: when an Administrator deletes a family creator, the creator role passes automatically to another member, or the family is deleted if there is none (FR-05, BR-03; C-03, G-21 resolved; C-05 recorded and resolved). Q-29: blocking changes nothing for others (FR-11, BR-09; G-22 resolved). Q-12: CSV import creates good rows, skips wrong and existing ones and lists them with the reason (FR-07, BR-06; G-09 resolved; A-05 confirmed). Q-24: a waiting account is deleted automatically after 30 days (FR-14 added, BR-11 added; G-18 resolved). Q-17: the privacy notice is updated; the team drafts it in Vietnamese and English and the stakeholder approves it (FR-13 added; R-02 reduced). Added follow-up Q-32 and gap G-25 (existing users and the updated notice), assumptions A-13..A-18. Revised unasked Q-23 (30-day deletion) and Q-31 (no phone involved in the second step). |
| 2026-10-13 | 5 | Applied Q-14, Q-15, Q-19, Q-23, Q-27, Q-31, Q-32. Q-14: a record of staff actions, viewable in the admin area (FR-17 added, BR-16 added; G-11 resolved; who may view it follows Q-20: Administrator only). Q-15: users get an email when an Administrator changes, blocks or deletes their account (FR-18 added; G-13 resolved). Q-19: a CSV file holds up to about 1,000 people (NFR-07 added; G-15 resolved). Q-23: the account email link works 7 days and an Administrator can send a new one (FR-09 updated, FR-15 added, BR-13 added; G-17 resolved). Q-27: self sign-up with the email of a waiting account completes that account (FR-16 added, BR-14 added, BR-06 updated; G-20 resolved; A-06 confirmed with this change). Q-31: "forgot password" on the admin login page; lost admin email is handled by removing and giving access again (FR-19 added; G-24 resolved). Q-32: existing users must agree to the updated privacy notice before continuing (FR-20 added, BR-15 added; G-25 resolved; R-06 updated). Recorded C-06 (record vs deletion of personal data) and AMB-04 ("next login" while people stay logged in). Added follow-ups Q-33..Q-35, gaps G-26..G-27, assumptions A-19..A-25. Revised unasked Q-25 to cover the new emails about admin actions (G-19 widened). |
| 2026-10-13 | 6 | Applied Q-16, Q-18, Q-25, Q-26, Q-33, Q-34, Q-35. Q-16: the admin area is shown in Vietnamese and English following the browser language (NFR-04; G-12 resolved). Q-18: staff search by email or display name and filter the list (FR-03 updated; G-14 resolved; which filters: A-26). Q-25: emails to users because of the admin area are in Vietnamese and English in the same email (FR-09, FR-18, NFR-04 updated, BR-17 added; G-19 resolved; staff emails and the staff-sent password link: A-27, A-08 updated). Q-26: target within about 3 months after the TodoNow launch (NFR-05; R-01 updated). Q-33: when a user's account is deleted, the record of staff actions keeps only "deleted user" instead of their email and display name (FR-05, FR-14, FR-17 updated, BR-18 added; C-06, G-26 resolved). Q-34: records are deleted automatically after 1 year (FR-17, NFR-02 updated, BR-18; G-27 resolved; R-02 reduced). Q-35: existing users are asked to agree to the updated notice the next time they open the app (FR-20, BR-15 updated; AMB-04 resolved; A-25 updated). Added assumptions A-26..A-28. No question is open: requirements are clear for GATE 1. |

## Sources
| ID | File | Origin | Retrieved | Notes |
|---|---|---|---|---|
| SRC-1 | `sources/stakeholder-brief.md` | Stakeholder brief typed in chat | 2026-10-13 | One sentence: "We need user management with CRUD, roles and CSV import." |
| SRC-2 | `../todonow/requirements.md` | Signed-off TodoNow requirements (re-signed 2026-10-13) | 2026-10-13 | Context only, not a source of new scope. Cited for rules the admin area must respect or may conflict with. |
| CTX-1 | PM dispatch note | PM (main session), 2026-10-13 | 2026-10-13 | "this is an admin area for the existing TodoNow app". Confirmed by the stakeholder in Q-01. |
| Q-nn | `questions.md` | Stakeholder answers recorded by the PM | 2026-10-13 | Round 1 answers: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C". Round 2 answers: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A". Round 3 answers: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A". Round 4 answers: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B". Round 5 answers: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B". |

## 1. Business goal and problem statement
The stakeholder needs "user management with CRUD, roles and CSV import" (SRC-1): an admin area
for the existing TodoNow app, a PWA for busy families (SRC-2 §1). It is used by the TodoNow team
(e.g. support staff) to manage all TodoNow user accounts (Q-01), on a computer browser, in
Vietnamese and English (Q-04, Q-16). It is delivered after the Tet 2027 launch, within about 3
months after it; the app launches without it (Q-05, Q-26). Besides self sign-up (SRC-2 FR-03),
it lets staff add whole groups of people, such as members of a school, company or organisation,
by CSV import of up to about 1,000 people, repeatedly (Q-06, Q-19). Staff see account data only,
never tasks (Q-08). Staff actions are recorded and can be reviewed for 1 year (Q-14, Q-34), and
users are told by email when an Administrator changes, blocks or deletes their account (Q-15).
The privacy notice is updated to cover staff access and created accounts, and existing users
must agree to it the next time they open the app (Q-17, Q-32, Q-35). Success criteria beyond
the target date are not stated.

## 2. Actors / personas
| Actor | Description | Goals |
|---|---|---|
| Staff member with role "Administrator" | A member of the TodoNow team with a separate admin account (Q-21), logging in with email, password and a one-time code sent to their admin email (Q-03, Q-22) | Everything in the admin area: create, find, view, change display name, send password link, resend account email, block/unblock, delete user accounts; import CSV files; give and remove admin access; view the record of staff actions (Q-20, Q-13, Q-14, Q-18, Q-23) |
| Staff member with role "Support" | A member of the TodoNow team (e.g. support staff) with a separate admin account (Q-21), same login as above | Find, list and view user accounts and send a user a link to set a new password; nothing else (Q-20, Q-18) |
| New staff member | A TodoNow team member to whom an Administrator has just given admin access (Q-13) | Receives an email with a link, sets their own admin password, then logs in with the email code (Q-30, Q-22) |
| Technical team | The TodoNow technical team | Sets up the first Administrator outside the admin area (Q-13) |
| TodoNow user | Existing app user, family member or family creator (SRC-2 §2). Has no new role (Q-02) | Is the subject of user management; gets an email in Vietnamese and English when an Administrator changes, blocks or deletes their account (Q-15, Q-25); agrees to the updated privacy notice the next time they open the app (Q-32, Q-35) |
| Invited person | A person for whom staff created an account, one by one or by CSV import (Q-07) | Receives an email in Vietnamese and English with a link (works 7 days, can be sent again), sets a password and agrees to the privacy notice within 30 days, or signs up in the app with the same email, then uses TodoNow (Q-07, Q-23, Q-24, Q-25, Q-27) |
| Organisation (school, company, other) | Group whose members are added together by CSV import (Q-06). Does not use the admin area itself (Q-01) | Gets its members into TodoNow without each signing up alone |
| Stakeholder (product owner) | Signs off requirements; approves the privacy notice (SRC-2 FR-23) | Approve the updated privacy notice text (Q-17) |

## 3. Functional requirements
| ID | Requirement | Source | Status |
|---|---|---|---|
| FR-01 | The system shall provide an admin area, used in a computer browser, to manage all TodoNow user accounts. Only TodoNow team members with an admin account can use it. Admin accounts are separate from TodoNow app accounts (own email and password) and cannot be used to log in to the TodoNow app; TodoNow app accounts cannot log in to the admin area. | SRC-1; Q-01; Q-04; Q-21 | confirmed |
| FR-02 | The system shall let an Administrator create a user account for one person by entering an email address and a display name; the person then receives the account email of FR-09. | SRC-1 ("CRUD": create); Q-07; Q-09; Q-11; Q-20 | confirmed; duplicate email assumed refused (BR-06) |
| FR-03 | The system shall let staff (Administrator and Support) see a list of user accounts, search it by email or display name, filter it (by account status and by family; which filters exactly: A-26), and open one account to view its account data: email, display name, family, account status and when the account was created. Staff never see a user's tasks or anything about them. | SRC-1 ("CRUD": read); Q-08; Q-18; Q-20 | confirmed |
| FR-04 | The system shall let an Administrator change a user's display name. No other account data can be changed in the admin area (not the email address, not family membership). | SRC-1 ("CRUD": update); Q-09; Q-20 | confirmed |
| FR-05 | The system shall let an Administrator delete a user account permanently, with the same effects as a user deleting their own account (SRC-2 FR-16): the user's own tasks are deleted, also for the people they were shared with, the user is removed from their family and their personal data is removed, also from the record of staff actions (BR-18). If the user is a family creator, the creator role passes automatically to another member of the family (which member: A-13); if the family has no other member, the family is deleted. A user deleting their own account still follows SRC-2 FR-16 (hand over or delete the family first). | SRC-1 ("CRUD": delete); Q-10; Q-28; Q-33; SRC-2 FR-16 | confirmed |
| FR-06 | The system shall give each admin account exactly one role: "Administrator" may do everything in the admin area; "Support" may only list, search and view user accounts (FR-03) and send a user a link to set a new password (FR-10), and cannot create, change, block, delete, import, resend account emails, manage staff or view the record of staff actions. Roles apply to admin accounts only; TodoNow app users get no new roles. | SRC-1 ("roles"); Q-02; Q-20 | confirmed |
| FR-07 | The system shall let an Administrator add a group of people at once (e.g. members of a school, company or organisation) by importing a CSV file, as often as needed. Each row contains an email address and a display name only. The import creates an account for every valid row whose email has no TodoNow account yet; it skips rows that are wrong (what counts as wrong: A-16) and rows whose email already has a TodoNow account, and shows the Administrator a list of skipped rows with the reason for each. Existing accounts are never changed. Each imported person receives the account email of FR-09. Imported people are not joined to any family. A file holds up to about 1,000 people (NFR-07). | SRC-1 ("CSV import"); Q-06; Q-07; Q-11; Q-12; Q-19; Q-20 | confirmed; files over 1,000 rows assumed refused (A-24) |
| FR-08 | The system shall require a second step after email and password when a staff member logs in to the admin area with their admin account: a one-time code sent to the email address of that admin account, which the staff member enters to finish logging in. | Q-03; Q-21; Q-22 | confirmed; code validity assumed (A-17) |
| FR-09 | When an Administrator creates an account (one by one or by CSV import), the system shall send the person an email, written in Vietnamese and English in the same email, with a link where they set their password (meeting the password rule, BR-02) and agree to the privacy notice. The link works for 7 days. Until the person uses it (or signs up in the app with the same email, FR-16), the account cannot be used. | Q-07; Q-23; Q-25; SRC-2 FR-24, FR-27 | confirmed |
| FR-10 | The system shall let staff (Administrator and Support) send a user an email with a link to set a new password. | Q-09 option C; Q-20 | confirmed; assumed to work like the app's "forgot password", email in both languages (A-08) |
| FR-11 | The system shall let an Administrator block a user account so that the user cannot log in, and unblock it later so that the user can log in again with their data unchanged. Blocking changes nothing for other people: the user stays in their family (also as family creator) and the tasks they shared stay visible to the people they are shared with. | Q-10 option D; Q-20; Q-29 | confirmed; logout on block assumed (A-12) |
| FR-12 | The system shall let an Administrator give admin access to a TodoNow team member (create an admin account with an email address and a role) and remove it. The new staff member receives an email with a link to set their own admin password (meeting BR-02); after that they log in with the second step of FR-08. The first Administrator is set up by the technical team outside the admin area. | Q-13; Q-20; Q-21; Q-30 | confirmed; link validity assumed (A-18); role change and last Administrator assumed (A-10) |
| FR-13 | The privacy notice (SRC-2 FR-23) shall be updated to state that TodoNow team members can see and manage account data (not tasks) and that accounts can be created by staff or by import from a list provided by an organisation. The team drafts the updated text in Vietnamese and English; the stakeholder approves it before the admin area is used. | Q-17; SRC-2 FR-23 | confirmed |
| FR-14 | The system shall automatically delete an account created by an Administrator or by import if the person has not set a password and agreed to the privacy notice within 30 days (counted from: A-15). After deletion the account email link no longer works, the email address can be used again, and the person's email and display name are removed from the record of staff actions (BR-18). | Q-24; Q-33 | confirmed |
| FR-15 | The system shall let an Administrator send a new account email (FR-09) to a person whose account is still waiting, as long as the account exists (it is deleted 30 days after creation, FR-14). The new link works for 7 days. | Q-23 | confirmed; earlier links assumed to stop working (A-21) |
| FR-16 | When a person signs up in the TodoNow app by themselves (SRC-2 FR-03) with the email address of a waiting account, the sign-up shall complete that waiting account: the person sets their password and agrees to the privacy notice there, the account becomes usable, and the link in the account email stops working. | Q-27; SRC-2 FR-03, FR-24 | confirmed; display name kept from the Administrator or file (A-22) |
| FR-17 | The system shall keep a record of every action staff take in the admin area (who, what, when, to which account) and let staff with the role Administrator view it in the admin area. When a user's account is deleted (by an Administrator, by the user, or automatically after 30 days), the record no longer shows that user's email and display name, only "deleted user" with what was done, by whom and when. Each record is deleted automatically 1 year after the action. | Q-14; Q-20; Q-33; Q-34 | confirmed; which actions assumed (A-19); removed staff assumed (A-28) |
| FR-18 | The system shall send a user an email, written in Vietnamese and English in the same email, when an Administrator changes their display name, blocks their account or deletes their account. | Q-15; Q-25 | confirmed; which cases exactly assumed (A-20) |
| FR-19 | The system shall offer a "forgot password" link on the admin login page that sends a link to set a new admin password to the email address of the admin account. A staff member who can no longer open that email cannot recover the account: an Administrator removes the admin account and gives access again with a new email address (FR-12). | Q-31; Q-21; Q-22 | confirmed; link validity and last Administrator assumed (A-23) |
| FR-20 | When the updated privacy notice (FR-13) comes into use, every existing user who agreed to the old notice shall be asked to read and agree to the updated notice the next time they open the app, whether or not they log in again, and cannot continue using the app until they agree. | Q-32; Q-35; SRC-2 FR-24 | confirmed; refusal assumed (A-25) |

## 4. Non-functional requirements
TodoNow NFRs (SRC-2) assumed to apply to the admin area as well are marked (A-03).

| ID | Category | Requirement | Source |
|---|---|---|---|
| NFR-01 | Security / Data | Passwords are never stored in readable form, all connections are encrypted, and any password set must meet the TodoNow password rule. | SRC-2 NFR-04, FR-27 (A-03) |
| NFR-02 | Privacy | Personal data is not shared with or sold to anyone else. Staff see only the account data listed in FR-03 and never tasks. Data of people who never activate their account is not kept longer than 30 days (FR-14). The record of staff actions does not keep the email or display name of a deleted user, and each record is deleted after 1 year (FR-17). | SRC-2 NFR-07, NFR-08 (A-03); Q-08; Q-24; Q-14; Q-33; Q-34 |
| NFR-03 | Platform | The admin area is used in a computer browser only (assumed: current versions of Chrome, Edge, Firefox and Safari, A-07). It is not a target on phones. The TodoNow app itself stays phone-only (SRC-2 NFR-01). | Q-04; SRC-2 NFR-01 |
| NFR-04 | i18n | The admin area is shown in Vietnamese and English, following the browser language like the TodoNow app (SRC-2 FR-13: Vietnamese if the browser language is Vietnamese, English if it is English, Vietnamese otherwise; no language setting). Emails sent to users because of the admin area (FR-09, FR-18, and assumed FR-10, A-08) are written in Vietnamese and English in the same email. Emails to staff: A-27. The updated privacy notice is in Vietnamese and English (FR-13). | Q-16; Q-25; Q-17; SRC-2 FR-13, NFR-03 |
| NFR-05 | Constraint | The admin area is not part of the Tet 2027 launch; the TodoNow app launches without it. It should be ready within about 3 months after the TodoNow launch (launch before 2027-02-06, SRC-2 NFR-05). Small budget (SRC-2 NFR-06) assumed to apply. | Q-05; Q-26; SRC-2 NFR-05, NFR-06 |
| NFR-06 | Security / Access | Admin login uses a separate admin account and is protected by a one-time code sent to the admin account's email in addition to email and password (FR-08). | Q-03; Q-21; Q-22 |
| NFR-07 | Capacity | One CSV import handles a file with up to about 1,000 people, including sending up to about 1,000 account emails. | Q-19 |

## 5. Scope
- **In:** an admin area for TodoNow team members with a separate admin account, used in a
  computer browser, in Vietnamese and English following the browser language (Q-01, Q-04,
  Q-16, Q-21); login with a one-time code sent by email as second step (Q-03, Q-22); "forgot
  password" on the admin login page (Q-31); two staff roles, Administrator and Support (Q-20);
  Administrators give and remove admin access, the new staff member setting their own password
  through an email link, the first Administrator set up by the technical team (Q-13, Q-30);
  list, search by email or display name, filter, and view account data (Q-08, Q-18); create one
  account with email and display name; change the display name; send a link to set a new
  password (Q-09); block/unblock without effect on others, and permanent delete with automatic
  hand-over of the family creator role (Q-10, Q-28, Q-29); bulk creation of accounts from a CSV
  file with email and display name, up to about 1,000 people, repeatedly, skipping wrong and
  existing rows with a list of reasons (Q-06, Q-11, Q-12, Q-19); an account email in Vietnamese
  and English with a 7-day link to set a password and agree to the privacy notice for every
  created or imported person, which an Administrator can send again (Q-07, Q-23, Q-25); self
  sign-up completing a waiting account (Q-27); automatic deletion of accounts not activated
  within 30 days (Q-24); a record of staff actions viewable by Administrators, without the
  personal data of deleted users and kept 1 year (Q-14, Q-33, Q-34); emails in Vietnamese and
  English to users when an Administrator changes, blocks or deletes their account (Q-15, Q-25);
  an updated privacy notice in Vietnamese and English approved by the stakeholder, which existing
  users must agree to the next time they open the app (Q-17, Q-32, Q-35). Target: within about
  3 months after the TodoNow launch (Q-26).
- **Out:** new roles for TodoNow app users (Q-02); admin area on phones (Q-04); admin area as
  part of the Tet 2027 launch (Q-05); people outside the TodoNow team using the admin area
  (Q-01); administrators setting or handing out passwords for users or staff (Q-07, Q-30); staff
  seeing tasks or task counts (Q-08); changing a user's email address or family membership
  (Q-09); joining imported people to a family (Q-11); using an admin account in the TodoNow app
  or a TodoNow account in the admin area (Q-21); updating existing accounts from a CSV file
  (Q-12); authenticator apps or SMS for the second step (Q-22); hiding a blocked user from
  others (Q-29); automatic hand-over of the creator role when a user deletes their own account
  (SRC-2 FR-16, unchanged); recovering an admin account whose email can no longer be opened
  (Q-31: it is removed and given again with a new email); Support viewing the record of staff
  actions (Q-20); a language setting in the admin area or per user (Q-16, Q-25); keeping the
  email or name of a deleted user in the record of staff actions (Q-33); keeping records longer
  than 1 year (Q-34).
- **Not stated (not added unless the stakeholder asks):** exporting users to CSV; importing
  tasks; statistics or dashboards; an "organisation" grouping in the app (not asked; TodoNow
  has families only); exporting the record of staff actions; an email to the user when they
  are unblocked (A-20); search or filter in the record of staff actions.

## 6. Business rules and data entities
Business rules from SRC-2 that the admin area touches, and new rules:
- BR-01: An account cannot be used until the person has agreed to the privacy notice
  (SRC-2 BR-19, FR-24). For accounts created by an Administrator or by import, the person
  agrees through the link in the account email (Q-07, FR-09) or at self sign-up (Q-27, FR-16).
  Existing users must agree to the updated notice before they can continue (Q-32, BR-15).
- BR-02: Every password meets the password rule: at least 8 characters with a lowercase letter,
  an uppercase letter, a digit and a keyboard symbol, using only a-z, A-Z, 0-9 and keyboard
  symbols (SRC-2 BR-24). This also applies to the password set through the account email link,
  the password link of FR-10 and admin account passwords, including after "forgot password"
  (FR-19) (A-03).
- BR-03: Deletion by an Administrator has the same effects as a user deleting their own account:
  all the user's own tasks are deleted, also for the people they were shared with, the user is
  removed from their family and their personal data is removed (SRC-2 FR-16; Q-10), including
  from the record of staff actions (BR-18). If the user is a family creator, the creator role
  passes automatically to another member (A-13); if there is no other member, the family is
  deleted with the effects of SRC-2 FR-21 (Q-28).
- BR-04: Staff never see a user's tasks; they see only email, display name, family, account
  status and creation date (Q-08). Each user still sees only their own and shared tasks
  (SRC-2 NFR-07).
- BR-05: A user belongs to at most one family (SRC-2 BR-05).
- BR-06: An email address identifies one TodoNow account (implied by email and password login,
  SRC-2 FR-02). Creating an account for an email that already has one (waiting, active or
  blocked) is refused (assumed for single creation; for CSV import the row is skipped and
  listed with the reason, Q-12). Self sign-up with the email of a waiting account completes
  that account (Q-27, BR-14); with the email of an active or blocked account it is refused as
  today.
- BR-07: An account created by an Administrator or by import waits until the person sets a
  password and agrees to the privacy notice through the account email link or at self sign-up;
  until then nobody can log in with it (Q-07, Q-27).
- BR-08: Staff act only within the rights of their role (FR-06). Support may only list, search
  and view accounts and send a password link; every other action is refused for Support (Q-20).
- BR-09: A blocked user cannot log in to the TodoNow app until an Administrator unblocks them;
  blocking does not delete or hide any data and changes nothing for other people: family
  membership (including the creator role) and shared tasks stay as they are (Q-10, Q-29).
- BR-10: Admin accounts and TodoNow app accounts are separate: an admin account cannot log in to
  the TodoNow app and a TodoNow account cannot log in to the admin area (Q-21).
- BR-11: A waiting account (BR-07) that has not been activated within 30 days is deleted
  automatically (Q-24, A-15).
- BR-12: Admin login is complete only after the one-time code sent to the admin account's email
  is entered correctly (Q-22, A-17).
- BR-13: The account email link works for 7 days. An Administrator can send a new account email
  while the account is still waiting and exists (Q-23); this does not extend the 30 days of
  BR-11 (A-15) and earlier links stop working (A-21).
- BR-14: When a person signs up with the email of a waiting account, they set their password and
  agree to the privacy notice at sign-up, the waiting account becomes active, and its account
  email link stops working (Q-27).
- BR-15: An existing user who agreed to the old privacy notice is asked to agree to the updated
  notice the next time they open the app, whether or not they log in again, and cannot continue
  using the app until they have agreed (Q-32, Q-35; A-25).
- BR-16: Every staff action in the admin area is recorded with who did it, what, when and to
  which account; only Administrators can view the record (Q-14, Q-20; A-19).
- BR-17: Emails that TodoNow sends to users because of the admin area are written in Vietnamese
  and English in the same email, because TodoNow stores no language for each user (Q-25;
  SRC-2 FR-13). The admin area itself follows the browser language (Q-16).
- BR-18: When a user's account is deleted (by an Administrator, by the user, or automatically
  after 30 days), the record of staff actions keeps no email or display name of that user; it
  shows "deleted user" with what was done, by whom and when (Q-33). Every record is deleted
  automatically 1 year after the action (Q-34).
- Entities:
  - `User` (existing, SRC-2): email, password (never readable), display name, family (0 or 1),
    notification permission, privacy notice agreement (now: which version agreed to, Q-32). New
    attributes: account status (waiting / active / blocked) (Q-07, Q-10), how it was created
    (self sign-up, Administrator, import) (Q-07), creation date (Q-08). No app-user role (Q-02).
  - `Account email invitation` (new, Q-07): user, link, sent at, valid until (7 days, Q-23),
    state (sent, used, expired, replaced).
  - `Admin account` (new, Q-21): email, password (never readable), role (Administrator or
    Support), status (waiting for password / active / removed) (Q-30). Separate from `User`.
  - `Admin login code` (new, Q-22): admin account, code, sent at, valid until (A-17), used.
  - `Admin set-password link` (new, Q-30, Q-31): admin account, link, purpose (first password
    or forgot password), sent at, valid until (A-18, A-23), state.
  - `Role` (admin area only, Q-20): Administrator (all actions), Support (list, search, view,
    send password link).
  - `CSV import`: file, who imported it, when, rows (email, display name; Q-11; up to about
    1,000, Q-19), rows created, rows skipped with the reason (Q-12).
  - `Privacy notice` (existing, SRC-2): updated text in Vietnamese and English (Q-17); versions,
    so it is known which version each user agreed to (Q-32).
  - `Admin action record` (new, Q-14): staff member (admin account), action, when, account
    concerned (user account or admin account; "deleted user" without email or display name once
    the user account is deleted, Q-33), details (e.g. counts for an import). Deleted
    automatically 1 year after the action (Q-34).

## 7. Gaps (missing information)
- G-01: Who uses the admin area and what problem it solves. **Resolved by Q-01.**
- G-02: How administrators log in and how their accounts are protected. **Resolved by Q-03,
  Q-21 and Q-22** (separate admin account, email code as second step).
- G-03: Who creates the first administrator and who may manage administrators. **Resolved by
  Q-13.**
- G-04: Why users are imported from CSV and where the file comes from. **Resolved by Q-06.**
- G-05: Which fields of an account an administrator may change. **Resolved by Q-09.**
- G-06: Device and browser for the admin area. **Resolved by Q-04** (browsers: A-07).
- G-07: When the admin area is needed relative to the Tet 2027 launch. **Resolved by Q-05 and
  Q-26** (within about 3 months after launch).
- G-08: CSV file contents (columns). **Resolved by Q-11.**
- G-09: Handling of invalid rows and duplicates in the CSV file. **Resolved by Q-12** (what
  counts as wrong: A-16).
- G-10: What administrators see about a user. **Resolved by Q-08.**
- G-11: Whether administrator actions are recorded. **Resolved by Q-14, Q-33 and Q-34** (which
  actions: A-19).
- G-12: Language of the admin area. **Resolved by Q-16.**
- G-13: Whether users are told when an administrator changes, blocks or deletes their account.
  **Resolved by Q-15** (which cases exactly: A-20).
- G-14: How administrators find users in the list. **Resolved by Q-18** (which filters: A-26).
- G-15: Expected size of a CSV file. **Resolved by Q-19** (larger files: A-24).
- G-16: Exact list of admin-area roles and what each may do. **Resolved by Q-20.**
- G-17: How long the account email link works and whether it can be sent again. **Resolved by
  Q-23** (earlier links: A-21).
- G-18: What happens to accounts whose person never uses the link. **Resolved by Q-24**
  (deleted after 30 days; counted from: A-15).
- G-19: Language of the emails sent to users because of the admin area. **Resolved by Q-25**
  (Vietnamese and English in the same email; staff-sent password link: A-08; emails to staff:
  A-27).
- G-20: Self sign-up with an email that has a waiting account. **Resolved by Q-27** (display
  name: A-22).
- G-21: What happens to the family when an Administrator deletes a family creator. **Resolved
  by Q-28** (which member: A-13).
- G-22: What family members see of a blocked user (membership, shared tasks). **Resolved by
  Q-29.**
- G-23: How a new staff member sets their admin password and second step. **Resolved by Q-30**
  (with Q-22 there is nothing to set up for the second step; the code goes to the admin email).
- G-24: How a staff member regains access after a forgotten password or lost access to their
  admin email. **Resolved by Q-31** (link validity, last Administrator: A-23).
- G-25: Whether people who agreed to the old privacy notice must agree to the updated one
  (FR-13). **Resolved by Q-32 and Q-35** (refusal: A-25).
- G-26: What the record of staff actions keeps about a user whose account is later deleted.
  **Resolved by Q-33** ("deleted user", no email or display name).
- G-27: How long the record of staff actions is kept. **Resolved by Q-34** (1 year, then
  deleted automatically).

## 8. Ambiguities (more than one reading)
- AMB-01: "roles" (SRC-1). **Resolved by Q-02:** roles for admin-area staff only.
- AMB-02: "user management" (SRC-1). **Resolved by Q-01:** managing all TodoNow app user
  accounts by the TodoNow team.
- AMB-03: "Delete" (SRC-1 "CRUD"). **Resolved by Q-10:** both block (reversible) and delete
  (permanent).
- AMB-04: "At their next login" (Q-32 option A), while TodoNow users stay logged in until they
  log out (SRC-2 A-19). **Resolved by Q-35:** "The next time they open the app, whether or not
  they log in again".

## 9. Conflicts (sources disagree)
- C-01: Account creation without the person's agreement. SRC-2 FR-24: "The system shall require
  a visitor to agree to the privacy notice when signing up; an account is not created without
  this agreement." vs SRC-1: "user management with CRUD ... and CSV import". **Resolved by
  Q-07:** the person agrees through the account email link (or at self sign-up, Q-27) before
  the account can be used (FR-09, BR-01, BR-07); data of people who never agree is deleted
  after 30 days (Q-24); the privacy notice is updated (Q-17).
- C-02: Administrator access to user data. SRC-2 NFR-07: "Each user can see only their own tasks
  and the tasks currently shared with them." and NFR-08: "Personal data is not shared with or
  sold to anyone else." vs SRC-1 "CRUD" (read) on users. **Resolved by Q-08:** staff see account
  data only, never tasks; the privacy notice states staff access (Q-17).
- C-03: Deleting a family creator. SRC-2 FR-16: "A family creator must first hand over the
  creator role or delete the family." vs Q-10 "Both: block (reversible) and delete (permanent)"
  by an Administrator, who cannot ask the user to hand over the role first. **Resolved by Q-28:**
  the role passes automatically to another member, or the family is deleted if there is none.
- C-04: Platform. SRC-2 NFR-01: "Computer browsers are not a target in this phase." **Resolved
  by Q-04:** the admin area is for computer browsers only; the app stays phone-only.
- C-05: Automatic hand-over of the creator role. SRC-2 §Scope out: "automatic transfer of the
  creator role on account deletion (Q-21)" vs Q-28: "The creator role passes automatically to
  another member (for example the one who joined earliest); if there is no other member, the
  family is deleted". **Resolved by Q-28:** automatic hand-over applies only when an
  Administrator deletes the account; a user deleting their own account still hands over or
  deletes the family first (SRC-2 FR-16 unchanged). To be pointed out at GATE 1.
- C-06: Record of staff actions vs deletion of personal data. Q-14: "Yes, and administrators can
  view it in the admin area" (record of "who, what, when, to which account") vs FR-05 / SRC-2
  FR-16: deleting an account removes "the user's personal data". **Resolved by Q-33:** "The
  email and display name are removed from the record; it shows only "deleted user" with what
  was done, by whom and when" (BR-18).

## 10. Assumptions (provisional until confirmed)
- A-01: The admin area is part of TodoNow and manages TodoNow user accounts. **Confirmed by
  Q-01.**
- A-02: Only people explicitly given admin access can open the admin area; normal TodoNow users
  cannot. **Confirmed by Q-13 and Q-21.**
- A-03: The TodoNow security, privacy and password rules (SRC-2 NFR-04, NFR-07, NFR-08, FR-27)
  also apply to the admin area, to passwords set through the account email or password link,
  and to admin account passwords. To be confirmed at GATE 1.
- A-04: An administrator does not create, change or delete tasks or families from the admin
  area. **Confirmed by Q-08 and Q-09**; the only family effects are those of deletion (Q-28).
- A-05: CSV import only creates new accounts; it does not change or delete existing ones.
  **Confirmed by Q-12.**
- A-06: Self sign-up in the TodoNow app (SRC-2 FR-03) stays as it is. **Confirmed by Q-27**, with
  one change: signing up with the email of a waiting account completes that account (FR-16).
- A-07: "Computer browser" (Q-04) means current versions of Chrome, Edge, Firefox and Safari on
  a computer. To be confirmed at GATE 1.
- A-08: The link to set a new password sent by staff (FR-10) works like the app's "forgot
  password" recovery (SRC-2 FR-03) and, like it, does not log the user out on other phones
  (SRC-2 A-21). Because it is sent from the admin area and the user's interface language is not
  known, the email is written in Vietnamese and English in the same email, like the other emails
  of Q-25. To be confirmed at GATE 1.
- A-09: An Administrator can also delete or block an account that is still waiting; deleting it
  makes its account email link stop working. To be confirmed at GATE 1.
- A-10: An Administrator can also change a staff member's role (Administrator to Support and
  back), and the system does not allow removing or downgrading the last Administrator, so the
  admin area cannot be left without one. To be confirmed at GATE 1.
- A-11: An admin account may use the same email address as the staff member's own TodoNow app
  account; the two accounts are independent (BR-10). To be confirmed at GATE 1.
- A-12: Blocking a user logs them out at once on every phone, like "log out on all devices"
  (SRC-2 FR-26, BR-26). To be confirmed at GATE 1.
- A-13: When an Administrator deletes a family creator (Q-28), the creator role passes to the
  member who joined the family earliest, choosing among members who are not blocked if there are
  any. The new creator is not sent a message; they see the creator role in the app. To be
  confirmed at GATE 1 (Q-28 option B gave "the one who joined earliest" only as an example).
- A-14: Blocked users remain family creators while blocked (Q-29); the family simply cannot be
  managed until they are unblocked or deleted. To be confirmed at GATE 1.
- A-15: The 30 days of FR-14 are counted from the day the account was created; sending a new
  account email does not extend them. To be confirmed at GATE 1.
- A-16: A CSV row counts as wrong (Q-12) if the email is missing or not a valid email address,
  the display name is missing, or the email already appeared in an earlier row of the same file
  (the first such row is imported). A file that cannot be read as a CSV with these two columns
  is refused as a whole with a message. To be confirmed at GATE 1.
- A-17: The admin login code (FR-08) can be used once and works for 10 minutes; a new code is
  needed at every login, and the staff member can ask for a new code. To be confirmed at
  GATE 1.
- A-18: The link a new staff member receives to set their admin password (FR-12) can be used
  once and works for 24 hours; an Administrator can send a new one. To be confirmed at GATE 1.
- A-19: The record of staff actions (FR-17) contains every action that creates, changes, blocks,
  unblocks or deletes an account, sends an email to a user or staff member (password link,
  account email), imports a CSV file (with the numbers of rows created and skipped), or gives,
  removes or changes admin access. Viewing accounts, logging in and automatic deletions after 30
  days are not recorded. Nobody can change or delete a record in the admin area (records are
  only removed by the rules of BR-18). To be confirmed at GATE 1.
- A-20: The email of FR-18 is sent for a display-name change, a block and a deletion of an
  account that is active or blocked. It is not sent for a waiting account (the person never
  activated it), for an unblock, for the password link (that is itself an email) or for the
  automatic deletion after 30 days. It says what happened and how to contact the TodoNow team
  (the contact address is to be given by the stakeholder). To be confirmed at GATE 1.
- A-21: When an Administrator sends a new account email (FR-15), the links in earlier account
  emails for that account stop working. Only Administrators can send it (Q-23 says "an
  Administrator"; Support cannot, Q-20). To be confirmed at GATE 1.
- A-22: When self sign-up completes a waiting account (FR-16), the display name entered by the
  Administrator or in the CSV file is kept (TodoNow sign-up asks only for email and password,
  SRC-2 FR-03). To be confirmed at GATE 1.
- A-23: The admin "forgot password" link (FR-19) can be used once and works for 24 hours, like
  A-18. The page shows the same message whether or not the email has an admin account. After
  setting a new password the staff member still needs the email code (FR-08). If the last
  Administrator can no longer open their admin email, the technical team sets up an
  Administrator again, as for the first one (Q-13). An admin account's email address cannot be
  changed (Q-31: remove and give access again). To be confirmed at GATE 1.
- A-24: A CSV file with more than 1,000 rows is refused as a whole with a message asking to
  split it (Q-19: "Up to about 1,000"). The Administrator sees the list of created and skipped
  rows when the import has finished; account emails to imported people may take some minutes to
  arrive. To be confirmed at GATE 1.
- A-25: An existing user who does not agree to the updated privacy notice (FR-20) stays on the
  notice screen and can only log out; their account and data stay unchanged, and they are asked
  again the next time they open the app. "Open the app" includes starting it again or reloading
  it; a user who has the app open when the updated notice comes into use is asked the next time
  they start or reload it. People who activate a created account or sign up after the update
  agree to the updated notice directly. To be confirmed at GATE 1.
- A-26: The filters of Q-18 ("e.g. by account status, by family") are: account status
  (waiting, active, blocked) and family membership (in a family, family creator, not in a
  family). TodoNow families have no name (SRC-2 entity `Family`), so the list cannot be
  filtered by one particular family; from an account staff see whether the user is in a family
  and whether they are its creator. Search and filters can be combined. Support has the same
  search and filters. To be confirmed at GATE 1 (Q-18 option B gave the filters only as an
  example).
- A-27: Emails to staff (admin login code, link for a new staff member to set their password,
  admin "forgot password" link) are also written in Vietnamese and English in the same email,
  like the emails to users (Q-25). To be confirmed at GATE 1.
- A-28: Removing a staff member's admin access does not remove their name or email from the
  record of staff actions: the record keeps showing who did each action until the record itself
  is deleted after 1 year (Q-34). Q-33 covers deleted user accounts only. To be confirmed at
  GATE 1.

## 11. Risks and external dependencies
- R-01: Deadline. Reduced by Q-05: the admin area is not part of the Tet 2027 launch. Target
  within about 3 months after the launch (Q-26). Any change to TodoNow needed for it (account
  status, blocking, account email, sign-up completing a waiting account, automatic creator
  hand-over, updated privacy notice and the new agreement screen for existing users) should not
  disturb the launch scope, and delays to the TodoNow launch move this target with it.
- R-02: Legal / privacy. Accounts are created from lists provided by organisations (Q-06), so
  TodoNow stores the email and name of people who have not agreed yet and emails them (Q-07);
  staff can see account data (Q-08, no tasks); staff actions, including the accounts concerned,
  are recorded (Q-14). Reduced by Q-24 (such data is deleted after 30 days), Q-17 (updated
  privacy notice), Q-32 and Q-35 (existing users agree to it soon), Q-33 (no personal data of
  deleted users in the record) and Q-34 (records kept 1 year). It may still not match Vietnam's
  Decree 13/2023 on personal data protection; the team cannot give legal advice (SRC-2 R-04).
- R-03: Security. An Administrator account can change, block and delete every user account and
  manage other staff; if it is misused or its password is stolen, every user is affected.
  Reduced by the separate admin account (Q-21), the email code as second step (Q-03, Q-22), the
  limited Support role (Q-20), staff setting their own passwords (Q-30) and the record of staff
  actions (Q-14). Because the code and the "forgot password" link (Q-31) both go to the admin
  email, whoever controls that mailbox controls the admin account.
- R-04: Data quality. A CSV file from an organisation may contain wrong, duplicate or existing
  email addresses. Reduced by Q-12 (skipped and listed, existing accounts untouched).
- R-05: Email. The account email (Q-07, Q-23), the staff-sent password link (Q-09), the emails
  about admin actions (Q-15), the admin login code (Q-22), staff onboarding (Q-30) and admin
  "forgot password" (Q-31) all depend on reliable email delivery. If email delivery fails,
  created and imported people cannot start and staff cannot log in to the admin area; one
  import can send up to about 1,000 emails at once (Q-19), which email providers may limit or
  mark as spam.
- R-06: Updated privacy notice. The admin area depends on the stakeholder approving the updated
  text (FR-13). Because existing users must agree to it the next time they open the app (Q-32,
  Q-35), the TodoNow app also needs a new agreement screen, and users who do not agree cannot
  use the app until they do; this will interrupt users who open the app to do something quickly.
