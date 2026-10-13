# S-27: Delete my family

- **Priority:** P1
- **Covers:** FR-21 · **Decisions:** Q-16, Q-28
- **Depends on stories:** S-20, S-19

## User story
As a family creator, I want to delete my family, so that the family group ends when it is no
longer needed.

## Acceptance criteria
1. **Delete the family**
   - Given I am the family creator
   - When I delete the family
   - Then no one, including me, is a member of it any more
2. **Sharing ends, tasks stay**
   - Given members of the family had shared tasks with each other
   - When the family is deleted
   - Then every task stays only in its owner's lists, nobody else sees it, and no task is deleted
3. **Invitations stop working**
   - Given the family had unused invitations
   - When the family is deleted
   - Then nobody can join with those invitations
4. **Only the creator deletes**
   - Given I am a family member but not the creator
   - When I look at family management
   - Then I cannot delete the family

## Out of scope
- Deleting any task because of the family deletion (BR-17: none is deleted).

## Notes
- BR-17. After deletion every former member can create or join a family again (BR-05).
