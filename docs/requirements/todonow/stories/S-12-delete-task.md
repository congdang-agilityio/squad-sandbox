# S-12: Delete a task

- **Priority:** P0
- **Covers:** FR-12 (delete) · **Decisions:** Q-10
- **Depends on stories:** S-09

## User story
As a task owner, I want to delete a task I no longer need, so that my lists stay clean.

## Acceptance criteria
1. **Delete an open task**
   - Given I own a task that is not done
   - When I delete it
   - Then it no longer appears in my task list
2. **Delete a done task**
   - Given I own a task in my done list
   - When I delete it
   - Then it no longer appears in my done list

## Out of scope
- Deleting a shared task, which removes it for everyone (S-21).

## Notes
- Only the owner deletes a task (BR-06).
