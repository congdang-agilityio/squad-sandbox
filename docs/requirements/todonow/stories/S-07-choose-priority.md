# S-07: Choose a task priority

- **Priority:** P0
- **Covers:** FR-08 · **Decisions:** Q-06
- **Depends on stories:** S-05

## User story
As a family member, I want to set each task's priority to High, Normal or Low, so that the most
important tasks are at the top of my list.

## Acceptance criteria
1. **Pick a priority**
   - Given I am creating a task
   - When I choose High, Normal or Low and save
   - Then the task has the chosen priority
2. **Guidance shown**
   - Given I am choosing a priority
   - When I look at the options
   - Then I see the guide High = "Today", Normal = "This week", Low = "Some day"
3. **Priority not derived from the due date**
   - Given I create a High task with a due date next month
   - When I save it and later open my list
   - Then the task stays High; the app never changes the priority because of the due date

## Out of scope
- Changing the priority of an existing task (S-11).
- Setting the priority automatically from the due date (Q-06: out of scope).

## Notes
- BR-03: exactly one priority from {High, Normal, Low}; default Normal (S-05).
- The guide text is shown in the interface language (Vietnamese or English).
