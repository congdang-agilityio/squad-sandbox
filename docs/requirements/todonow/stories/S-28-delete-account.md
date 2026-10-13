# S-28: Delete my account

- **Priority:** P1
- **Covers:** FR-16, NFR-08 · **Decisions:** Q-08, Q-21, Q-23
- **Depends on stories:** S-20, S-26

## User story
As a family member, I want to delete my account, so that TodoNow no longer keeps my data.

## Acceptance criteria
1. **Account deleted**
   - Given I am logged in and not a family creator
   - When I delete my account
   - Then I can no longer log in with that email and password, and my personal data is removed
2. **My tasks deleted for everyone**
   - Given I owned tasks, some shared with family members
   - When I delete my account
   - Then all my tasks are deleted, and the members they were shared with no longer see them
3. **Removed from my family**
   - Given I was a member of a family
   - When I delete my account
   - Then I am no longer listed as a member of that family
4. **Creator must act first**
   - Given I am a family creator
   - When I try to delete my account
   - Then the account is not deleted and I am told to hand over the creator role or delete the family first

## Out of scope
- Automatic transfer of the creator role (Q-21).

## Notes
- BR-13. Q-23 item 5: deleting an account removes the user's personal data.
- NFR-08: personal data is never shared with or sold to anyone.
- A confirmation step before deletion was not stated in the requirements.
