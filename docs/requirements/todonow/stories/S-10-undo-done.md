# S-10: Undo "done"

- **Priority:** P0
- **Covers:** FR-06 (undo) · **Decisions:** Q-10
- **Depends on stories:** S-09

## User story
As a family member, I want to undo "done" on a task, so that a task I marked done by mistake
comes back to my list.

## Acceptance criteria
1. **Undo returns the task**
   - Given a task is in my done list
   - When I undo "done"
   - Then it leaves the done list and appears in my task list in its ordered place
2. **Undone task can be overdue**
   - Given a done task whose due date has passed
   - When I undo "done"
   - Then it appears in red among the overdue tasks at the top of my list

## Out of scope
- Undoing "done" on a shared task by the owner or a recipient (S-22).

## Notes
- BR-09: undoing "done" returns the task to the main list. Ordering per BR-23.
