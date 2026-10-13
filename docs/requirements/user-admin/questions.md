# Clarifying questions: User administration (user-admin)

- Slug: `user-admin`
- Open: 0 · Answered: 0 · Confirmed: 35 · Deferred: 0
- Next batch to ask: none (requirements clear; next step GATE 1)

Rules: the PM asks each question **verbatim** (translation allowed, no rephrasing, merging or
answering) and records the answer verbatim plus an English translation. Only the BA changes a
status to `confirmed` or `deferred`.

---

### Q-01: Who uses the admin area, and for what
- **Question:** Who will use this user management area, and what problem does it solve for them?
- **Why it matters:** This decides the whole design. Staff of the TodoNow team managing all users is a very different product from, for example, a family creator or a company managing only their own people.
- **Related:** FR-01, AMB-02, G-01, A-01
- **Options:**
  - A) Our own TodoNow team (e.g. support staff), to manage all TodoNow user accounts
  - B) Someone outside our team (for example a school, company or large family) who manages only their own group of people in TodoNow
  - C) Other (please describe)
- **Answer (original):** "1.A" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option A) Our own TodoNow team (e.g. support staff), to manage all TodoNow user accounts
- **Status:** confirmed
- **BA note:** Applied in round 2: FR-01 updated; A-01 confirmed; G-01 and AMB-02 resolved. Administrators are TodoNow team members and manage all TodoNow user accounts.

### Q-02: What "roles" means
- **Question:** You mentioned "roles". Which of these do you mean?
- **Why it matters:** Roles for admin-area staff only affect the admin area. New roles for app users change what people can do inside the TodoNow app, which changes the signed-off TodoNow requirements.
- **Related:** FR-06, AMB-01
- **Options:**
  - A) Roles for people using the admin area (for example "Administrator" who can do everything and "Support" who can only look)
  - B) New roles for TodoNow app users that change what they can do in the app (for example "parent" and "child")
  - C) Both A and B
  - D) Other (please list the roles you have in mind and what each may do)
- **Answer (original):** "2.A" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option A) Roles for people using the admin area (for example "Administrator" who can do everything and "Support" who can only look)
- **Status:** confirmed
- **BA note:** Applied in round 2: FR-06 updated; AMB-01 resolved; new roles for app users are out of scope. The option gave the roles only as an example, so the exact list of roles and what each may do is asked in follow-up Q-20. Q-08, Q-09, Q-11 and Q-18 options that mentioned a role for app users were revised.

### Q-03: How administrators log in
- **Question:** How should people log in to the admin area?
- **Why it matters:** An administrator can see and change every account, so a stolen admin password affects all users. It also decides whether an administrator is a normal TodoNow user with extra rights or a separate account.
- **Related:** FR-01, G-02, A-02, R-03
- **Options:**
  - A) With their normal TodoNow email and password; their account is given admin rights
  - B) With a separate admin account (own email and password), not usable in the TodoNow app
  - C) Like A or B, plus a second step such as a one-time code
  - D) Other (please describe)
- **Answer (original):** "3.C" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option C) Like A or B, plus a second step such as a one-time code
- **Status:** confirmed
- **BA note:** Applied in round 2: FR-08 added (admin login always needs a second step after email and password). Option C leaves open whether the login is the normal TodoNow account (A) or a separate admin account (B), and what the second step is; these are asked in follow-ups Q-21 and Q-22. G-02 is only partly resolved.

### Q-04: Device for the admin area
- **Question:** On which device will the admin area be used?
- **Why it matters:** The TodoNow app is built for phones only and "computer browsers are not a target in this phase". Admin work such as importing a CSV file is usually done on a computer.
- **Related:** NFR-03, G-06, C-04
- **Options:**
  - A) On a computer browser only
  - B) On phones only, like the TodoNow app
  - C) Both computer and phone
  - D) Other (please describe)
- **Answer (original):** "4.A" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option A) On a computer browser only
- **Status:** confirmed
- **BA note:** Applied in round 2: NFR-03 updated; G-06 and C-04 resolved. The admin area targets computer browsers only; the TodoNow app itself stays phone-only. Which browsers is recorded as assumption A-07.

### Q-05: When it is needed
- **Question:** When must user management be ready?
- **Why it matters:** TodoNow must launch before Tet 2027 (6 February 2027) and the schedule already has little room. Adding the admin area to the launch increases that risk.
- **Related:** NFR-05, G-07, R-01
- **Options:**
  - A) It must be ready for the Tet 2027 launch together with the app
  - B) After the launch; the app launches without it
  - C) Part for the launch (please say which part), the rest later
  - D) Other (please describe)
