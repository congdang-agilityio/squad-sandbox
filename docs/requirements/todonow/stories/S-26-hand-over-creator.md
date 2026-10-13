# S-26: Hand over the creator role

- **Priority:** P1
- **Covers:** FR-22 · **Decisions:** Q-16, Q-21, Q-29
- **Depends on stories:** S-18

## User story
As a family creator, I want to hand the creator role to another member, so that the family can
be managed by someone else.

## Acceptance criteria
1. **Hand over**
   - Given I am the family creator and the family has another member
   - When I hand the creator role to that member
   - Then that member is the creator and I am an ordinary member
2. **New creator manages the family**
   - Given the creator role was handed to a member
   - When that member opens family management
   - Then they can invite people, see and cancel unused invitations, remove members and delete the family, and I no longer can
3. **No one to hand over to**
   - Given I am the only member of my family
   - When I look for a way to hand over the creator role
   - Then there is no member to pick

## Out of scope
- Automatic transfer of the creator role (Q-21, Q-29).

## Notes
- After handing over, the former creator may leave the family (S-24) or delete their account
  (S-28).
