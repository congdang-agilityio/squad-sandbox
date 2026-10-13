# S-24: Leave my family

- **Priority:** P1
- **Covers:** FR-19 · **Decisions:** Q-16, Q-28, Q-29
- **Depends on stories:** S-20

## User story
As a family member, I want to leave my family, so that I am no longer part of it when it no
longer fits me.

## Acceptance criteria
1. **Member leaves**
   - Given I am a family member but not the creator
   - When I leave the family
   - Then I am no longer a member and no longer see any task that family members shared with me
2. **My shared tasks become mine only**
   - Given I owned tasks shared with other family members
   - When I leave the family
   - Then those tasks stay in my lists and the other members no longer see them
3. **Creator cannot simply leave**
   - Given I am the family creator
   - When I try to leave the family
   - Then I cannot leave and am told to hand over the creator role or delete the family first
4. **Free to join again**
   - Given I have left my family
   - When I open a valid invitation for a family
   - Then I can join it

## Out of scope
- Handing over the creator role (S-26) and deleting the family (S-27).

## Notes
- BR-11, BR-17, BR-18. No task is deleted by leaving.
