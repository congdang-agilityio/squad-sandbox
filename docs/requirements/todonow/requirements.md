# Requirement analysis: TodoNow

Signed-off: 2026-10-13 by Cong (stakeholder reply: "đồng ý, làm đi")
Re-signed (change: log out + password rule, Q-33/Q-34): 2026-10-13 by Cong (stakeholder reply: "Xác nhận")

- Slug: `todonow`
- Status: Signed off (rounds 1-7, 2026-10-13). Change in round 8 (log out and password rule,
  FR-26, FR-27; Q-33, Q-34) re-signed 2026-10-13.
- Sources: see the table below

## Changelog
| Date | Round | Change |
|---|---|---|
| 2026-10-13 | 1 | Initial analysis of SRC-1, SRC-2, SRC-3 |
| 2026-10-13 | 2 | Applied Q-01..Q-07. Q-01: email/password only, C-01 resolved, Google sign-in out (FR-02). Q-02: one creator invites others, one family per user (FR-14, FR-15, BR-05). Q-03: recipients view and mark done, shared tasks appear in their list (FR-05, FR-09, BR-06). Q-04: in-app reminder only (FR-11). Q-05: notify only when a task is shared (FR-10). Q-06: user picks priority freely, default Normal (FR-08, BR-03). Q-07: launch before Tet 2027 (2027-02-06), everything in SRC-1 and SRC-2 is must-have (NFR-05). Added follow-ups Q-15..Q-20. |
| 2026-10-13 | 3 | Applied Q-08, Q-09, Q-10, Q-13, Q-15, Q-17, Q-20. Q-08: self sign-up, forgot password and account deletion (FR-03 confirmed, FR-16 added). Q-09: due date required, with optional time (FR-04, BR-02). Q-10: edit, delete, undo done; done tasks in a separate list (FR-06, FR-12 confirmed, FR-17 added). Q-13: stakeholder unsure, asked for a proposal (NFR-04 stays open, proposal in Q-23). Q-15: invitation by link or code the creator sends themselves; the app sends no invitation emails (FR-14, FR-15). Q-17: owner picks one or more family members (FR-09). Q-20: phone notification even when the app is closed (FR-10, R-03). Added follow-ups Q-21..Q-26. |
| 2026-10-13 | 4 | Applied Q-16, Q-18, Q-21, Q-24. Q-16: a family is optional; members can leave, the creator can remove members, delete the family and hand over the creator role (BR-10, BR-11, FR-19..FR-22). Q-18: a shared task marked done is done for everyone, and the app shows who marked it (FR-18, BR-12). Q-21: a creator must hand over the role or delete the family before deleting their account; the user's tasks are deleted also for recipients (FR-16, BR-13). Q-24: one invitation per person, single use, expires after 7 days (FR-14, BR-14, R-06 reduced). Q-14 answer "wpa for this phase" is unclear; set back to open and asked precisely in Q-27 (AMB-07). Q-23 and Q-25 not answered, still open. Added follow-ups Q-27..Q-30. |
| 2026-10-13 | 5 | Applied Q-22, Q-23, Q-25, Q-26, Q-27 (with Q-14), Q-28, Q-29. Q-22: owner or any recipient may undo "done" on a shared task (FR-06, BR-15). Q-23: data protection proposal items 1-6 accepted (NFR-04 confirmed, NFR-07, NFR-08, FR-23, FR-24, BR-19 added, FR-16 extended). Q-25: no fallback for people without phone notifications (FR-10, R-03 accepted). Q-26: owner adds/removes recipients at any time, new recipients notified, deleting a shared task removes it for everyone (FR-09, FR-10, FR-12, BR-07, BR-16). Q-27/Q-14: PWA for phones only, computers not a target, no native app this phase (NFR-01, A-04, AMB-07). Q-28: on leaving, removal or family deletion sharing ends and tasks stay with their owner (FR-19..FR-21, BR-17). Q-29: creator can leave only after handover or deleting the family (FR-19, BR-18). Added follow-up Q-31 (privacy notice text). |
| 2026-10-13 | 6 | Applied Q-11, Q-12, Q-19, Q-30, Q-31. Q-11: overdue from the day after the due date, or after the due time if set; shown in red at the top of the list (FR-07 confirmed, BR-04 confirmed, BR-21 added; AMB-02, A-06 resolved). Q-12: language follows the phone/browser language, Vietnamese if neither Vietnamese nor English applies, no language setting (FR-13 confirmed, BR-22 added; AMB-04 resolved; "preferred language" removed from `User`). Q-19: the in-app reminder shows tasks due today and overdue tasks (FR-11 confirmed; G-11 resolved). Q-30: the creator sees unused invitations and can cancel any of them (FR-25, BR-20 added; G-20 resolved; R-06 reduced further). Q-31: the team drafts the privacy notice in both languages and the stakeholder approves it before launch (FR-23 confirmed; G-21 resolved; R-07 updated). Added assumptions A-12..A-15 and follow-up Q-32 (order of the task list, G-22). |
| 2026-10-13 | 7 | Applied Q-32: the task list shows overdue tasks first, then the other tasks; within each group tasks are ordered by priority (High, Normal, Low) and, within the same priority, by due date and time, earliest first (FR-05 updated, BR-23 added; G-22 resolved). Ordering by due date first is out of scope. Added assumptions A-16 and A-17. No question is open or answered; requirements are clear and ready for sign-off. |
| 2026-10-13 | 8 | **Requirement change mid-stream** (GATE 2 feedback on the story list, SRC-4): "add log out, and passwords of at least 8 characters including lowercase letters, uppercase letters, digits and special characters". Added FR-26 (log out), FR-27 (password rule), BR-24, BR-25; FR-03 and NFR-04 cross-referenced; scope updated. New gap G-23 (what logging out does to phone notifications and other devices) asked in Q-33; new ambiguity AMB-08 (which characters count as letters and special characters, e.g. Vietnamese letters with marks) asked in Q-34. Added assumptions A-18 (the rule also applies to a new password set after "forgot password") and A-19 (a person stays logged in on a phone until they log out). Affected stories (not yet published): S-02, S-03, S-04, plus a new log-out story. Needs re-sign-off of the change at GATE 1. |
| 2026-10-13 | 9 | Applied Q-33 and Q-34 (round 8 change). Q-33 (B): logging out ends the session on that phone only, and that phone gets no more "shared with you" notifications for the person until they log in on it again; a separate "log out on all devices" option logs the person out on every phone at once (FR-26 updated, BR-25 updated, BR-26 added, FR-10 cross-referenced; G-23 resolved). Q-34 (C): only letters without marks (a-z, A-Z), digits and keyboard symbols may be used in a password; letters with Vietnamese marks and spaces cannot be used (FR-27 updated, BR-24 updated; AMB-08 resolved). Out of scope: a logged-out phone continuing to receive notifications; Vietnamese letters with marks and spaces in passwords. Added assumptions A-20 (which keyboard symbols count) and A-21 (resetting a forgotten password does not log out other phones). No question is open or answered; the change is ready for re-sign-off at GATE 1. |

