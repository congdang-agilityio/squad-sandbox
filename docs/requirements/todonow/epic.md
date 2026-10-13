# TodoNow: family todo app (PWA) for the Tet 2027 launch

TodoNow is a simple todo app for busy families. Family members record tasks with a title, a
required due date (optional time) and a priority (High, Normal, Low), see their open tasks with
overdue ones in red at the top, mark tasks done (and undo), and keep a separate done list. A
family is optional: one creator invites people with a single-use, 7-day link or code, and can
remove members, hand over the creator role or delete the family. Task owners share tasks with
chosen family members, who get a phone notification; a shared task done by anyone is done for
everyone. Accounts use email and password with sign-up, password recovery and account deletion,
and a privacy notice agreed at sign-up. Passwords must have at least 8 characters with a
lowercase letter, an uppercase letter, a digit and a keyboard symbol (only a-z, A-Z, 0-9 and
keyboard symbols). People can log out on the phone they are using or on all their phones at
once; a logged-out phone shows no tasks and gets no share notifications for that person. The
app is a PWA for phones (Chrome on Android, Safari on iPhone), in Vietnamese or English
following the phone language, with pages loading in under 2 seconds on 4G. Every story below
is required for the launch before Tet 2027 (2027-02-06).

- Requirements: `docs/requirements/todonow/requirements.md` (signed off 2026-10-13 by Cong;
  log out and password rule change re-signed 2026-10-13 by Cong)
- PRD: `docs/requirements/todonow/prd.md`
- Stories and traceability: `docs/requirements/todonow/stories.md`

## Stories
- [ ] S-01 Read the privacy notice (P0)
- [ ] S-02 Sign up with email and password (P0)
- [ ] S-03 Log in with email and password (P0)
- [ ] S-04 Reset a forgotten password (P0)
- [ ] S-05 Create a task (P0)
- [ ] S-06 See my tasks in priority order (P0)
- [ ] S-07 Choose a task priority (P0)
- [ ] S-08 Overdue tasks stand out (P0)
- [ ] S-09 Mark a task done and see the done list (P0)
- [ ] S-10 Undo "done" (P0)
- [ ] S-11 Edit a task (P0)
- [ ] S-12 Delete a task (P0)
- [ ] S-13 See today's and overdue tasks when I open the app (P1)
- [ ] S-14 App language follows my phone (P1)
- [ ] S-15 Add TodoNow to my phone's Home Screen (P1)
- [ ] S-16 Create a family (P1)
- [ ] S-17 Invite a person to my family (P1)
- [ ] S-18 Join a family with an invitation (P1)
- [ ] S-19 See and cancel unused invitations (P1)
- [ ] S-20 Share a task with chosen family members (P1)
- [ ] S-21 Change who a task is shared with, or delete a shared task (P1)
- [ ] S-22 A shared task done by anyone is done for everyone (P1)
- [ ] S-23 Get a phone notification when a task is shared with me (P1)
- [ ] S-24 Leave my family (P1)
- [ ] S-25 Remove a member from my family (P1)
- [ ] S-26 Hand over the creator role (P1)
- [ ] S-27 Delete my family (P1)
- [ ] S-28 Delete my account (P1)
- [ ] S-29 Passwords follow the password rule (P0)
- [ ] S-30 Log out on this phone (P0)
- [ ] S-31 Log out on all devices (P1)
- [ ] S-32 No share notifications on a phone after I log out (P1)

## Key risks
- Tight schedule: about 16 weeks with a small budget and every feature required (R-01).
- Phone notifications from a web app are limited on iPhone; no fallback by decision (R-03).
- Sign-up depends on the stakeholder approving the privacy notice text before launch (R-07).
- People who type Vietnamese letters with marks will have such passwords refused; the screens
  must state the allowed characters clearly (R-09).
