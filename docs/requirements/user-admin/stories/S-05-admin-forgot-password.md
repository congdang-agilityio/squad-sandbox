# S-05: Reset a forgotten admin password

- **Priority:** P1
- **Covers:** FR-19, NFR-01 · **Decisions:** Q-31; A-23, A-27
- **Depends on stories:** S-03

## User story
As a staff member who forgot my admin password, I want a "forgot password" link on the admin
login page, so that I can set a new password myself.

## Acceptance criteria
1. **Link is sent**
   - Given an active admin account
   - When the staff member uses "forgot password" on the admin login page and enters its email
   - Then an email in Vietnamese and English with a link to set a new password is sent to that admin email
2. **Same message for every email**
   - Given any email address, whether or not it has an admin account
   - When it is entered in "forgot password"
   - Then the page shows the same message, so it does not reveal whether an admin account exists
3. **New password is set**
   - Given a link sent less than 24 hours ago and not used
   - When the staff member sets a password that meets the password rule
   - Then the new password is saved, the link cannot be used again, and logging in still needs the email code (S-01)
4. **Link or password refused**
   - Given a link older than 24 hours or already used, or a password that does not meet the password rule
   - When the staff member uses it
   - Then nothing is saved and a message explains why

## Out of scope
- A staff member who can no longer open their admin email: removed and given access again (S-04, S-03).

## Notes
- A removed admin account is treated like an email without an admin account (no link is sent).
