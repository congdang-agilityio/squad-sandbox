# S-22: Delete the account of a family creator

- **Priority:** P1
- **Covers:** FR-05 · **Decisions:** Q-28; A-13
- **Depends on stories:** S-21

## User story
As an Administrator, I want the family creator role to pass automatically when I delete a family
creator's account, so that the family keeps working without the deleted user's help.

## Acceptance criteria
1. **Role passes to the earliest member**
   - Given a family creator whose family has other members who are not blocked
   - When an Administrator deletes the creator's account
   - Then the member who joined the family earliest among those not blocked becomes the creator
2. **All other members blocked**
   - Given every other member of the family is blocked
   - When the creator's account is deleted
   - Then the member who joined earliest becomes the creator
3. **No other member**
   - Given the creator is the only member of the family
   - When their account is deleted
   - Then the family is deleted, with the same effects as a creator deleting the family (SRC-2 FR-21)
4. **No message to the new creator**
   - Given a member has become creator this way
   - When they open the app
   - Then they see they are the creator; no message is sent to them
5. **Own deletion unchanged**
   - Given a family creator deleting their own account in the TodoNow app
   - When they try to delete it
   - Then they must still hand over the creator role or delete the family first (SRC-2 FR-16)

## Notes
- BR-03; conflict C-05 resolved: automatic hand-over applies only to deletion by an Administrator.
