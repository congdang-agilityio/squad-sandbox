# S-16: Create a family

- **Priority:** P1
- **Covers:** FR-14 (create family) · **Decisions:** Q-02, Q-16
- **Depends on stories:** S-03

## User story
As a family member who is not in a family yet, I want to create a family, so that I can invite
my relatives and share tasks with them.

## Acceptance criteria
1. **Create a family**
   - Given I am logged in and not in a family
   - When I create a family
   - Then the family exists, I am its only member, and I am its creator
2. **Only one family**
   - Given I am already in a family
   - When I look for a way to create another family
   - Then I cannot create one
3. **Family is optional**
   - Given I am logged in and not in a family
   - When I create, edit, complete and delete my own tasks
   - Then everything works without a family

## Out of scope
- Inviting people (S-17) and joining (S-18).

## Notes
- BR-05: at most one family per user. BR-10: a family is optional.
- No family name or other family details were stated in the requirements.