- **Answer (original):** "5.B" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option B) After the launch; the app launches without it
- **Status:** confirmed
- **BA note:** Applied in round 2: NFR-05 updated; G-07 resolved; R-01 reduced. The admin area is not part of the Tet 2027 launch. Whether there is a target date after launch is asked in follow-up Q-26.

### Q-06: Purpose of CSV import
- **Question:** Why do you need to import users from a CSV file, and where will the file come from?
- **Why it matters:** TodoNow already lets people sign up by themselves. The reason decides what the file contains, how big it is, and whether those people agreed to be added.
- **Related:** FR-07, G-04, R-02, R-04
- **Options:**
  - A) To move existing users from another app or list into TodoNow (one time)
  - B) To add a group of people at once, e.g. members of a school, company or organisation (repeated)
  - C) Other (please describe)
- **Answer (original):** "6.B" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option B) To add a group of people at once, e.g. members of a school, company or organisation (repeated)
- **Status:** confirmed
- **BA note:** Applied in round 2: FR-07 updated; G-04 resolved; R-02 updated (the people in the file did not agree to TodoNow themselves; their organisation provides the list). Whether imported people are connected in the app (e.g. joined to a family) stays with Q-11.

### Q-07: First access for users created by an administrator or by import
- **Question:** When an administrator creates an account (one by one or by CSV import), how does that person start using TodoNow?
- **Why it matters:** Today an account is only created when the person signs up themselves and agrees to the privacy notice. The app sends no welcome or invitation emails. Accounts made by someone else need a way to get a password and to agree to the privacy notice.
- **Related:** FR-02, FR-07, C-01, BR-01, BR-02, A-03, A-06, R-02, R-05
- **Options:**
  - A) The administrator sets a temporary password and gives it to the person; at first login the person must choose a new password and agree to the privacy notice
  - B) The person uses "forgot password" to set their own password; at first login they agree to the privacy notice
  - C) The app sends the person an email with a link to set their password and agree to the privacy notice
  - D) Other (please describe)
- **Answer (original):** "7.C" (stakeholder reply 2026-10-13: "1.A, 2.A, 3.C, 4.A, 5.B, 6.B, 7.C")
- **Answer (English):** Option C) The app sends the person an email with a link to set their password and agree to the privacy notice
- **Status:** confirmed
- **BA note:** Applied in round 2: FR-09 added, FR-02 and FR-07 updated, BR-01 and BR-07 updated/added, C-01 resolved, R-05 updated. This adds a new kind of email (account invitation). Follow-ups: how long the link works and resending (Q-23), accounts never activated (Q-24), email language (Q-25), self sign-up while an invitation is pending (Q-27).

### Q-08: What administrators can see
- **Question:** What may an administrator see about a user?
- **Why it matters:** The signed-off rules say each user sees only their own and shared tasks, and personal data is not shared with anyone. Letting staff see tasks may also require a change to the privacy notice.
- **Related:** FR-03, C-02, G-10, BR-04, A-04, R-02
- **Options:**
  - A) Account data only (email, display name, family, account status, when the account was created); never tasks
  - B) Account data and the number of tasks, but not their content
  - C) Account data and the user's tasks (read only)
  - D) Other (please describe)
- **Answer (original):** "8.A" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option A) Account data only (email, display name, family, account status, when the account was created); never tasks
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-03 updated; BR-04 updated; G-10 and C-02 resolved (staff never see tasks or task counts). A-04 confirmed for tasks. Whether the privacy notice must mention staff access stays with Q-17.

### Q-09: What administrators can change
- **Question:** Which parts of a user account may an administrator change? (more than one answer is possible)
- **Why it matters:** Each item is extra work and some affect the user strongly, e.g. changing the email changes how they log in.
- **Related:** FR-02, FR-04, G-05, A-04
- **Options:**
  - A) Display name
  - B) Email address
  - C) Send the user an email with a link to set a new password
  - D) Family membership (add to or remove from a family)
  - E) Other (please describe)
- **Answer (original):** "9.AC" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Options A) Display name; C) Send the user an email with a link to set a new password
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-04 updated (display name only), FR-10 added (send a link to set a new password); G-05 resolved. Changing the email address and family membership are out of scope; A-04 confirmed for families. Assumed: the link is the same as the app's "forgot password" email and does not log the user out on other phones (A-08, following SRC-2 A-21).

### Q-10: What "delete" does
- **Question:** When an administrator deletes a user, what should happen?
- **Why it matters:** When a user deletes their own account today, all their tasks are deleted (also for the people they shared them with) and a family creator must first hand over the role or delete the family. An administrator cannot do the hand-over for them.
- **Related:** FR-05, C-03, AMB-03, BR-03
- **Options:**
  - A) Same as the user deleting their own account; for a family creator, the administrator must first pick the new creator or delete the family
  - B) Same as A, but the family creator role passes automatically to another member (or the family is deleted if there is none)
  - C) No real deletion: the account is blocked (cannot log in) and can be unblocked later
  - D) Both: block (reversible) and delete (permanent)
  - E) Other (please describe)