## Sources
| ID | File (in `sources/`) | Origin | Retrieved | Notes |
|---|---|---|---|---|
| SRC-1 | `brief.md` | `requirements/brief.md` | 2026-10-13 | Product brief, undated |
| SRC-2 | `meeting-notes.md` | `requirements/meeting-notes.docx` | 2026-10-13 | Kickoff meeting notes dated 2026-10-01; converted with the built-in converter (table checked, readable) |
| SRC-3 | `nfr.md` | `requirements/nfr.pdf` | 2026-10-13 | Non-functional requirements, 4 numbered items, text layer present |
| SRC-4 | `stakeholder-notes.md` | Stakeholder feedback at GATE 2 | 2026-10-13 | Section "2026-10-13, GATE 2 feedback on the story list"; recorded verbatim (Vietnamese) with English translation |
| Q-nn | `../questions.md` | Stakeholder answers | 2026-10-13 | Decisions recorded verbatim; cited as Q-nn |

## 1. Business goal and problem statement
TodoNow is "a simple todo app for busy families" (SRC-1 intro). Family members keep track of
their tasks, see what is due and overdue (SRC-1 §Tasks), set a priority per task, and share
tasks with chosen members of their family (SRC-2 §Decisions, Q-17). Constraints: small budget
and launch before Tet 2027, i.e. before 2027-02-06 (SRC-1 §Notes, Q-07). Every feature in the
brief and the meeting notes must be ready for the launch (Q-07). In this phase TodoNow is a
progressive web app (PWA) for phones (Q-27).

Success criteria beyond "launch before Tet with all features" are not stated.

## 2. Actors / personas
| Actor | Description | Goals |
|---|---|---|
| Family member (user) | A logged-in person (SRC-1 §Login). Belongs to at most one family; a family is optional (Q-02, Q-16) | Record own tasks, see what is due/overdue, mark tasks done and undo, share tasks with chosen family members and change who they are shared with, see tasks shared with them, leave their family, manage their own account, log out on this phone or on all devices (SRC-4, Q-33) |
| Family creator | The user who created a family, or to whom the creator role was handed over (Q-02, Q-16) | Invite people with a link or code (Q-15, Q-24), see and cancel unused invitations (Q-30), remove members, delete the family, hand over the creator role (Q-16); leave only after handover or deletion (Q-29) |
| Invited person | Someone who received an invitation link or code from a family creator (Q-15) | Log in or sign up and join the family |
| Visitor | Not logged in (SRC-1 §Login) | Read the privacy notice, sign up (agreeing to the notice) with a password that meets the password rule, log in, recover a forgotten password (Q-08, Q-23, SRC-4, Q-34) |
| Stakeholder (product owner) | The person who signs off requirements (Q-31) | Approve the privacy notice text before launch |

