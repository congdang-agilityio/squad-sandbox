# PRD: TodoNow

- Slug: `todonow` · Analysis: `requirements.md` (signed off 2026-10-13 by Cong; change for log
  out and password rule re-signed 2026-10-13 by Cong) · Version: 2
- Epic title: TodoNow: family todo app (PWA) for the Tet 2027 launch

## Version history
| Version | Date | Change |
|---|---|---|
| 1 | 2026-10-13 | First draft (FR-01..FR-25) |
| 2 | 2026-10-13 | GATE 2 feedback applied after Q-33, Q-34 and GATE 1 re-sign-off: log out on this phone and on all devices (FR-26), password rule (FR-27); stories S-29..S-32 added, S-02, S-03, S-04, S-23 revised |

## 1. Summary
TodoNow is a simple todo app for busy families (SRC-1). Family members record tasks with a due
date and a priority, see what is due and overdue, mark tasks done, and share tasks with chosen
members of their optional family, who get a phone notification. Accounts use email and a
password that must meet a password rule, and people can log out on one phone or on all their
phones. In this phase it is a progressive web app (PWA) for phones, in Vietnamese and English
(Q-27, Q-12). It must launch before Tet 2027 (2027-02-06) with every feature in this PRD (Q-07).

## 2. Goals and success metrics
| Goal | Metric | Target |
|---|---|---|
| Launch on time | Production release date | Before 2027-02-06 (NFR-05, Q-07) |
| Complete scope at launch | In-scope FRs delivered and accepted by QA | 27 of 27 (FR-01..FR-27) |
| Fast on phones | Page load time on a 4G connection | Under 2 seconds (NFR-02) |

No other success metrics were stated by the stakeholder (requirements.md §1).

## 3. Users
- **Visitor:** reads the privacy notice, signs up with a password that meets the password rule,
  logs in, recovers a forgotten password.
- **Family member (user):** manages own tasks, sees shared tasks, marks done/undone, shares
  tasks, leaves the family, logs out on this phone or on all devices, deletes their account. A
  family is optional (Q-16).
- **Family creator:** invites people, sees and cancels unused invitations, removes members,
  hands over the creator role, deletes the family.
- **Invited person:** joins a family with an invitation link or code.
- **Stakeholder:** approves the privacy notice text before launch (Q-31).

## 4. Scope
- **In this release:** FR-01..FR-27 and NFR-01..NFR-08 as confirmed in `requirements.md`:
  - Accounts: login required (FR-01), email and password login (FR-02), self sign-up and
    forgotten-password recovery (FR-03), account deletion (FR-16), privacy notice (FR-23) and
    agreement at sign-up (FR-24), log out on this phone and "log out on all devices", with no
    tasks and no share notifications on a logged-out phone (FR-26), password rule at sign-up
    and when setting a new password (FR-27).
  - Tasks: create (FR-04), ordered task list (FR-05), mark done and undo (FR-06), overdue
    highlight (FR-07), priority (FR-08), edit and delete (FR-12), done list (FR-17), in-app
    reminder (FR-11).
  - Language: follows the phone/browser language (FR-13).
  - Family: create and invite (FR-14), join (FR-15), leave (FR-19), remove member (FR-20),
    delete family (FR-21), hand over creator role (FR-22), see and cancel unused invitations
    (FR-25).
  - Sharing: share with chosen members and change recipients (FR-09), share notification on
    the phones where the member is logged in (FR-10), shared task done for everyone (FR-18).
- **Out / later:** see `requirements.md` §5 "Out (confirmed)". Highlights: third-party login
  (Q-01); more than one family per user (Q-02); recipients editing or deleting shared tasks
  (Q-03); email or phone reminders (Q-04); notifications on change or done (Q-05); automatic
  priority (Q-06); invitation emails (Q-15); share with whole family in one action (Q-17);
  notification fallback (Q-25); native App Store / Google Play apps and computer browsers as a
  target (Q-27); language setting in the app (Q-12); separate "Overdue" section (Q-11);
  reminders for tasks due tomorrow (Q-19); ordering by due date first (Q-32); a logged-out
  phone still receiving share notifications (Q-33); letters with Vietnamese marks and spaces in
  passwords (Q-34). Not stated and not added: changing the password while logged in; automatic
  logout after a period of time (A-19). Nothing is deferred.