- **Answer (original):** "10.D" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option D) Both: block (reversible) and delete (permanent)
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-05 updated (permanent delete), FR-11 added (block and unblock); AMB-03 resolved. Option D does not say what happens when the user being deleted is a family creator (options A and B covered this), so C-03 stays open → follow-up Q-28. What other people see of a blocked user (shared tasks, family) → follow-up Q-29. Assumed: blocking logs the user out on all phones at once (A-12).

### Q-11: Contents of the CSV file
- **Question:** What information will each row of the CSV file contain?
- **Why it matters:** It decides what is created per person and what the import checks.
- **Related:** FR-07, G-08
- **Options:**
  - A) Email and display name only
  - B) Email, display name and the family the person should join
  - C) Other (please describe or share an example file)
- **Answer (original):** "11.A" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option A) Email and display name only
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-07 updated; G-08 resolved. Imported people are not joined to a family; they can join one later through the normal family invitation (SRC-2 FR-14). Q-25 option D revised because the file has no language column.

### Q-12: Errors and duplicates in the CSV file
- **Question:** If some rows in the CSV file are wrong (e.g. invalid email) or the email already has a TodoNow account, what should happen?
- **Why it matters:** Files from outside sources often contain mistakes; existing users must not be changed by accident.
- **Related:** FR-07, G-09, A-05, BR-06, R-04
- **Options:**
  - A) Create the good rows, skip the wrong and existing ones, and show a list of skipped rows with the reason
  - B) Import nothing if any row is wrong; show all problems so the file can be fixed
  - C) Create the good rows and update existing accounts with the file's data
  - D) Other (please describe)
- **Answer (original):** "12.A" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option A) Create the good rows, skip the wrong and existing ones, and show a list of skipped rows with the reason
- **Status:** confirmed
- **BA note:** Applied in round 4: FR-07 and BR-06 updated; G-09 resolved; A-05 confirmed (existing accounts are never changed by import); R-04 reduced. What counts as a "wrong" row (missing or invalid email, missing display name, same email twice in one file) and refusing an unreadable file as a whole are recorded as assumption A-16, to be confirmed at GATE 1.

### Q-13: Who manages administrators
- **Question:** Who gives admin access to a person and who can take it away?
- **Why it matters:** Someone must be the first administrator, and a wrong person with admin access can change every account.
- **Related:** FR-06, G-03, A-02, R-03
- **Options:**
  - A) Our technical team sets up the first administrator; after that, administrators can give and remove admin access in the admin area
  - B) Only our technical team gives and removes admin access (not possible in the admin area)
  - C) Other (please describe)
- **Answer (original):** "13.A" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option A) Our technical team sets up the first administrator; after that, administrators can give and remove admin access in the admin area
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-12 added; G-03 resolved; A-02 confirmed. With Q-21 (separate admin accounts), giving access means creating an admin account with a role. How a new staff member sets their password and second step → follow-up Q-30. Assumed: an Administrator can also change a staff member's role, and the last Administrator cannot be removed (A-10).

### Q-14: Record of administrator actions
- **Question:** Should the system keep a record of what each administrator did (who, what, when, to which account)?
- **Why it matters:** It helps find mistakes or misuse and answer users' complaints, but it is extra work.
- **Related:** G-11, R-03
- **Options:**
  - A) Yes, and administrators can view it in the admin area
  - B) Yes, kept by the system but only viewable by the technical team on request
  - C) No
  - D) Other (please describe)
- **Answer (original):** "14.A" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option A) Yes, and administrators can view it in the admin area
- **Status:** confirmed
- **BA note:** Applied in round 5: FR-17 and BR-16 added, entity "Admin action record" defined; G-11 resolved; R-03 reduced. The question was written before the roles were decided; following Q-20 (Support may only list and view accounts and send a password link), only staff with the role Administrator can view the record. Which actions are recorded (all actions that change something or send an email, not views or logins; records cannot be changed) is assumption A-19. The record names the account concerned, while deleting an account removes the user's personal data (C-06) → follow-up Q-33; how long the record is kept → follow-up Q-34.

### Q-15: Telling users about admin actions
- **Question:** Should a user be told when an administrator changes, blocks or deletes their account?
- **Why it matters:** Without a message the user may be surprised that they cannot log in. A message by email is a new kind of email the app does not send today.
- **Related:** G-13, R-05
- **Options:**
  - A) No message
  - B) An email to the user
  - C) A message shown in the app at their next login (not possible after deletion)
  - D) Other (please describe)
