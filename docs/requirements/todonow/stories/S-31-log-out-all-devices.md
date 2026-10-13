# S-31: Log out on all devices

- **Priority:** P1
- **Covers:** FR-26, NFR-07 · **Decisions:** Q-33
- **Depends on stories:** S-30

## User story
As a family member, I want to log out on every phone I am logged in on at once, so that my
tasks are safe if a phone is lost or was lent to someone.

## Acceptance criteria
1. **Separate option**
   - Given I am logged in on my phone
   - When I look at the log-out options
   - Then I see "Log out" (this phone only) and a separate "Log out on all devices" option
2. **Every phone is logged out**
   - Given I am logged in on phone A and on phone B
   - When I choose "Log out on all devices" on phone A
   - Then phone A shows the login screen with no tasks, and any further use of TodoNow on phone B shows the login screen with no tasks
3. **Log in again afterwards**
   - Given I have used "Log out on all devices"
   - When I log in again on any phone with my email and password
   - Then I am logged in on that phone only and see my task list

## Out of scope
- Logging out on one chosen other phone, or a list of the phones I am logged in on: not stated
  in the requirements.
- The effect on share notifications (S-32).

## Notes
- BR-26 (Q-33): "log out on all devices" logs the user out on every phone they are logged in
  on, including the one they are using; BR-25 then applies to each of those phones.
- Resetting a forgotten password does not do this automatically (A-21, S-04).
- A-13: all texts in the person's interface language.