## 3. Functional requirements
| ID | Requirement | Source | Status |
|---|---|---|---|
| FR-01 | The system shall require a user to log in before showing any tasks. | SRC-1 §Login | confirmed |
| FR-02 | The system shall let a user log in with email and password. No third-party login provider (e.g. Google) is offered. | SRC-1 §Login; Q-01 | confirmed |
| FR-03 | The system shall let a visitor create an account by themselves (sign up with email and password) and recover access when the password is forgotten. The password must meet the password rule (FR-27). | SRC-1 §Login; Q-08; SRC-4 | confirmed |
| FR-04 | The system shall let a user create a task with a title and a due date. The due date is required; a due time is optional. | SRC-1 §Tasks; Q-09 | confirmed |
| FR-05 | The system shall show a logged-in user a list containing their own tasks and the tasks shared with them that are not done. Overdue tasks come first, then all other tasks; within each of these two groups, tasks are ordered by priority (High, then Normal, then Low) and, within the same priority, by due date and time, earliest first (BR-23). | SRC-1 §Login; Q-03; Q-10; Q-11; Q-32 | confirmed |
| FR-06 | The system shall let a user mark a task as done and undo "done" (return it to not done). On a shared task, the owner and every member it is currently shared with may mark it done and may undo "done"; the change applies for everyone. | SRC-1 §Tasks; Q-10; Q-18; Q-22 | confirmed |
| FR-07 | The system shall make overdue tasks stand out: an overdue task is shown in red and placed at the top of the task list. A task without a due time is overdue from the day after its due date; a task with a due time is overdue once that time has passed. | SRC-1 §Tasks; Q-11 | confirmed |
| FR-08 | The system shall let the task owner choose a priority for each task: High, Normal or Low. A new task gets Normal by default. The guide High = "Today", Normal = "This week", Low = "Some day" is shown as guidance only; priority is not derived from the due date. | SRC-2 §Decisions, §Priorities; Q-06 | confirmed |
| FR-09 | The system shall let a task owner share a task with one or more family members they pick, and add or remove members it is shared with at any time. The members it is shared with see it in their list and may view it and mark it done; a removed member no longer sees it. | SRC-2 §Decisions; Q-03; Q-17; Q-26 | confirmed |
| FR-10 | The system shall notify a family member by a phone notification, also when the app is closed, when a task is shared with them, including when they are added to an already shared task. The notification goes only to phones on which that member is logged in (FR-26, BR-26). No notification is sent when a shared task is changed or marked done, or when a member is removed from it. There is no fallback for people who do not receive phone notifications: the shared task simply appears in their list. | SRC-2 "Open point"; Q-05; Q-20; Q-25; Q-26; Q-33 | confirmed |
| FR-11 | The system shall remind users about tasks inside the app only: when the user opens the app, it shows the tasks due today and the overdue tasks. No email or phone reminders. | SRC-1 §Notes; Q-04; Q-19 | confirmed |
| FR-12 | The system shall let the task owner edit and delete their own tasks. Deleting a shared task removes it for everyone it was shared with. | Q-10; Q-26 | confirmed |
| FR-13 | The system shall show the interface in Vietnamese or English, following the language of the phone/browser: Vietnamese if that language is Vietnamese, English if it is English, and Vietnamese if it is neither. There is no language setting in the app. | SRC-3 item 3; Q-12 | confirmed |
| FR-14 | The system shall let a user who is not in a family create a family, and let the family creator get a separate invitation link or code for each person they invite, which the creator sends themselves (e.g. by Zalo or SMS). Each link or code can be used once and expires 7 days after it was created. The app does not send invitation emails. | SRC-2 §Decisions; Q-02; Q-15; Q-24 | confirmed |
| FR-15 | The system shall let a person who opens a valid invitation link or enters a valid invitation code log in or sign up and then join that family. | Q-02; Q-15; Q-24 | confirmed |
| FR-16 | The system shall let a user delete their own account. A family creator must first hand over the creator role or delete the family. Deleting an account deletes all the user's own tasks, also for the people they were shared with, removes the user from their family, and removes that user's personal data. | Q-08; Q-21; Q-23 item 5 | confirmed |
| FR-17 | The system shall show done tasks in a separate "done" list; done tasks are not hidden or removed after a period of time. | Q-10 | confirmed |
| FR-18 | When the owner or a member a task is shared with marks a shared task done, the system shall mark it done for the owner and for everyone it is shared with, and shall show who marked it done. | Q-18 | confirmed |
| FR-19 | The system shall let a family member leave their family. The family creator can leave only after handing over the creator role or deleting the family. When a member leaves, sharing of the tasks they own ends (the tasks stay only with them) and they no longer see tasks shared with them. | Q-16; Q-28; Q-29 | confirmed |
| FR-20 | The system shall let the family creator remove a member from the family. Sharing of the removed member's tasks ends (the tasks stay only with them) and they no longer see tasks shared with them. | Q-16; Q-28 | confirmed |
| FR-21 | The system shall let the family creator delete the family. All sharing between its members ends and every task stays only with its owner; no task is deleted. | Q-16; Q-28 | confirmed |
| FR-22 | The system shall let the family creator hand over the creator role to another member of the family. | Q-16 | confirmed |
| FR-23 | The system shall show a short privacy notice, in Vietnamese and English, that says what personal data TodoNow stores and why. The team drafts the text in both languages; the stakeholder approves it before launch. | SRC-3 item 4; Q-23 item 3; Q-31 | confirmed |
| FR-24 | The system shall require a visitor to agree to the privacy notice when signing up; an account is not created without this agreement. | SRC-3 item 4; Q-23 item 4 | confirmed |
| FR-25 | The system shall let the family creator see a list of the family's invitations that have not been used yet and cancel any of them; a cancelled invitation link or code can no longer be used. | Q-30 | confirmed |
| FR-26 | The system shall let a logged-in user log out on the phone they are using. After logging out, that phone shows no tasks until someone logs in again (FR-01), and it receives no more "shared with you" notifications (FR-10) for that person until they log in on it again. The system shall also offer a separate "log out on all devices" option that logs the person out on every phone they are logged in on at once, with the same effect on each of those phones. | SRC-4 (2026-10-13 GATE 2 feedback); Q-33 | confirmed |
| FR-27 | The system shall accept a password only if it has at least 8 characters, contains at least one lowercase letter (a-z), at least one uppercase letter (A-Z), at least one digit (0-9) and at least one keyboard symbol (A-20), and contains no other characters: letters with Vietnamese marks (e.g. ă, ê, ơ, Đ) and spaces cannot be used. A password that does not meet the rule is refused and the account or new password is not saved. | SRC-4 (2026-10-13 GATE 2 feedback); Q-34 | confirmed |

