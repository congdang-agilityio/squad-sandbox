# S-30: Log out on this phone

- **Priority:** P0
- **Covers:** FR-26, FR-01, NFR-07 · **Decisions:** Q-33
- **Depends on stories:** S-03

## User story
As a family member, I want to log out on the phone I am using, so that nobody else who uses
this phone can see my tasks.

## Acceptance criteria
1. **Log out**
   - Given I am logged in on my phone
   - When I choose "Log out"
   - Then I see the login screen and none of my tasks is shown
2. **No tasks after logging out**
   - Given I have logged out on this phone
   - When I open TodoNow again, go back to a previous screen, or open a task page
   - Then I see the login screen and no task is shown
3. **Other phones stay logged in**
   - Given I am logged in on phone A and on phone B
   - When I log out on phone A
   - Then I am still logged in on phone B and see my task list there
4. **Log in again on this phone**
   - Given I have logged out on this phone
   - When I, or another person with an account, log in on it
   - Then the person who logged in sees only their own tasks and the tasks shared with them

## Out of scope
- Logging out on every phone at once (S-31).
- The effect of logging out on share notifications (S-32).
- Automatic logout after a period of time: not stated in the requirements (A-19).

## Notes
- BR-25 (Q-33): after logging out, this phone shows no tasks until someone logs in again.
- Logging out ends only the `Login on a device` for this phone.
- Logging out does not delete anything: tasks, family membership and sharing stay as they are.
- A-13: all texts in the person's interface language.
