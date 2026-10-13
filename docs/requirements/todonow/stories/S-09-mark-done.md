# S-09: Mark a task done and see the done list

- **Priority:** P0
- **Covers:** FR-06 (mark done), FR-17 · **Decisions:** Q-10
- **Depends on stories:** S-06

## User story
As a family member, I want to mark a task done and find it later in a separate done list, so
that my task list shows only what is left to do.

## Acceptance criteria
1. **Mark done**
   - Given I have a task that is not done in my task list
   - When I mark it done
   - Then it leaves my task list and appears in my done list
2. **Overdue task done**
   - Given I have an overdue task
   - When I mark it done
   - Then it is no longer shown as overdue anywhere
3. **Done list order**
   - Given I have marked several tasks done at different times
   - When I open my done list
   - Then the most recently done task is shown first
4. **Done tasks stay**
   - Given a task has been in my done list for a long time
   - When I open my done list
   - Then the task is still there; done tasks are not hidden or removed over time

## Out of scope
- Undoing "done" (S-10).
- Marking a shared task done for everyone (S-22).

## Notes
- BR-09: a done task leaves the main list and appears in the done list.
- A-17: the done list shows the most recently done task first.