## 4. Non-functional requirements
| ID | Category | Requirement | Source |
|---|---|---|---|
| NFR-01 | Platform | A progressive web app (PWA) for phones: works in Chrome on Android and Safari on iOS and can be added to the phone's Home Screen and opened like an app. Computer browsers are not a target in this phase. No App Store / Google Play app in this phase. | SRC-3 item 1; Q-14; Q-27 |
| NFR-02 | Performance | Pages load in under 2 seconds on a 4G connection. | SRC-3 item 2 |
| NFR-03 | i18n | The interface is available in Vietnamese and English; the language is chosen as in FR-13. | SRC-3 item 3; Q-12 |
| NFR-04 | Security / Data | Personal data is stored securely: passwords are never stored in readable form, and all connections are encrypted. Passwords must meet the password rule (FR-27, BR-24). | SRC-3 item 4; Q-23 item 1; SRC-4; Q-34 |
| NFR-05 | Constraint | Launch before Tet 2027 (2027-02-06). All features in SRC-1 and SRC-2 must be ready for the launch. | SRC-1 §Notes; Q-07 |
| NFR-06 | Constraint | Small budget. | SRC-1 §Notes |
| NFR-07 | Security / Access | Each user can see only their own tasks and the tasks currently shared with them. A phone on which a person has logged out no longer shows their tasks or receives their share notifications (FR-26). | SRC-3 item 4; Q-23 item 2; Q-33 |
| NFR-08 | Privacy | Personal data is not shared with or sold to anyone else. | SRC-3 item 4; Q-23 item 6 |

