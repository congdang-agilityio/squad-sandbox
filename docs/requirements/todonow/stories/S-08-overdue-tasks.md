# S-08: Overdue tasks stand out

- **Priority:** P0
- **Covers:** FR-07, FR-05 (overdue group) · **Decisions:** Q-11, Q-32
- **Depends on stories:** S-06

## User story
As a family member, I want overdue tasks shown in red at the top of my list, so that I notice
what I am late with.

## Acceptance criteria
1. **Overdue without a due time**
   - Given a task that is not done, has due date 14 October and no due time
   - When I look at my list on 14 October and again on 15 October
   - Then it is not overdue on 14 October and is overdue from 15 October
2. **Overdue with a due time**
   - Given a task that is not done, due 14 October at 17:00
   - When I look at my list at 16:59 and again at 17:01 on that day
   - Then it is not overdue at 16:59 and is overdue at 17:01
3. **Shown in red**
   - Given I have an overdue task
   - When I open my task list
   - Then the overdue task is shown in red and tasks that are not overdue are not
4. **Overdue tasks on top, in the same order**
   - Given I have overdue and non-overdue tasks of different priorities
   - When I open my task list
   - Then all overdue tasks come before all other tasks, and the overdue tasks are ordered by priority, then due date and time, earliest first

## Out of scope
- A separate "Overdue" section (Q-11: out of scope).
- Overdue tasks in the in-app reminder (S-13).

## Notes
- BR-04: a done task is never overdue.
- A-12: "today", due dates and due times are read in the local time of the person's phone.
- BR-21, BR-23.
