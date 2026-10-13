# S-22: A shared task done by anyone is done for everyone

- **Priority:** P1
- **Covers:** FR-06 (shared tasks), FR-18 · **Decisions:** Q-18, Q-22
- **Depends on stories:** S-20, S-10

## User story
As a member of a family that shares a task, I want the task to be done for everyone when one of
us finishes it, and to see who did it, so that nobody does the same job twice.

## Acceptance criteria
1. **Recipient marks done**
   - Given a task is shared with me
   - When I mark it done
   - Then it leaves the task list of the owner and of everyone it is shared with, and appears in all their done lists
2. **Who did it is shown**
   - Given a shared task has been marked done
   - When the owner or anyone it is shared with views it
   - Then they see the display name of the person who marked it done
3. **Owner marks done**
   - Given I own a shared task
   - When I mark it done
   - Then it is done for everyone it is shared with, showing me as the person who marked it done
4. **Undo by owner or recipient**
   - Given a shared task is done
   - When the owner or anyone it is currently shared with undoes "done"
   - Then it is back in the task list of the owner and of everyone it is shared with

## Out of scope
- Marking a shared task done only for oneself (Q-18).
- Notifications when a shared task is done (Q-05).

## Notes
- BR-12, BR-15.
- A member who was removed from the task (S-21) no longer sees it and cannot mark it or undo it.