- **Answer (original):** "15.B" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option B) An email to the user
- **Status:** confirmed
- **BA note:** Applied in round 5: FR-18 added; G-13 resolved; R-05 updated. The only change an Administrator can make is the display name (Q-09). Assumed (A-20): sent for a display-name change, block and deletion of an active or blocked account; not for waiting accounts, unblock, the password link or the automatic 30-day deletion; it says what happened and how to contact the TodoNow team. The language of these emails is not known because TodoNow stores no language preference, so unasked Q-25 was widened to cover them.

### Q-16: Language of the admin area
- **Question:** In which language should the admin area be shown?
- **Why it matters:** Two languages mean every screen and message is written and checked twice.
- **Related:** NFR-04, G-12
- **Options:**
  - A) Vietnamese only
  - B) English only
  - C) Vietnamese and English, following the browser language like the TodoNow app
  - D) Other (please describe)
- **Answer (original):** "16.C" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option C) Vietnamese and English, following the browser language like the TodoNow app
- **Status:** confirmed
- **BA note:** Applied in round 6: NFR-04 updated, BR-17 added; G-12 resolved. "Like the TodoNow app" means the rule of SRC-2 FR-13: Vietnamese if the browser language is Vietnamese, English if it is English, Vietnamese otherwise, with no language setting. Emails to staff are assumed to be in both languages in the same email (A-27).

### Q-17: Privacy notice
- **Question:** The current privacy notice says what TodoNow stores and why. Should it be updated to say that administrators can see and manage accounts, and that accounts can be created by import?
- **Why it matters:** Users agreed to the current notice. Staff access to personal data and imported accounts may need to be stated. The team cannot give legal advice.
- **Related:** C-02, BR-01, R-02
- **Options:**
  - A) Yes: the team drafts the updated text in Vietnamese and English and you approve it
  - B) No change
  - C) Ask a lawyer first
  - D) Other (please describe)
- **Answer (original):** "17.A" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option A) Yes: the team drafts the updated text in Vietnamese and English and you approve it
- **Status:** confirmed
- **BA note:** Applied in round 4: FR-13 added; C-01 and C-02 notes updated; R-02 reduced; R-06 added. Assumed in FR-13: the approved text must be in place before the admin area is used. Users have agreed to the current notice, so whether they must agree to the updated one → follow-up Q-32.

### Q-18: Finding users
- **Question:** How should an administrator find a user in the list?
- **Why it matters:** With many users, a list without search is unusable; each filter is extra work.
- **Related:** FR-03, G-14
- **Options:**
  - A) Search by email or display name
  - B) A plus filters (e.g. by account status, by family)
  - C) Just a list sorted by name, no search
  - D) Other (please describe)
- **Answer (original):** "18.B" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option B) A plus filters (e.g. by account status, by family)
- **Status:** confirmed
- **BA note:** Round 2: removed "by role" from option B (app users have no roles, Q-02). Applied in round 6: FR-03 updated (search by email or display name, filters by account status and by family); G-14 resolved. The option gave the filters only as an example, and TodoNow families have no name (SRC-2 entity `Family`), so the exact filters (status: waiting, active, blocked; family: in a family, family creator, not in a family; combinable; same for Support) are assumption A-26, to be confirmed at GATE 1.

### Q-19: Size of a CSV import
- **Question:** About how many people will one CSV file contain?
- **Why it matters:** A few dozen rows and tens of thousands of rows need different handling and waiting times.
- **Related:** FR-07, G-15
- **Options:**
  - A) Up to about 100
  - B) Up to about 1,000
  - C) More than 1,000 (please give a number)
  - D) Other (please describe)
- **Answer (original):** "19.B" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option B) Up to about 1,000
- **Status:** confirmed
- **BA note:** Applied in round 5: NFR-07 added, FR-07 updated; G-15 resolved; R-05 updated (up to about 1,000 account emails sent by one import). Assumed (A-24): a file with more than 1,000 rows is refused as a whole with a message asking to split it, and account emails may take some minutes to arrive.

### Q-20: Which admin-area roles, and what each may do
- **Question:** Which roles should the admin area have, and what may each role do?
- **Why it matters:** You chose roles for admin-area staff (Q-02), with "Administrator" and "Support" given only as an example. Each role decides which buttons each staff member sees and which actions are refused.
- **Related:** FR-06, G-16, Q-02
- **Options:**
  - A) Two roles: "Administrator" can do everything; "Support" can only look (list and view accounts)
  - B) Two roles: "Administrator" can do everything; "Support" can look and also send a user a link to set a new password, but cannot create, change, delete or import
  - C) Other (please list each role and what it may do)
