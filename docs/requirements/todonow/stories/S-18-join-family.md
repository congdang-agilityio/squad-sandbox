# S-18: Join a family with an invitation

- **Priority:** P1
- **Covers:** FR-15 · **Decisions:** Q-02, Q-15, Q-24
- **Depends on stories:** S-17

## User story
As an invited person, I want to join my family with the link or code I received, so that we can
share tasks.

## Acceptance criteria
1. **Join with a link while logged in**
   - Given I am logged in, not in a family, and have a valid invitation link
   - When I open the link and confirm
   - Then I am a member of that family
2. **Join with a code**
   - Given I am logged in, not in a family, and have a valid invitation code
   - When I enter the code and confirm
   - Then I am a member of that family
3. **Log in or sign up first**
   - Given I am not logged in and open a valid invitation link
   - When I log in or sign up
   - Then I can continue and join that family
4. **Used or expired invitation**
   - Given an invitation that has already been used, or was created more than 7 days ago
   - When anyone tries to join with it
   - Then they do not join and are told the invitation is no longer valid
5. **Already in a family**
   - Given I am already in a family
   - When I try to join with a valid invitation for another family
   - Then I do not join and am told I can be in only one family

## Out of scope
- Cancelled invitations (S-19).
- Creator approval of each person who joins: not required.

## Notes
- BR-05, BR-14.
- A visitor who signs up from an invitation still agrees to the privacy notice (S-02, BR-19).
