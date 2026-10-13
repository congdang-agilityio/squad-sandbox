# S-03: Log in with email and password

- **Priority:** P0
- **Covers:** FR-01, FR-02 · **Decisions:** Q-01
- **Depends on stories:** S-02

## User story
As a family member, I want to log in with my email and password, so that only I can see my
tasks.

## Acceptance criteria
1. **Successful login**
   - Given I have an account
   - When I log in with my correct email and password
   - Then I am logged in and see my task list
2. **Wrong credentials**
   - Given I have an account
   - When I log in with a wrong password or an unknown email
   - Then I am not logged in and I am told the email or password is incorrect
3. **No tasks without login**
   - Given I am not logged in
   - When I open TodoNow or try to open any task page
   - Then I see the login screen and no task is shown
4. **No third-party login**
   - Given I am on the login screen
   - When I look at the login options
   - Then only email and password login is offered (no Google or other provider)
5. **I stay logged in**
   - Given I have logged in on my phone
   - When I close TodoNow and open it again later
   - Then I am still logged in and see my task list without logging in again

## Out of scope
- Password recovery (S-04).
- Logging out on this phone (S-30) and "log out on all devices" (S-31).
- Automatic logout after a period of time: not stated in the requirements (A-19).

## Notes
- BR-01: no task is visible to a user who is not logged in.
- C-01 was resolved by Q-01 in favour of the brief: email and password only.
- A-19 (accepted at the change re-sign-off): a person stays logged in on a phone until they log
  out (S-30, S-31) or delete their account (S-28).
- Each login is per phone (`Login on a device`): a person may be logged in on several phones at
  the same time.
- The password rule (FR-27) is checked when a password is set (S-02, S-04, S-29), not at login.