- **Answer (original):** "20.B" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option B) Two roles: "Administrator" can do everything; "Support" can look and also send a user a link to set a new password, but cannot create, change, delete or import
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-06 and BR-08 updated; G-16 resolved. Support may only list and view accounts (FR-03) and send the password link (FR-10). Everything else, including block/unblock (FR-11) and managing staff access (FR-12), is Administrator only, because option B lists Support's allowed actions explicitly. Round 5: the same applies to resending the account email (FR-15) and viewing the record of staff actions (FR-17). Round 6: searching and filtering the list (Q-18) is part of "look", so Support can use it.

### Q-21: Admin login account
- **Question:** For the admin login you chose a second step (Q-03). Which account do staff use before that second step?
- **Why it matters:** With their normal TodoNow account, one password opens both the app and the admin area. With a separate account, a staff member's personal TodoNow use is kept apart from admin access.
- **Related:** FR-01, FR-08, G-02, A-02, R-03, Q-03
- **Options:**
  - A) Their normal TodoNow email and password; their account is given admin rights
  - B) A separate admin account (own email and password), not usable in the TodoNow app
  - C) Other (please describe)
- **Answer (original):** "21.B" (stakeholder reply 2026-10-13: "20.B, 21.B, 8.A, 9.AC, 10.D, 13.A, 11.A")
- **Answer (English):** Option B) A separate admin account (own email and password), not usable in the TodoNow app
- **Status:** confirmed
- **BA note:** Applied in round 3: FR-01 and FR-08 updated; entity "Admin account" defined; G-02 now open only for the form of the second step (Q-22). Assumed: an admin account may use the same email as the staff member's own TodoNow app account; the two are independent (A-11). Recovering a forgotten admin password or lost second step → follow-up Q-31.

### Q-22: Form of the second login step
- **Question:** What should the second login step for the admin area be?
- **Why it matters:** Each form has a different cost and effort for staff: an email code needs nothing extra, an authenticator app needs a phone app, an SMS code costs money per message.
- **Related:** FR-08, G-02, R-03, Q-03
- **Options:**
  - A) A one-time code sent to the staff member's email
  - B) A one-time code from an authenticator app on the staff member's phone (e.g. Google Authenticator)
  - C) A one-time code sent by SMS
  - D) Other (please describe)
- **Answer (original):** "22.A" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option A) A one-time code sent to the staff member's email
- **Status:** confirmed
- **BA note:** Follow-up of Q-03 (round 2). Applied in round 4: FR-08 and NFR-06 updated, BR-12 added, entity "Admin login code" added; G-02 resolved; R-03 and R-05 updated (the mailbox of the admin account now controls the second step, and admin login depends on email delivery). Assumed: the code is single use, works for 10 minutes and is needed at every login (A-17). Q-31 revised: no phone or app is involved in the second step.

### Q-23: How long the account email link works
- **Question:** How long should the link in the account email (from Q-07) work, and what if it stops working before the person uses it? (An account whose link is never used is deleted 30 days after it was created, Q-24.)
- **Why it matters:** A link that works for a long time is a risk if the email is forwarded or read by someone else; a short one means many people miss it and need a new one.
- **Related:** FR-09, FR-14, G-17, Q-07, Q-24
- **Options:**
  - A) 7 days (like family invitations); an Administrator can send a new link while the account still exists
  - B) 48 hours; an Administrator can send a new link while the account still exists
  - C) It keeps working until it is used or the account is deleted after 30 days
  - D) Other (please describe)
- **Answer (original):** "23.A" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option A) 7 days (like family invitations); an Administrator can send a new link while the account still exists
- **Status:** confirmed
- **BA note:** Follow-up of Q-07 (round 2). Applied in round 5: FR-09 updated, FR-15 and BR-13 added; G-17 resolved. Sending a new link does not extend the 30 days (A-15). Assumed (A-21): earlier links for the same account stop working when a new one is sent; only Administrators can send it.

### Q-24: Accounts never activated
- **Question:** If a person never uses the link to set their password and agree to the privacy notice, what should happen to the account made for them?
- **Why it matters:** That person never agreed to TodoNow keeping their email and name. Keeping such accounts forever may conflict with the privacy notice and Vietnam's personal data rules.
- **Related:** FR-09, G-18, BR-01, R-02, Q-07
- **Options:**
  - A) It stays waiting until an administrator deletes it
  - B) It is deleted automatically when the link stops working
  - C) It is deleted automatically after a fixed time (please give the time, e.g. 30 days)
  - D) Other (please describe)
- **Answer (original):** "24.C 30 ngày" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option C) It is deleted automatically after a fixed time (please give the time, e.g. 30 days) — stakeholder gave the time: "30 ngày" = 30 days
- **Status:** confirmed
- **BA note:** Follow-up of Q-07 (round 2). Applied in round 4: FR-14 and BR-11 added, NFR-02 updated; G-18 resolved; R-02 reduced. Assumed: the 30 days count from the day the account was created and are not extended by sending a new link (A-15). Unasked Q-23 revised to fit the 30-day limit.