## 5. Scope
- **In (confirmed):** self sign-up with agreement to a privacy notice drafted by the team and
  approved by the stakeholder, login with email and password, **log out on this phone and a
  separate "log out on all devices" option**, after which those phones show no tasks and get no
  share notifications for that person (FR-26), a **password rule** of at least 8 characters
  with a lowercase letter, an uppercase letter, a digit and a keyboard symbol, using only
  a-z, A-Z, 0-9 and keyboard symbols (FR-27), forgotten-password recovery, account deletion
  with the rules of Q-21 that also removes the user's personal data (FR-01, FR-02, FR-03, FR-16,
  FR-23, FR-24); create task with title, required due date and optional due time (FR-04); task
  list with own and shared tasks that are not done, overdue tasks first, each group ordered by
  priority and then by due date and time (FR-05); mark done and undo done, also by recipients
  of a shared task (FR-06); separate done list (FR-17); edit and delete own tasks, deletion of a
  shared task removes it for everyone (FR-12); overdue tasks in red at the top of the list
  (FR-07); priority High/Normal/Low chosen by the user, default Normal (FR-08); optional
  families with one creator who invites people with a single-use, 7-day link or code per person
  that they send themselves, and who can see and cancel unused invitations (FR-14, FR-15,
  FR-25); leaving a family (creator only after handover or deletion), removing members,
  deleting the family and handing over the creator role, with sharing ending on these changes
  (FR-19..FR-22); sharing tasks with chosen family members, who may view and mark done, with
  recipients changeable at any time (FR-09); a shared task done by anyone is done for everyone,
  showing who did it (FR-18); phone notification when a task is shared, also when the app is
  closed, on the phones where the member is logged in (FR-10); in-app reminder of tasks due
  today and overdue tasks (FR-11). PWA for phones (Chrome Android, Safari iOS), Vietnamese and
  English UI following the phone/browser language (FR-13), secure storage and access control of
  personal data, no sharing or selling of personal data, page load under 2 s on 4G (SRC-3,
  Q-12, Q-23, Q-27). All of this is required for the Tet 2027 launch (Q-07).
- **Out (confirmed):** Google or any other third-party login (Q-01); belonging to more than one
  family (Q-02); family members editing or deleting tasks shared with them (Q-03); reminders by
  email or phone notification (Q-04); notifications when a shared task is changed or marked
  done (Q-05); priority set automatically from the due date (Q-06); invitation emails sent by
  the app (Q-15); a single "share with the whole family" action (Q-17: the owner picks
  members); automatically hiding done tasks after a period (Q-10); marking a shared task done
  only for oneself (Q-18); invitation links or codes that work for several people or without
  expiry (Q-24); automatic transfer of the creator role on account deletion (Q-21) or when the
  creator leaves (Q-29); any fallback (in-app "new" mark, email) for people who do not receive
  phone notifications (Q-25); shared tasks staying visible to others after their owner leaves
  or is removed (Q-28); App Store / Google Play apps in this phase (Q-27); computer browsers as
  a target in this phase (Q-27); a lawyer review of the data protection measures (Q-23: not
  chosen); a language setting inside the app (Q-12); a separate "Overdue" section (Q-11: overdue
  tasks are at the top of the same list); reminders about tasks due tomorrow (Q-19); ordering
  the task list by due date first (Q-32: priority comes first); a logged-out phone continuing to
  receive the person's share notifications (Q-33: option C not chosen); letters with Vietnamese
  marks and spaces in passwords (Q-34).
- **Not stated (not added):** changing the password while logged in. SRC-4 adds a password
  rule, not a "change password" feature; it stays out unless the stakeholder asks for it.
  Automatic logout after a period of time (A-19).

## 6. Business rules and data entities
- BR-01: No task is visible to a user who is not logged in (SRC-1 §Login).
- BR-02: Every task has a title and a due date; the due date is required and may include an
  optional time (SRC-1 §Tasks, Q-09).
- BR-03: Every task has exactly one priority from {High, Normal, Low}, chosen freely by the
  user; a new task defaults to Normal (SRC-2 §Priorities, Q-06).
- BR-04: A task is overdue when it is not done and: it has no due time and its due date is
  before today; or it has a due time and that date and time have passed (Q-11). Dates and times
  are read in local time (A-12).
- BR-05: A user belongs to at most one family. A family is created by one user, who invites
  the others (Q-02).
- BR-06: A family member a task is shared with may view it, mark it done and undo "done", but
  may not edit or delete it or change who it is shared with. Only the owner edits, deletes or
  changes the recipients of a task (Q-03, Q-10, Q-22, Q-26).
- BR-07: A notification is sent only when a task is shared with a family member (at first
  sharing or when the member is added later), not when it is changed, done, or when a member is
  removed from it (Q-05, Q-26).
- BR-08: A task is shared only with the family members the owner picks (one or more) (Q-17).
- BR-09: A done task leaves the main list and appears in the done list; undoing "done"
  returns it to the main list (Q-10).
- BR-10: A family is optional; a user can create and manage their own tasks without being in a
  family (Q-16).
- BR-11: After a member leaves the family or is removed by the creator, they no longer see the
  tasks shared with them by family members (Q-16).
