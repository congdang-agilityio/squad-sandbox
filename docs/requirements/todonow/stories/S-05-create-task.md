# S-05: Create a task

- **Priority:** P0
- **Covers:** FR-04, FR-08 (default priority) · **Decisions:** Q-06, Q-09
- **Depends on stories:** S-03

## User story
As a family member, I want to create a task with a title and a due date, so that I do not
forget what I have to do and by when.

## Acceptance criteria
1. **Create with title and due date**
   - Given I am logged in
   - When I create a task with a title and a due date
   - Then the task is saved and appears in my task list
2. **Optional due time**
   - Given I am creating a task
   - When I also enter a due time
   - Then the task is saved with that due date and time; without a time it is saved with the date only
3. **Title required**
   - Given I am creating a task
   - When I submit without a title
   - Then the task is not created and I am told a title is required
4. **Due date required**
   - Given I am creating a task
   - When I submit without a due date
   - Then the task is not created and I am told a due date is required
5. **Default priority**
   - Given I am creating a task and do not choose a priority
   - When I save it
   - Then the task has priority Normal

## Out of scope
- Choosing High or Low priority and the priority guidance (S-07).
- Ordering of the list (S-06) and overdue highlighting (S-08).
- Sharing the task (S-20).

## Notes
- BR-02: every task has a title and a due date; the time is optional.
- BR-03: a new task defaults to Normal.
- The creator of a task is its owner.