### Q-25: Language of the emails to users
- **Question:** In which language should the emails that TodoNow sends to users because of the admin area be written? These are the account email (with the link to set a password) and the emails telling a user that an Administrator changed their display name, blocked or deleted their account.
- **Why it matters:** The TodoNow app chooses its language from the phone or browser and does not store a language for each user, so the system does not know which language a person reads when it sends them an email.
- **Related:** FR-09, FR-18, G-19, NFR-04, Q-07, Q-15
- **Options:**
  - A) Vietnamese only
  - B) English only
  - C) Vietnamese and English in the same email
  - D) The administrator chooses the language when creating one person, or for the whole file when importing; the emails about a change, block or deletion are in Vietnamese and English in the same email
  - E) Other (please describe)
- **Answer (original):** "25.C" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option C) Vietnamese and English in the same email
- **Status:** confirmed
- **BA note:** Follow-up of Q-07 (round 2). Round 3: option D revised because the CSV file holds only email and display name (Q-11). Round 5: widened to the emails about admin actions (Q-15). Applied in round 6: FR-09, FR-18 and NFR-04 updated, BR-17 added; G-19 resolved. The password link sent by staff (FR-10) is also an email to a user caused by the admin area whose reader's language is unknown, so it is assumed to follow the same rule (A-08 updated). Emails to staff (login code, set-password links) are assumed bilingual too (A-27). Both to be confirmed at GATE 1.

### Q-26: Target date for the admin area
- **Question:** The admin area comes after the Tet 2027 launch (Q-05). Is there a date by which it should be ready?
- **Why it matters:** It decides how the work is planned after launch and whether some parts should come first.
- **Related:** NFR-05, R-01, Q-05
- **Options:**
  - A) No fixed date; when it is ready after launch
  - B) Within about 3 months after launch
  - C) By a specific date (please give the date)
  - D) Other (please describe)
- **Answer (original):** "26.B" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option B) Within about 3 months after launch
- **Status:** confirmed
- **BA note:** Follow-up of Q-05 (round 2). Applied in round 6: NFR-05 updated; R-01 updated. The target is relative to the actual TodoNow launch (planned before 2027-02-06, SRC-2 NFR-05), so it moves if the launch moves.

### Q-27: Signing up while an account email is waiting
- **Question:** If an administrator has made an account for an email address and that person signs up in the TodoNow app by themselves with the same email before using the link, what should happen?
- **Why it matters:** One email can have only one account. Without a rule the person may be stuck, or end up with an account the administrator does not know about.
- **Related:** FR-09, G-20, BR-06, A-06, Q-07
- **Options:**
  - A) Sign-up is refused; the app tells them to use the link in the email they received
  - B) Sign-up completes the waiting account (they set their password and agree to the privacy notice there); the link stops working
  - C) Other (please describe)
- **Answer (original):** "27.B" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option B) Sign-up completes the waiting account (they set their password and agree to the privacy notice there); the link stops working
- **Status:** confirmed
- **BA note:** Follow-up of Q-07 (round 2). Applied in round 5: FR-16 and BR-14 added, BR-01, BR-06 and BR-07 updated; G-20 resolved; A-06 confirmed with this one change to sign-up. Assumed (A-22): the display name entered by the Administrator or in the file is kept, since TodoNow sign-up asks only for email and password.

### Q-28: Deleting a family creator
- **Question:** When an administrator deletes the account of a user who created a family, what should happen to that family?
- **Why it matters:** Today a family creator must hand over the creator role or delete the family before deleting their own account. An administrator deleting the account cannot ask the user to do that first.
- **Related:** FR-05, C-03, BR-03, G-21, Q-10
- **Options:**
  - A) The administrator must first pick the new creator among the family members, or delete the family
  - B) The creator role passes automatically to another member (for example the one who joined earliest); if there is no other member, the family is deleted
  - C) The family is deleted together with the account; the other members stay in TodoNow without a family and keep their own tasks
  - D) Other (please describe)
- **Answer (original):** "28.B" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option B) The creator role passes automatically to another member (for example the one who joined earliest); if there is no other member, the family is deleted
- **Status:** confirmed
- **BA note:** Follow-up of Q-10 (round 3). Applied in round 4: FR-05 and BR-03 updated; C-03 and G-21 resolved. Recorded C-05: the signed-off TodoNow scope excluded automatic hand-over on account deletion; this applies only to deletion by an Administrator, self-deletion is unchanged (to be pointed out at GATE 1). The option gave "the one who joined earliest" only as an example, so the choice of member (earliest-joined, preferring members who are not blocked) and that the new creator gets no message are assumption A-13, to be confirmed at GATE 1.

