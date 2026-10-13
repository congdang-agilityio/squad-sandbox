# S-12: Send the account email again

- **Priority:** P1
- **Covers:** FR-15, FR-06 · **Decisions:** Q-20, Q-23; A-15, A-21
- **Depends on stories:** S-11

## User story
As an Administrator, I want to send a new account email to a person who has not started yet,
so that they can still start when their first link stopped working or got lost.

## Acceptance criteria
1. **New email is sent**
   - Given a waiting account
   - When an Administrator sends the account email again
   - Then the person receives a new email in Vietnamese and English with a link that works for 7 days
2. **Earlier links stop working**
   - Given earlier account emails for the same account
   - When a new one has been sent
   - Then the links in the earlier emails no longer work
3. **30 days are not extended**
   - Given an account created 25 days ago
   - When an Administrator sends a new account email
   - Then the account is still deleted 30 days after it was created if not activated (S-14), and the link stops working then
4. **Only for waiting accounts**
   - Given an active or blocked account
   - When an Administrator opens it
   - Then sending the account email is not offered
5. **Support cannot resend**
   - Given a staff member with the role Support
   - When they try to send the account email
   - Then it is not offered and any attempt is refused

## Notes
- Resending is recorded (S-24).
