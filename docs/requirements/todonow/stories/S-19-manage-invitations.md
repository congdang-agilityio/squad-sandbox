# S-19: See and cancel unused invitations

- **Priority:** P1
- **Covers:** FR-25 · **Decisions:** Q-30
- **Depends on stories:** S-18

## User story
As a family creator, I want to see the invitations nobody has used yet and cancel any of them,
so that an invitation sent to the wrong person cannot be used to join my family.

## Acceptance criteria
1. **See unused invitations**
   - Given I am a family creator with invitations that are unused and not expired
   - When I open the invitation list
   - Then I see each of them
2. **Hide used, cancelled and expired**
   - Given some of my invitations have been used, cancelled or have expired
   - When I open the invitation list
   - Then those invitations are not shown
3. **Cancel an invitation**
   - Given an unused invitation in my list
   - When I cancel it
   - Then it disappears from the list, and anyone who tries to join with its link or code does not join and is told it is no longer valid
4. **Only the creator**
   - Given I am a family member but not the creator
   - When I look for the invitation list
   - Then I cannot see or cancel invitations

## Out of scope
- Creating invitations (S-17).

## Notes
- BR-20. A-15: expired invitations are not shown.
