# TodoNow admin area: user administration for the TodoNow team

An admin area where the TodoNow team manages all TodoNow user accounts, used in a computer
browser in Vietnamese or English following the browser language. Staff log in with a separate
admin account and a one-time code sent to their admin email, and have one of two roles:
Administrator (everything) or Support (find and view accounts, send a password link).
Administrators give, change and remove staff access. Staff search and filter the user list and
view account data, never tasks. Administrators create accounts one by one or import a CSV file
of up to about 1,000 people (email and display name), skipping wrong and existing rows with a
reason; each person gets a Vietnamese and English email with a 7-day link to set a password and
agree to the privacy notice, or can sign up with the same email; accounts not activated within
30 days are deleted. Administrators change display names, block and unblock accounts (nothing
changes for others) and delete accounts permanently (a deleted family creator's role passes to
the earliest-joined member). Users get an email about name changes, blocks and deletions. Staff
actions are recorded for Administrators to view, kept 1 year, without the email or name of
deleted users. The privacy notice is updated and existing users must agree to it the next time
they open the app. Delivered after the Tet 2027 launch, within about 3 months after it.

- Requirements: `docs/requirements/user-admin/requirements.md` (signed off 2026-10-13 by Cong)
- PRD: `docs/requirements/user-admin/prd.md`
- Stories and traceability: `docs/requirements/user-admin/stories.md`

## Stories
- [ ] S-01 Log in to the admin area with an email code (P0)
- [ ] S-02 Admin area language follows the browser (P1)
- [ ] S-03 Give a team member admin access (P0)
- [ ] S-04 Change a staff member's role or remove their access (P1)
- [ ] S-05 Reset a forgotten admin password (P1)
- [ ] S-06 Find user accounts by search (P0)
- [ ] S-07 Filter the user list (P1)
- [ ] S-08 View a user account (P0)
- [ ] S-09 Publish the updated privacy notice (P0)
- [ ] S-10 Create one user account (P0)
- [ ] S-11 Start using a created account through the email link (P0)
- [ ] S-12 Send the account email again (P1)
- [ ] S-13 Sign up with the email of a waiting account (P1)
- [ ] S-14 Waiting accounts are deleted after 30 days (P1)
- [ ] S-15 Import people from a CSV file (P1)
- [ ] S-16 CSV import skips wrong and existing rows (P1)
- [ ] S-17 CSV file size limit (P2)
- [ ] S-18 Change a user's display name (P1)
- [ ] S-19 Send a user a link to set a new password (P1)
- [ ] S-20 Block and unblock a user (P1)
- [ ] S-21 Delete a user account (P1)
- [ ] S-22 Delete the account of a family creator (P1)
- [ ] S-23 Email users about admin actions (P1)
- [ ] S-24 Record of staff actions (P1)
- [ ] S-25 Record of staff actions: deleted users and 1-year limit (P1)
- [ ] S-26 Existing users agree to the updated privacy notice (P1)

## Key risks
- Open input: the contact address for the admin-action emails (S-23) is still needed from the
  stakeholder.
- An Administrator account can affect every user; whoever controls an admin mailbox controls
  the login code and password recovery (R-03).
- Every start, login and recovery depends on email delivery; one import can send about 1,000
  emails at once (R-05).
- The admin area cannot be used before the stakeholder approves the updated privacy notice, and
  existing users are interrupted until they agree to it (R-06).
- Privacy rules (Decree 13/2023) may still not be met; the team cannot give legal advice (R-02).
