# S-23: Get a phone notification when a task is shared with me

- **Priority:** P1
- **Covers:** FR-10 · **Decisions:** Q-05, Q-20, Q-25, Q-26
- **Depends on stories:** S-21, S-15, S-14

## User story
As a family member, I want a phone notification when a task is shared with me, so that I know
about it even when TodoNow is closed.

## Acceptance criteria
1. **Notified on share, even when closed**
   - Given I have allowed TodoNow notifications on my phone and TodoNow is closed
   - When a family member shares a task with me
   - Then I receive a phone notification about that task
2. **Notified when added later**
   - Given I have allowed notifications
   - When the owner adds me to a task that is already shared with others
   - Then I receive a phone notification about that task
3. **No other notifications**
   - Given a task is shared with me
   - When the task is edited, marked done, undone, deleted, or I am removed from it
   - Then I receive no notification
4. **No permission, no fallback**
   - Given I have not allowed notifications, or my iPhone has not added TodoNow to the Home Screen
   - When a task is shared with me
   - Then I receive no notification and nothing else, and the task appears in my task list
5. **In my language**
   - Given my interface language is Vietnamese or English
   - When I receive a share notification
   - Then the notification text is in my interface language

## Out of scope
- Email or in-app "new" mark fallback (Q-25).
- Notifications on change or done (Q-05).
- What happens to notifications on a phone after logging out (S-32).

## Notes
- BR-07. Each user must allow notifications; the permission is part of `User`.
- FR-10 (Q-33): notifications go only to phones on which the recipient is logged in. In this
  story the recipient is logged in on the phone; the logged-out cases are in S-32.
- R-03 (accepted): on iPhone notifications work only on recent iOS versions after the PWA is added
  to the Home Screen (S-15).
- A-13: language of the recipient. The exact notification wording is not specified in the
  requirements.
