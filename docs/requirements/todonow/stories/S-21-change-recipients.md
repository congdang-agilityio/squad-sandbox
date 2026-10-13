# S-21: Change who a task is shared with, or delete a shared task

- **Priority:** P1
- **Covers:** FR-09 (change recipients), FR-12 (delete shared task) · **Decisions:** Q-26
- **Depends on stories:** S-20, S-12

## User story
As a task owner, I want to add or remove the family members a task is shared with, and to delete
a shared task for everyone, so that the right people see the right tasks.

## Acceptance criteria
1. **Add a member later**
   - Given I own a task shared with some family members
   - When I add another family member to it
   - Then that member also sees the task in their list
2. **Remove a member**
   - Given I own a task shared with a family member
   - When I remove that member from it
   - Then that member no longer sees the task in any of their lists
3. **Delete for everyone**
   - Given I own a task shared with family members
   - When I delete it
   - Then it disappears from my lists and from the lists of everyone it was shared with

## Out of scope
- Notification to newly added members (S-23).
- Recipients changing who a task is shared with (not allowed, BR-06; checked in S-20).

## Notes
- BR-16. Removed members get no notification (BR-07).
