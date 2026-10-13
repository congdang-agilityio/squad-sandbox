# S-11: Start using a created account through the email link

- **Priority:** P0
- **Covers:** FR-09, NFR-01 · **Decisions:** Q-07, Q-23
- **Depends on stories:** S-10

## User story
As a person for whom an account was created, I want to set my own password and agree to the
privacy notice through the link in my email, so that I can start using TodoNow.

## Acceptance criteria
1. **Waiting account cannot be used**
   - Given a waiting account
   - When anyone tries to log in to the TodoNow app with its email
   - Then the login is refused
2. **Activate through the link**
   - Given a link sent less than 7 days ago, not used and not replaced
   - When the person sets a password that meets the password rule and agrees to the privacy notice
   - Then the account becomes active and they can log in to the TodoNow app with that email and password
3. **Agreement is required**
   - Given the person has opened the link
   - When they do not agree to the privacy notice
   - Then the account stays waiting
4. **Password rule**
   - Given a password that does not meet the password rule
   - When the person submits it
   - Then it is refused with a message and nothing is saved
5. **Link does not work**
   - Given a link older than 7 days, already used, or replaced by a newer one
   - When the person opens it
   - Then a message says the link no longer works and nothing changes

## Out of scope
- Signing up in the app with the same email instead (S-13). Deletion after 30 days (S-14).

## Notes
- BR-01, BR-02, BR-07. The person agrees to the updated privacy notice (S-09).
- After activation the person is not in any family; they can join one with a normal family invitation.