- BR-12: A shared task has one done status for everyone: when the owner or any member it is
  shared with marks it done, it is done for all of them, and the app records and shows who
  marked it done (Q-18).
- BR-13: A family creator cannot delete their account until they have handed over the creator
  role to another member or deleted the family. Deleting an account deletes all of that user's
  own tasks, also for the members they were shared with (Q-21).
- BR-14: Each invitation link or code is for one invited person, can be used once, and expires
  7 days after it was created (Q-24).
- BR-15: "Done" on a shared task may be undone by the owner or by any member the task is
  currently shared with; undoing applies for everyone (Q-22).
- BR-16: The owner may add or remove the members a task is shared with at any time. Newly added
  members receive the share notification; removed members no longer see the task. Deleting a
  shared task removes it for everyone (Q-26).
- BR-17: When a member leaves or is removed from the family, sharing of the tasks they own ends
  and those tasks stay only with them. When the family is deleted, all sharing between its
  members ends and every task stays only with its owner. No task is deleted by a family change
  (Q-28).
- BR-18: The family creator cannot leave the family until they have handed over the creator
  role to another member or deleted the family (Q-29).
- BR-19: A visitor cannot create an account without agreeing to the privacy notice (Q-23).
- BR-20: Only the family creator sees and cancels unused invitations; a cancelled invitation
  can no longer be used to join (Q-30).
- BR-21: Overdue tasks are shown in red and placed above all other tasks in the task list
  (Q-11).
- BR-22: The interface language follows the phone/browser language: Vietnamese or English if
  that is the phone/browser language, otherwise Vietnamese. The user cannot change it inside the
  app (Q-12).
- BR-23: Order of the task list: first the overdue tasks, then all other tasks. Within each of
  these two groups, tasks are sorted by priority (High, then Normal, then Low) and, within the
  same priority, by due date and time, earliest first (Q-32). Same-day tasks without a due time
  and ties are handled as in A-16.
- BR-24: Password rule: a password has at least 8 characters; contains at least one lowercase
  letter (a-z), one uppercase letter (A-Z), one digit (0-9) and one keyboard symbol (A-20); and
  contains only these characters. Letters with Vietnamese marks (e.g. ă, â, đ, ê, ô, ơ, ư and
  any letter with a tone mark, in lower or upper case) and spaces are not allowed (SRC-4, Q-34).
  It applies when signing up and, as assumed in A-18, when setting a new password after "forgot
  password".
- BR-25: After a user logs out on a phone, that phone shows no tasks until someone logs in
  again, and it receives no "shared with you" notifications for that user until they log in on
  it again (SRC-4, FR-01, Q-33).
- BR-26: "Log out on all devices" logs the user out on every phone they are logged in on,
  including the one they are using; BR-25 then applies to each of those phones (Q-33).
- Entities:
  - `User`: email, password (never stored readable, NFR-04; must meet BR-24), display name,
    family (0 or 1), notification permission (FR-10), privacy notice agreement (FR-24). No
    stored language preference (Q-12).
  - `Login on a device`: user, phone; exists while the user is logged in on that phone; ended by
    log out on that phone or by "log out on all devices" (FR-26, Q-33). Share notifications
    (FR-10) go only to phones with an active login of the recipient.
  - `Family`: creator (transferable, FR-22), members (SRC-2, Q-02, Q-16).
  - `Invitation`: family, link or code, created at, expires at (created + 7 days), state
    (unused, used, cancelled) (Q-15, Q-24, Q-30).
  - `Task`: title, due date (required), due time (optional), priority (default Normal), done
    status, done by (user who marked it done), owner, shared-with members (changeable by the
    owner) (SRC-1, SRC-2, Q-03, Q-06, Q-09, Q-17, Q-18, Q-26).
  - `Notification`: recipient, shared task, delivered as a phone notification to the phones
    where the recipient is logged in (FR-10, Q-20, Q-33).
  - `Privacy notice`: text in Vietnamese and English, drafted by the team, approved by the
    stakeholder before launch (FR-23, Q-31).
  - In-app reminders (FR-11) are derived from task due dates (due today, overdue); no reminder
    settings are required by the confirmed requirements.