## 5. Requirements
| ID | Summary | Decided by |
|---|---|---|
| FR-01 | Login required before any task is shown | SRC-1 |
| FR-02 | Email and password login; no third-party login | Q-01 |
| FR-03 | Self sign-up and forgotten-password recovery; passwords meet FR-27 | Q-08, SRC-4 |
| FR-04 | Create task: title, required due date, optional due time | Q-09 |
| FR-05 | Task list of own and shared not-done tasks, ordered per BR-23 | Q-03, Q-10, Q-11, Q-32 |
| FR-06 | Mark done and undo; on shared tasks by owner or any current recipient | Q-10, Q-18, Q-22 |
| FR-07 | Overdue tasks in red at the top of the list | Q-11 |
| FR-08 | Priority High/Normal/Low chosen by the owner, default Normal | Q-06 |
| FR-09 | Share with picked family members; change recipients at any time | Q-03, Q-17, Q-26 |
| FR-10 | Phone notification when a task is shared, also when the app is closed, only on phones where the member is logged in | Q-05, Q-20, Q-25, Q-26, Q-33 |
| FR-11 | In-app reminder of tasks due today and overdue | Q-04, Q-19 |
| FR-12 | Owner edits and deletes own tasks; deleting a shared task removes it for everyone | Q-10, Q-26 |
| FR-13 | Interface language follows phone/browser; Vietnamese otherwise; no setting | Q-12 |
| FR-14 | Create a family; single-use, 7-day invitation link or code per person | Q-02, Q-15, Q-24 |
| FR-15 | Join a family with a valid invitation (log in or sign up first) | Q-02, Q-15, Q-24 |
| FR-16 | Delete own account (creator must hand over or delete family first) | Q-08, Q-21, Q-23 |
| FR-17 | Separate done list; done tasks not hidden over time | Q-10 |
| FR-18 | Shared task done for everyone, showing who marked it done | Q-18 |
| FR-19 | Leave a family (creator only after handover or deletion) | Q-16, Q-28, Q-29 |
| FR-20 | Creator removes a member | Q-16, Q-28 |
| FR-21 | Creator deletes the family; sharing ends, no task deleted | Q-16, Q-28 |
| FR-22 | Creator hands over the creator role | Q-16 |
| FR-23 | Privacy notice in Vietnamese and English, approved by stakeholder | Q-23, Q-31 |
| FR-24 | Agreement to the privacy notice required at sign-up | Q-23 |
| FR-25 | Creator sees and cancels unused invitations | Q-30 |
| FR-26 | Log out on this phone and "log out on all devices"; logged-out phones show no tasks and get no share notifications for that person | SRC-4, Q-33 |
| FR-27 | Password rule: at least 8 characters with a-z, A-Z, 0-9 and a keyboard symbol; only those characters | SRC-4, Q-34 |
| NFR-01 | PWA for phones (Chrome Android, Safari iOS), Home Screen install | Q-14, Q-27 |
| NFR-02 | Pages load in under 2 s on 4G | SRC-3 |
| NFR-03 | Vietnamese and English interface | Q-12 |
| NFR-04 | Passwords never stored readable and meet the password rule; all connections encrypted | Q-23, Q-34 |
| NFR-05 | Launch before 2027-02-06 with all features | Q-07 |
| NFR-06 | Small budget | SRC-1 |
| NFR-07 | Users see only their own tasks and tasks currently shared with them; a logged-out phone shows none | Q-23, Q-33 |
| NFR-08 | Personal data not shared with or sold to anyone | Q-23 |

Cross-cutting NFRs (NFR-02, NFR-04, NFR-07, NFR-08) apply to every story; stories cite them
where a specific check is observable.

