# S-32: No share notifications on a phone after I log out

- **Priority:** P1
- **Covers:** FR-26, FR-10, NFR-07 · **Decisions:** Q-33
- **Depends on stories:** S-23, S-30, S-31

## User story
As a family member, I want a phone I have logged out on to stop getting my "shared with you"
notifications, so that whoever uses that phone does not see my tasks.

## Acceptance criteria
1. **Logged-out phone gets no notification**
   - Given I allowed TodoNow notifications on phone A and then logged out on phone A
   - When a family member shares a task with me
   - Then phone A receives no notification about that task
2. **Phones where I am still logged in are notified**
   - Given I logged out on phone A and I am still logged in on phone B with notifications allowed
   - When a family member shares a task with me
   - Then phone B receives the notification and phone A does not
3. **After "log out on all devices"**
   - Given I have used "Log out on all devices"
   - When a family member shares a task with me
   - Then none of my phones receives a notification, and the task is in my task list when I log in again
4. **Notifications resume after logging in again**
   - Given I logged out on phone A and notifications are still allowed on it
   - When I log in on phone A again and then a task is shared with me
   - Then phone A receives the notification
5. **Another person on the same phone**
   - Given I logged out on phone A and another family member then logged in on phone A
   - When a task is shared with me
   - Then phone A does not show a notification for me

## Out of scope
- A logged-out phone continuing to receive the person's notifications (Q-33: option C not
  chosen).
- Notifications on change or done (Q-05); any fallback (Q-25).

## Notes
- BR-25, BR-26, FR-10: share notifications go only to phones on which the recipient is
  currently logged in (`Login on a device`).
- Tasks shared while the person was logged out on every phone appear in their task list after
  they log in (FR-05). Sending a notification later for those shares is not stated in the
  requirements and is not added.
- R-03 still applies: on iPhone, notifications require the PWA on the Home Screen (S-15).
