# S-13: See today's and overdue tasks when I open the app

- **Priority:** P1
- **Covers:** FR-11 · **Decisions:** Q-04, Q-19
- **Depends on stories:** S-08

## User story
As a family member, I want TodoNow to remind me of what is due today and what is overdue when I
open it, so that I do not miss anything urgent.

## Acceptance criteria
1. **Reminder on opening**
   - Given I have tasks due today and overdue tasks that are not done
   - When I open TodoNow
   - Then a reminder shows those tasks
2. **Only today and overdue**
   - Given I also have tasks due tomorrow or later, and done tasks
   - When I open TodoNow
   - Then the reminder does not show them
3. **Same order as the list**
   - Given the reminder shows several tasks
   - When I look at it
   - Then the tasks are in the same order as in my task list (overdue first, then by priority, then due date and time)
4. **Nothing due**
   - Given I have no tasks due today and no overdue tasks
   - When I open TodoNow
   - Then the reminder lists no tasks

## Out of scope
- Email or phone reminders (Q-04).
- Tasks due tomorrow (Q-19).
- Reminder settings: none are required.

## Notes
- A-14: the reminder covers the same tasks as the task list, i.e. own tasks and tasks shared with
  me that are not done. Shared tasks appear once S-20 is delivered.
- A-17: same order as the task list (BR-23).
- A-12: "today" is the phone's local date.