## 6. Key decisions
| Question | Decision |
|---|---|
| Q-01 | Email and password only |
| Q-02 | One creator invites others; one family per user |
| Q-03 | Recipients view and mark done; shared tasks in their list |
| Q-04 / Q-19 | In-app reminder only: tasks due today and overdue |
| Q-05 / Q-20 / Q-25 | Phone notification on share only, even when the app is closed; no fallback |
| Q-06 | User picks priority; default Normal; table is guidance |
| Q-07 | Tet 2027; everything must be ready |
| Q-08 | Self sign-up, forgot password, account deletion |
| Q-09 | Due date required, time optional |
| Q-10 | Edit, delete, undo done; separate done list |
| Q-11 | Overdue from the day after (or after due time); red, at the top |
| Q-12 | Language follows phone/browser; Vietnamese otherwise; no setting |
| Q-15 / Q-24 / Q-30 | Creator sends a per-person link or code; single use, 7-day expiry; can list and cancel unused ones |
| Q-16 / Q-28 / Q-29 | Family optional; leave, remove, delete, hand over; sharing ends on changes; creator leaves only after handover or deletion |
| Q-17 / Q-26 | Owner picks recipients and can change them any time; deleting removes for everyone |
| Q-18 / Q-22 | Shared task done for everyone, showing who; owner or any recipient can undo |
| Q-21 | Creator must hand over or delete family before account deletion; tasks deleted for everyone |
| Q-23 / Q-31 | Data protection items 1-6; team drafts the privacy notice, stakeholder approves |
| Q-27 | PWA for phones only; no native app; computers not a target |
| Q-32 | List: overdue first; then by priority, then by due date and time |
| Q-33 | Log out ends the session on this phone only and stops its share notifications for the person; separate "log out on all devices" option |
| Q-34 | Passwords use only a-z, A-Z, 0-9 and keyboard symbols; no letters with Vietnamese marks, no spaces |

## 7. Assumptions, deferred items and risks
- Remaining assumptions (accepted at GATE 1 via understanding.md): A-12 (phone local time),
  A-13 (all texts in the person's interface language), A-14 (reminder covers own and shared
  not-done tasks), A-15 (expired invitations not listed), A-16 (same-day tasks without a time
  after timed tasks; exact ties oldest first), A-17 (reminder uses list order; done list most
  recently done first).
- Accepted at the change re-sign-off: A-18 (password rule at sign-up and when setting a new
  password after "forgot password"), A-19 (a person stays logged in until they log out; no
  automatic logout), A-20 (keyboard symbols = symbols on a standard English keyboard), A-21
  (resetting a password does not log out other phones).
- Deferred: none.
- Risks: R-01 tight schedule; R-03 web push limits on iPhone (accepted, no fallback); R-04
  residual legal risk (no lawyer review); R-05 password recovery depends on email delivery;
  R-06 forwarded invitations (reduced); R-07 sign-up launch depends on stakeholder approval of
  the privacy notice text; R-09 passwords with Vietnamese marks are refused, so screens must
  state the allowed characters clearly.

## 8. Story map
Priority reflects delivery order only: all stories are required for the launch (Q-07).
P0 = accounts (including password rule and log out on this phone) and personal tasks; P1 =
language, PWA install, reminder, family, sharing, notifications, log out on all devices and
account deletion.

1. S-01 Read the privacy notice
2. S-02 Sign up with email and password
3. S-03 Log in with email and password
4. S-04 Reset a forgotten password
5. S-29 Passwords follow the password rule
6. S-30 Log out on this phone
7. S-05 Create a task
8. S-06 See my tasks in priority order
9. S-07 Choose a task priority
10. S-08 Overdue tasks stand out
11. S-09 Mark a task done and see the done list
12. S-10 Undo "done"
13. S-11 Edit a task
14. S-12 Delete a task
15. S-13 See today's and overdue tasks when I open the app
16. S-14 App language follows my phone
17. S-15 Add TodoNow to my phone's Home Screen
18. S-16 Create a family
19. S-17 Invite a person to my family
20. S-18 Join a family with an invitation
21. S-19 See and cancel unused invitations
22. S-20 Share a task with chosen family members
23. S-21 Change who a task is shared with, or delete a shared task
24. S-22 A shared task done by anyone is done for everyone
25. S-23 Get a phone notification when a task is shared with me
26. S-31 Log out on all devices
27. S-32 No share notifications on a phone after I log out
28. S-24 Leave my family
29. S-25 Remove a member from my family
30. S-26 Hand over the creator role
31. S-27 Delete my family
32. S-28 Delete my account