## 7. Gaps (missing information)
- G-01: How a family is formed. **Resolved by Q-02.**
- G-02: What family members can do with a shared task. **Resolved by Q-03.**
- G-03: Whether sharing notifies family members. **Resolved by Q-05.**
- G-04: Reminders in the first launch. **Resolved by Q-04.**
- G-05: Undo done; visibility of done tasks. **Resolved by Q-10.**
- G-06: Account lifecycle. **Resolved by Q-08.** Follow-up G-13.
- G-07: Prioritisation of features against the Tet deadline. **Resolved by Q-07.**
- G-08: How an invitation reaches the invited person. **Resolved by Q-15.** Follow-up G-15.
- G-09: Using the app without a family; leaving and removal. **Resolved by Q-16.**
- G-10: Notification channel. **Resolved by Q-20.**
- G-11: What exactly the in-app reminder shows. **Resolved by Q-19** (due today and overdue).
- G-12: Whole family or chosen members. **Resolved by Q-17.**
- G-13: Effect of account deletion on tasks and family. **Resolved by Q-21.**
- G-14: Who may undo "done" on a shared task. **Resolved by Q-22.**
- G-15: Invitation link/code use and expiry. **Resolved by Q-24.** Follow-up G-20.
- G-16: Users who cannot receive phone notifications. **Resolved by Q-25** (no fallback).
- G-17: Changing recipients and deleting a shared task. **Resolved by Q-26.**
- G-18: Shared tasks after leaving, removal or family deletion. **Resolved by Q-28.**
- G-19: Whether and how the family creator can leave. **Resolved by Q-29.**
- G-20: Seeing and cancelling unused invitations. **Resolved by Q-30.**
- G-21: Who writes the privacy notice text. **Resolved by Q-31** (team drafts, stakeholder
  approves).
- G-22: Order of the task list. **Resolved by Q-32** (overdue first; then by priority, then by
  due date and time). Minor details assumed in A-16 and A-17.
- G-23: What "log out" (SRC-4) affects: share notifications on a logged-out phone (FR-10,
  NFR-07) and other phones. **Resolved by Q-33** (this phone stops getting notifications; a
  separate "log out on all devices" option).

## 8. Ambiguities (more than one reading)
- AMB-01: Priority vs. due date. **Resolved by Q-06.**
- AMB-02: "Overdue tasks should stand out" (SRC-1). **Resolved by Q-11** (overdue from the day
  after the due date, or after the due time; red and at the top of the list).
- AMB-03: "Due date" (SRC-1). **Resolved by Q-09** (date required, time optional).
- AMB-04: "Available in Vietnamese and English" (SRC-3 item 3). **Resolved by Q-12** (follows
  the phone/browser language, Vietnamese otherwise, no setting).
- AMB-05: "Personal data must be stored securely" (SRC-3 item 4). **Resolved by Q-23**
  (proposal items 1-6 accepted).
