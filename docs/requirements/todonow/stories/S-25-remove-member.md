# S-25: Remove a member from my family

- **Priority:** P1
- **Covers:** FR-20 · **Decisions:** Q-16, Q-28
- **Depends on stories:** S-20

## User story
As a family creator, I want to remove a member from my family, so that only the right people
belong to it.

## Acceptance criteria
1. **Remove a member**
   - Given I am the family creator and see the list of members
   - When I remove a member
   - Then that person is no longer a member and no longer sees any task that family members shared with them
2. **Their shared tasks become theirs only**
   - Given the removed member owned tasks shared with other family members
   - When I remove them
   - Then those tasks stay with the removed member and the other members no longer see them
3. **Only the creator removes**
   - Given I am a family member but not the creator
   - When I look at the family members
   - Then I cannot remove anyone

## Out of scope
- Notifying the removed member: not required.

## Notes
- BR-11, BR-17. No task is deleted by a removal.
