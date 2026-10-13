# S-08: View a user account

- **Priority:** P0
- **Covers:** FR-03, NFR-02 · **Decisions:** Q-08, Q-20
- **Depends on stories:** S-06

## User story
As a staff member (Administrator or Support), I want to open one user account and see its
account data, so that I can answer the user's question without seeing their private tasks.

## Acceptance criteria
1. **Account data shown**
   - Given a user account in the list
   - When the staff member opens it
   - Then they see email, display name, family (in a family, family creator, or not in a family), account status and the date the account was created
2. **Never tasks**
   - Given a user with own and shared tasks
   - When the staff member opens the account
   - Then no task, task title or task count is shown anywhere in the admin area
3. **Support can view**
   - Given a staff member with the role Support
   - When they open an account
   - Then they see the same account data as an Administrator

## Out of scope
- Actions on the account (S-18 to S-21).

## Notes
- BR-04: each user still sees only their own and shared tasks.