### Q-29: What others see of a blocked user
- **Question:** While a user's account is blocked, what should happen to their family membership and the tasks they shared?
- **Why it matters:** Blocking can be undone, so the user's data stays. But family members may still see the blocked person's shared tasks and the person in the family, and a blocked family creator cannot manage the family.
- **Related:** FR-11, G-22, Q-10
- **Options:**
  - A) Nothing changes for others: the user stays in the family and their shared tasks stay visible; they just cannot log in
  - B) The user stays in the family, but their shared tasks are hidden from others until they are unblocked
  - C) Other (please describe)
- **Answer (original):** "29.A" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option A) Nothing changes for others: the user stays in the family and their shared tasks stay visible; they just cannot log in
- **Status:** confirmed
- **BA note:** Follow-up of Q-10 (round 3). Applied in round 4: FR-11 and BR-09 updated; G-22 resolved. As stated in "Why it matters", a blocked family creator stays creator and the family cannot be managed meanwhile (A-14, to be confirmed at GATE 1).

### Q-30: How a new staff member gets started
- **Question:** When an Administrator gives a new staff member admin access in the admin area, how does that staff member set their password and their second login step?
- **Why it matters:** Admin accounts are separate from TodoNow accounts (Q-21) and need a safe first login. A password chosen or passed on by someone else can be seen or copied.
- **Related:** FR-12, FR-08, G-23, Q-13, Q-21, Q-22
- **Options:**
  - A) The staff member receives an email with a link to set their own password, then sets up the second step at their first login
  - B) The Administrator sets a temporary password and gives it to the staff member, who must change it and set up the second step at first login
  - C) Other (please describe)
- **Answer (original):** "30.A" (stakeholder reply 2026-10-13: "22.A, 30.A, 28.B, 29.A, 12.A, 24.C 30 ngày, 17.A")
- **Answer (English):** Option A) The staff member receives an email with a link to set their own password, then sets up the second step at their first login
- **Status:** confirmed
- **BA note:** Follow-up of Q-13 and Q-21 (round 3). Applied in round 4: FR-12 updated, entity "Admin set-password link" added; G-23 resolved. With Q-22 (code sent to the admin email) there is nothing extra to set up for the second step: at first login the code is simply sent to the admin email. Assumed: the link is single use, works for 24 hours, and an Administrator can send a new one (A-18).

### Q-31: Staff who forget their password or lose access to their admin email
- **Question:** If a staff member forgets their admin password, or can no longer open the email where the admin login codes are sent, how do they get back into the admin area?
- **Why it matters:** Without a way back the staff member is locked out; a way back that is too easy lets someone else take over an admin account that can change every user account. The login code goes to the admin email (Q-22), so whoever can read that email controls the second step.
- **Related:** FR-08, FR-12, G-24, R-03, Q-21, Q-22
- **Options:**
  - A) A "forgot password" link on the admin login page sends a link to set a new password to the admin email; if the staff member can no longer open that email, an Administrator removes the admin account and gives access again with a new email
  - B) No "forgot password" on the admin login page: another Administrator sends the staff member a link to set a new password; if the email is lost, an Administrator removes the admin account and gives access again with a new email
  - C) Only our technical team can help
  - D) Other (please describe)
- **Answer (original):** "31.A" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option A) A "forgot password" link on the admin login page sends a link to set a new password to the admin email; if the staff member can no longer open that email, an Administrator removes the admin account and gives access again with a new email
- **Status:** confirmed
- **BA note:** Follow-up of Q-21 (round 3). Applied in round 5: FR-19 added, BR-02 and entity "Admin set-password link" updated; G-24 resolved; R-03 updated (the admin mailbox now controls both the code and password recovery). Assumed (A-23): the link is single use and works 24 hours; the page does not reveal whether an email has an admin account; the email code is still needed after a reset; if the last Administrator loses their email, the technical team sets up an Administrator again; an admin account's email cannot be changed.

### Q-32: Existing users and the updated privacy notice
- **Question:** When the privacy notice is updated (Q-17), what should happen for people who already agreed to the old notice?
- **Why it matters:** Existing users agreed to a notice that did not mention staff access or created accounts. Today the TodoNow app asks for agreement only at sign-up; asking existing users again needs a new screen in the app. The team cannot give legal advice.
- **Related:** FR-13, BR-01, G-25, R-02, R-06, Q-17, SRC-2 FR-24
- **Options:**
  - A) At their next login they must read and agree to the updated notice before they can continue using the app
  - B) At their next login they are shown the updated notice once; no agreement needed
  - C) Nothing in the app; the updated notice is simply available to read, and new people agree to it at sign-up or through the account email
  - D) Other (please describe)
