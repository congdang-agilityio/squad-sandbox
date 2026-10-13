# S-06: See my tasks in priority order

- **Priority:** P0
- **Covers:** FR-05, NFR-07 · **Decisions:** Q-10, Q-32
- **Depends on stories:** S-05

## User story
As a family member, I want my open tasks listed with the most important and earliest first, so
that I see at a glance what to do next.

## Acceptance criteria
1. **Only my open tasks**
   - Given I am logged in and other users have tasks too
   - When I open my task list
   - Then I see only my own tasks that are not done, and no task of another user that is not shared with me
2. **Priority first**
   - Given I have tasks with priorities High, Normal and Low
   - When I open my task list
   - Then all High tasks come before all Normal tasks, and all Normal tasks before all Low tasks
3. **Then due date and time**
   - Given I have several tasks with the same priority
   - When I open my task list
   - Then they are ordered by due date and time, earliest first
4. **Same-day ties**
   - Given two tasks have the same priority and the same due date, and only one has a due time
   - When I open my task list
   - Then the task with a due time comes first; tasks with exactly the same priority, date and time are shown oldest-created first
5. **Empty list**
   - Given I have no tasks that are not done
   - When I open my task list
   - Then the list shows no tasks

## Out of scope
- Overdue tasks first and in red (S-08).
- Tasks shared with me appearing in the list (S-20).
- Done tasks (S-09).

## Notes
- BR-23 (Q-32): overdue group first, then the rest; within each group by priority, then due
  date and time. This story builds the ordering for the non-overdue group; S-08 adds the
  overdue group on top using the same ordering.
- A-16: same-day tasks without a time come after tasks with a time; exact ties keep creation
  order.
- Example: a Low task due today comes after a High task due next month.
