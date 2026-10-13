# S-13: Sign up with the email of a waiting account

- **Priority:** P1
- **Covers:** FR-16 · **Decisions:** Q-27; A-22
- **Depends on stories:** S-10

## User story
As a person for whom an account was created, I want to sign up in the TodoNow app with the same
email instead of using the link, so that I am not stuck if I missed or ignored the email.

## Acceptance criteria
1. **Sign-up completes the waiting account**
   - Given a waiting account for an email address
   - When a person signs up in the TodoNow app with that email, sets a password that meets the password rule and agrees to the privacy notice
   - Then that account becomes active and they can use the app
2. **Display name is kept**
   - Given the display name entered by the Administrator or in the CSV file
   - When sign-up completes the waiting account
   - Then the account keeps that display name
3. **Email link stops working**
   - Given the account email sent for that account
   - When sign-up has completed the account
   - Then its link no longer works
4. **Active or blocked email still refused**
   - Given an email address with an active or blocked account
   - When a person tries to sign up with it
   - Then sign-up is refused as today

## Notes
- BR-06, BR-14. Only one change to TodoNow sign-up (A-06).