- **Answer (original):** "32.A" (stakeholder reply 2026-10-13: "31.A, 32.A, 23.A, 27.B, 14.A, 15.B, 19.B")
- **Answer (English):** Option A) At their next login they must read and agree to the updated notice before they can continue using the app
- **Status:** confirmed
- **BA note:** Follow-up of Q-17 (round 4). Applied in round 5: FR-20 and BR-15 added, BR-01 and entity "Privacy notice" updated (versions); G-25 resolved; R-02 reduced, R-06 updated. The decision (existing users must agree before continuing) is clear, but "at their next login" is ambiguous because TodoNow users stay logged in until they log out (SRC-2 A-19), recorded as AMB-04 → follow-up Q-35. Assumed (A-25): a user who does not agree can only log out; their data stays unchanged.

### Q-33: What the record keeps about a deleted user
- **Question:** When a user's account is deleted (by an Administrator, by the user, or automatically after 30 days), what should the record of administrator actions (Q-14) keep about that user?
- **Why it matters:** Deleting an account removes the user's personal data (as you decided for TodoNow). The record says which account each action was about; keeping the user's email and name there means that personal data stays after deletion, while removing them makes it harder to answer a later complaint about that account.
- **Related:** FR-05, FR-17, C-06, G-26, NFR-02, R-02, Q-14
- **Options:**
  - A) The record keeps the email and display name as they were, so staff can still see who it was
  - B) The email and display name are removed from the record; it shows only "deleted user" with what was done, by whom and when
  - C) Other (please describe)
- **Answer (original):** "33.B" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option B) The email and display name are removed from the record; it shows only "deleted user" with what was done, by whom and when
- **Status:** confirmed
- **BA note:** Follow-up of Q-14 (round 5), raised by conflict C-06. Applied in round 6: FR-05, FR-14, FR-17 and NFR-02 updated, BR-03 updated, BR-18 added, entity "Admin action record" updated; C-06 and G-26 resolved; R-02 reduced. The question covers deleted user accounts only; a removed staff member is assumed to stay named in the record until it is deleted after 1 year (A-28, to be confirmed at GATE 1).

### Q-34: How long the record is kept
- **Question:** How long should the record of administrator actions (Q-14) be kept?
- **Why it matters:** The record contains email addresses of users and staff, which is personal data. Keeping it longer helps with old complaints and checks for misuse; keeping personal data longer than needed may not fit Vietnam's personal data rules. The team cannot give legal advice.
- **Related:** FR-17, G-27, NFR-02, R-02, Q-14
- **Options:**
  - A) For as long as TodoNow exists (never deleted)
  - B) 1 year, then deleted automatically
  - C) 2 years, then deleted automatically
  - D) Other (please give the time)
- **Answer (original):** "34.B" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option B) 1 year, then deleted automatically
- **Status:** confirmed
- **BA note:** Follow-up of Q-14 (round 5). Applied in round 6: FR-17 and NFR-02 updated, BR-18 added, entity "Admin action record" updated; G-27 resolved; R-02 reduced. Read as: each record is deleted 1 year after the action it describes.

### Q-35: When existing users are asked to agree to the updated notice
- **Question:** You chose that existing users must agree to the updated privacy notice "at their next login" (Q-32). In TodoNow people stay logged in until they log out themselves, so many will not log in again for a long time. When should they be asked?
- **Why it matters:** If they are asked only when they log in again, many existing users will keep using the app for a long time without agreeing to the updated notice. Asking the next time they open the app reaches everyone soon, but interrupts people who are in the middle of using it.
- **Related:** FR-20, BR-15, AMB-04, R-06, Q-32, SRC-2 A-19
- **Options:**
  - A) The next time they open the app, whether or not they log in again
  - B) Only when they log in again, as answered
  - C) Other (please describe)
- **Answer (original):** "35.A" (stakeholder reply 2026-10-13: "35.A, 33.B, 34.B, 25.C, 16.C, 18.B, 26.B")
- **Answer (English):** Option A) The next time they open the app, whether or not they log in again
- **Status:** confirmed
- **BA note:** Follow-up of Q-32 (round 5), raised by ambiguity AMB-04. Applied in round 6: FR-20 and BR-15 updated; AMB-04 resolved; R-06 updated. Assumed (A-25 updated): "open the app" includes starting or reloading it; a user who has the app open when the update comes into use is asked at the next start or reload. To be confirmed at GATE 1.

<!-- Status values: open | answered | confirmed | deferred
     answered  = PM recorded an answer, BA has not processed it
     confirmed = BA applied it to requirements.md
     deferred  = stakeholder agreed to postpone; reason required in BA note -->
