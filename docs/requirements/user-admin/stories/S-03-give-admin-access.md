# S-03: Give a team member admin access

- **Priority:** P0
- **Covers:** FR-12, FR-06, NFR-01 · **Decisions:** Q-13, Q-20, Q-21, Q-30; A-11, A-18, A-27
- **Depends on stories:** S-01

## User story
As an Administrator, I want to give a TodoNow team member admin access with a role, so that
they can help manage user accounts without anyone handing them a password.

## Acceptance criteria
1. **Give access with a role**
   - Given an Administrator is logged in
   - When they enter a team member's email address and choose the role Administrator or Support
   - Then an admin account waiting for its password appears in the list of admin accounts with that role, and an email in Vietnamese and English with a link to set the password is sent to that address
2. **New staff member sets their password**
   - Given a set-password link sent less than 24 hours ago and not used
   - When the new staff member opens it and sets a password that meets the password rule
   - Then they can log in with that password and the email code (S-01), and the link cannot be used again
3. **Link or password refused**
   - Given a link older than 24 hours or already used, or a password that does not meet the password rule
   - When the new staff member uses it
   - Then nothing is saved and a message explains why
4. **Send a new link**
   - Given an admin account still waiting for its password
   - When an Administrator sends a new set-password link
   - Then the staff member receives a new email with a link that works for 24 hours
5. **Support cannot manage staff**
   - Given a staff member with the role Support is logged in
   - When they look for staff management or try to give access
   - Then it is not offered and any attempt is refused

## Out of scope
- Changing a role or removing access (S-04).

## Notes
- Password rule: at least 8 characters with a lowercase letter, an uppercase letter, a digit and a keyboard symbol; only a-z, A-Z, 0-9 and keyboard symbols (BR-02).
- An admin account may use the same email as the team member's own TodoNow app account; the two are independent (A-11).
- Role rights (FR-06, BR-08): Support may only list, search, filter and view user accounts and send a password link. Each Administrator-only story checks that Support is refused.
- Giving access is recorded (S-24).
