# S-04: Reset a forgotten password

- **Priority:** P0
- **Covers:** FR-03, FR-27 · **Decisions:** Q-08, Q-34
- **Depends on stories:** S-03

## User story
As a family member who forgot my password, I want to set a new password through my email, so
that I can get back into my account.

## Acceptance criteria
1. **Request a reset**
   - Given I have an account and I am on the login screen
   - When I choose "forgot password" and enter my email
   - Then I receive an email that lets me set a new password
2. **Set a new password**
   - Given I received the reset email
   - When I follow it and set a new password that meets the password rule
   - Then I can log in with the new password and no longer with the old one
3. **New password that breaks the rule is refused**
   - Given I followed the reset email
   - When I submit a new password that does not meet the password rule
   - Then the new password is not saved, I am told the password rule, and my old password still works
4. **Other phones stay logged in**
   - Given I am logged in on another phone
   - When I set a new password after "forgot password"
   - Then that other phone stays logged in

## Out of scope
- Changing the password while logged in: not stated in the requirements.
- The detailed checks of each part of the password rule (S-29).
- Logging out on other phones as part of the reset; the person can use "log out on all devices"
  (S-31) if they want to (A-21).

## Notes
- Recovery depends on reliable email delivery (R-05). This is the only email TodoNow sends:
  invitations and share notifications do not use email (Q-15, Q-20).
- The reset email is in the person's interface language (A-13).
- A-18 (accepted at the change re-sign-off): the password rule (FR-27, BR-24) also applies to a
  new password set after "forgot password".
- A-21 (accepted at the change re-sign-off): resetting the password does not log the person out
  on their other phones.
