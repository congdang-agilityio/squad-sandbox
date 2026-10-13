# S-26: Existing users agree to the updated privacy notice

- **Priority:** P1
- **Covers:** FR-20 · **Decisions:** Q-32, Q-35; A-25
- **Depends on stories:** S-09

## User story
As a TodoNow user who agreed to the old privacy notice, I want to be asked to read and agree to
the updated notice, so that I know about the changes before I continue using the app.

## Acceptance criteria
1. **Asked at the next opening**
   - Given a user who agreed only to the old notice, still logged in or not
   - When they next start or reload the app
   - Then they see the updated notice and must agree before they can continue
2. **Agreeing**
   - Given the user sees the updated notice
   - When they agree
   - Then they continue using the app and are not asked again
3. **Not agreeing**
   - Given the user does not agree
   - When they stay on the notice screen
   - Then they can only log out, their account and data stay unchanged, and they are asked again the next time they open the app
4. **App already open**
   - Given a user has the app open when the updated notice comes into use
   - When they keep using it
   - Then they are asked at their next start or reload
5. **Not asked twice**
   - Given a user who already agreed to the updated notice (at sign-up or activation)
   - When they open the app
   - Then they are not asked

## Notes
- BR-01, BR-15. R-06: this interrupts users who open the app for something quick.
