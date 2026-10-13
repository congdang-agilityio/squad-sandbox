# S-19: Send a user a link to set a new password

- **Priority:** P1
- **Covers:** FR-10, FR-06, NFR-01 · **Decisions:** Q-09, Q-20; A-08
- **Depends on stories:** S-08

## User story
As a staff member (Administrator or Support), I want to send a user an email with a link to set a
new password, so that I can help a user who cannot log in.

## Acceptance criteria
1. **Link is sent**
   - Given a staff member has opened an active user account
   - When they send the password link
   - Then the user receives an email in Vietnamese and English with a link to set a new password, working like the app's "forgot password"
2. **New password works**
   - Given the user opens a valid link
   - When they set a password that meets the password rule
   - Then they can log in to the TodoNow app with it; a password that does not meet the rule is refused
3. **Other phones stay logged in**
   - Given the user is logged in on other phones
   - When they set the new password
   - Then those phones are not logged out
4. **Not for waiting accounts**
   - Given a waiting account
   - When a staff member opens it
   - Then the password link is not offered, because the person must agree to the privacy notice through the account email (S-11, S-12)

## Notes
- Support may do this (Q-20). The sending is recorded (S-24).
- For a blocked account, setting a new password does not unblock it (BR-09).
