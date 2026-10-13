# S-11: Edit a task

- **Priority:** P0
- **Covers:** FR-12 (edit), FR-08 (change priority) · **Decisions:** Q-06, Q-10
- **Depends on stories:** S-07, S-08

## User story
As a task owner, I want to change a task's title, due date, due time or priority, so that the
task stays correct when plans change.

## Acceptance criteria
1. **Save changes**
   - Given I own a task
   - When I change its title, due date, due time or priority and save
   - Then the task shows the new values and moves to its new place in my list
2. **Required fields stay required**
   - Given I am editing a task
   - When I remove the title or the due date and try to save
   - Then the change is not saved and I am told the field is required
3. **Overdue status follows the new date**
   - Given I have an overdue task
   - When I change its due date to a future date
   - Then it is no longer shown in red or at the top as overdue

## Out of scope
- Changing who a task is shared with (S-21).
- Recipients editing a shared task (not allowed, BR-06; checked in S-20).

## Notes
- Only the owner edits a task (BR-06).
- The due time can also be removed, leaving the date only (BR-02).
