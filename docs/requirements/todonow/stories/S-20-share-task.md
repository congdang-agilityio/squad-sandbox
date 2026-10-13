# S-20: Share a task with chosen family members

- **Priority:** P1
- **Covers:** FR-09 (share), FR-05 (shared tasks in the list), NFR-07 · **Decisions:** Q-03, Q-17
- **Depends on stories:** S-18, S-06

## User story
As a task owner in a family, I want to share a task with the family members I pick, so that they
see it and can help get it done.

## Acceptance criteria
1. **Share with picked members**
   - Given I own a task and am in a family with other members
   - When I pick one or more family members and share the task with them
   - Then the task is shared with exactly those members
2. **Recipients see it in their list**
   - Given a task has been shared with me
   - When I open my task list
   - Then the task is there among my own tasks, in the same ordering (overdue first, then priority, then due date and time)
3. **Recipients cannot change it**
   - Given a task has been shared with me and I am not its owner
   - When I view the task
   - Then I can see its details but cannot edit it, delete it or change who it is shared with
4. **Others do not see it**
   - Given a task is shared with some members of my family
   - When a family member it is not shared with, or any user outside the family, opens their task list
   - Then the task is not shown to them
5. **No family, no sharing**
   - Given I am not in a family, or I am the only member
   - When I look for a way to share a task
   - Then there is no one I can share it with

## Out of scope
- Adding or removing recipients later, and deleting a shared task (S-21).
- Marking a shared task done (S-22).
- The share notification (S-23).
- Sharing with the whole family in one action (Q-17).

## Notes
- BR-06, BR-08. NFR-07: each user sees only their own tasks and tasks currently shared with them.
- Recipients are shown by display name (S-02).