- AMB-06: "Mark as done" on a shared task. **Resolved by Q-18** (done for everyone, showing who).
- AMB-07: Q-14 answer "wpa for this phase". **Resolved by Q-27** (PWA for phones only; the
  stakeholder's reply "17.a" was clarified as "Pwa", i.e. an answer to Q-27).
- AMB-08: SRC-4 "chữ thường, chữ hoa, số và kí tự đặc biệt" (lowercase letters, uppercase
  letters, digits and special characters): how Vietnamese letters with marks and spaces are
  treated. **Resolved by Q-34** (only a-z, A-Z, 0-9 and keyboard symbols; letters with marks
  and spaces cannot be used). The exact list of keyboard symbols is assumed in A-20.

## 9. Conflicts (sources disagree)
- C-01: Login method. SRC-1 §Login: "Login is by **email and password only**; we do not want
  any third-party login providers." vs SRC-2 §Decisions: "Users sign in with their Google
  account, for convenience." **Resolved by Q-01:** email and password only.
- No conflict found for SRC-4: no earlier source states a password rule (S-02 recorded "No
  password strength rules were stated") or excludes logging out.

## 10. Assumptions (provisional until confirmed)
- A-01: Users see their own tasks and tasks shared with them after login. **Confirmed by Q-03.**
- A-02: Users can sign up themselves and reset a forgotten password. **Confirmed by Q-08.**
- A-03: Users can edit and delete their own tasks. **Confirmed by Q-10.**
- A-04: Only a web app for phones (PWA) is in scope in this phase; native apps are out;
  computer browsers are not a target. **Confirmed by Q-27 (with Q-14).**
- A-05: "Before Tet" means before Tet 2027 (2027-02-06). **Confirmed by Q-07.**
- A-06: A task is overdue when it is not done and its due date (or due time, if set) is in the
  past. **Confirmed by Q-11.**
- A-07: A shared task marked done by any member is done for everyone. **Confirmed by Q-18.**
- A-08: A user can use personal tasks without a family. **Confirmed by Q-16.**
- A-09: The owner can change who a task is shared with, and deleting a shared task removes it
  for everyone. **Confirmed by Q-26.**
- A-10: On leaving, removal or family deletion, sharing ends and each task stays only with its
  owner. **Confirmed by Q-28.**
- A-11: The creator can leave only after handing over the creator role or deleting the family.
  **Confirmed by Q-29.**
- A-12: "Today", due dates and due times are read in the local time of the person's phone
  (for a family in Vietnam, Vietnam time). Accepted at GATE 1 sign-off (rounds 1-7).
- A-13: Every text the person sees, including the phone notification about a shared task and
  the privacy notice, appears in that person's interface language (FR-13). Accepted at GATE 1
  sign-off (rounds 1-7).
- A-14: The in-app reminder (FR-11) covers the same tasks as the person's task list: their own
  tasks and tasks shared with them that are not done. Accepted at GATE 1 sign-off (rounds 1-7).
- A-15: The list of unused invitations (FR-25) shows invitations that have not been used,
  cancelled or expired; expired invitations are not shown. Accepted at GATE 1 sign-off
  (rounds 1-7).
- A-16: In the task list (BR-23), among tasks with the same priority and the same due date, a
  task without a due time comes after the tasks that have a time; tasks with exactly the same
  priority, date and time keep the order in which they were created (oldest first). Accepted at
  GATE 1 sign-off (rounds 1-7).
- A-17: The in-app reminder (FR-11) lists its tasks in the same order as the task list (BR-23).
  The done list (FR-17) shows the most recently done task first. Accepted at GATE 1 sign-off
  (rounds 1-7).
- A-18: The password rule (FR-27) applies to every password a person sets: at sign-up and when
  setting a new password after "forgot password". The app tells the person the rule and refuses
  a password that does not meet it. To be confirmed at the change re-sign-off
  (understanding.md).
- A-19: A person stays logged in on a phone until they log out (FR-26) or delete their account;
  the app does not log people out automatically after a period of time. To be confirmed at the
  change re-sign-off (understanding.md).
- A-20: "Keyboard symbols" (Q-34) means the symbols on a standard English keyboard:
  ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ . Any of them counts as the
  required special character. To be confirmed at the change re-sign-off (understanding.md).
- A-21: Resetting a forgotten password does not log the person out on their other phones; they
  can use "log out on all devices" (FR-26) if they want to. To be confirmed at the change
  re-sign-off (understanding.md).

## 11. Risks and external dependencies
- R-01: Deadline: about 16 weeks to Tet 2027 with a small budget, and Q-07 makes every feature
  a must-have. Rounds 3 to 6 added sign-up, password recovery, account deletion,
  edit/delete/undo, a done list, phone notifications, family management (leave, remove,
  delete family, hand over creator role, invitation expiry, listing and cancelling
  invitations), changing recipients of shared tasks, a privacy notice and agreement at sign-up.
  Round 8 adds log out (with "log out on all devices", Q-33) and a password rule (small
  additions). The schedule has little room; the stakeholder should be aware of this.
- R-02: Google sign-in dependency. **Closed by Q-01.**
- R-03: Phone notifications from a mobile web app (Q-20) are limited by the platform. Each user
  must allow notifications. On iPhone, notifications from a web app work only on recent iOS
  versions and only after the user adds the PWA to the Home Screen; a user who just opens it in
  Safari receives none. **Accepted by the stakeholder in Q-25:** no fallback; such users only
  see shared tasks in their list.
- R-04: The stakeholder accepted the BA's data protection proposal (Q-23) without a lawyer
  review, and the privacy notice text will be drafted by the team (Q-31). The team cannot give
  legal advice; whether this fully meets Vietnam's Decree 13/2023 on personal data protection
  is not verified. Residual legal risk remains with the stakeholder.
- R-05: Forgotten-password recovery (Q-08) depends on reliable delivery of email to users.
  Invitations (Q-15) and share notifications (Q-20) do not use email.
- R-06: Invitation links or codes sent by Zalo or SMS can be forwarded. **Reduced by Q-24 and
  Q-30** (one per person, single use, 7-day expiry, and the creator can cancel an unused one).
- R-07: Sign-up (FR-24) cannot launch without the privacy notice text in Vietnamese and English
  (FR-23). Per Q-31 the team drafts it and the stakeholder must approve it before launch; the
  approval is a launch dependency on the stakeholder.
- R-08: The round 8 change arrived at GATE 2, after stories S-02 (sign up), S-03 (log in) and
  S-04 (reset password) were drafted. After the change is re-signed at GATE 1 they must be
  revised (password rule in S-02 and S-04; S-03 "Logging out: not stated" removed) and new
  story or stories added for log out and "log out on all devices". The stories have not been
  published, so no issues are affected.
- R-09: Some people type Vietnamese letters with marks by habit; with Q-34 such passwords are
  refused. The sign-up and new-password screens must state clearly which characters are
  allowed (in the person's interface language, A-13) so people are not refused without
  understanding why.
