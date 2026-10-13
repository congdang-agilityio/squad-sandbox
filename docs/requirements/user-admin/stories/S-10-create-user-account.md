# S-10: Create one user account

- **Priority:** P0
- **Covers:** FR-02, FR-09, FR-06 · **Decisions:** Q-07, Q-11, Q-20, Q-23, Q-25
- **Depends on stories:** S-06, S-09

## User story
As an Administrator, I want to create a TodoNow account for one person with their email and
display name, so that they get an email to start using TodoNow.

## Acceptance criteria
1. **Account is created as waiting**
   - Given an Administrator is logged in
   - When they enter an email address and a display name and create the account
   - Then a user account with status waiting and today's creation date appears in the list
2. **Account email is sent**
   - Given the account was just created
   - When the person checks their mailbox
   - Then they have an email in Vietnamese and English in the same email with a link, working for 7 days, to set their password and agree to the privacy notice
3. **Email already used**
   - Given the email address already has a TodoNow account (waiting, active or blocked)
   - When the Administrator tries to create an account for it
   - Then it is refused with a message and no email is sent
4. **Missing or invalid input**
   - Given a missing or invalid email address, or a missing display name
   - When the Administrator tries to create the account
   - Then it is refused with a message
5. **Support cannot create**
   - Given a staff member with the role Support
   - When they try to create an account
   - Then it is not offered and any attempt is refused

## Out of scope
- Using the link (S-11). Sending it again (S-12). Import (S-15).

## Notes
- The person is not put in any family.
- Creation is recorded (S-24).
