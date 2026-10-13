# S-02: Sign up with email and password

- **Priority:** P0
- **Covers:** FR-03, FR-24, FR-27, NFR-04 · **Decisions:** Q-01, Q-08, Q-23, Q-34
- **Depends on stories:** S-01

## User story
As a visitor, I want to create an account myself with my email and a password, so that I can
start using TodoNow without waiting for anyone.

## Acceptance criteria
1. **Successful sign-up**
   - Given I am a visitor on the sign-up screen
   - When I enter my email, a password that meets the password rule and my display name, agree to the privacy notice and submit
   - Then my account is created and I can log in with that email and password
2. **Agreement is required**
   - Given I have filled in the sign-up form
   - When I submit without agreeing to the privacy notice
   - Then no account is created and I am told that agreement is required
3. **Email already used**
   - Given an account already exists for an email
   - When I try to sign up with that email
   - Then no new account is created and I am told the email is already registered
4. **Password that breaks the rule is refused**
   - Given I have filled in the sign-up form and agreed to the privacy notice
   - When I submit a password that does not meet the password rule
   - Then no account is created and I am told the password rule
5. **Password not stored readable**
   - Given I have signed up
   - When the stored account data is inspected
   - Then my password cannot be read from it

## Out of scope
- Google or any other third-party sign-up (Q-01).
- Logging in (S-03) and password recovery (S-04).
- The detailed checks of each part of the password rule (S-29).
- Joining a family during sign-up from an invitation (S-18).

## Notes
- BR-19: no account without agreement to the privacy notice. The agreement is recorded with the
  account (`User`: privacy notice agreement).
- Password rule (FR-27, BR-24): at least 8 characters; at least one lowercase letter (a-z), one
  uppercase letter (A-Z), one digit (0-9) and one keyboard symbol (A-20); no other characters
  (no letters with Vietnamese marks, no spaces). The exact accepted and refused cases are
  specified in S-29.
- NFR-04: passwords are never stored in readable form; all connections are encrypted.
- Display name is part of the `User` entity; other members see it when a task is shared or
  marked done (S-20, S-22).
