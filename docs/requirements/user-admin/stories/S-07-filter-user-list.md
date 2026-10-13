# S-07: Filter the user list

- **Priority:** P1
- **Covers:** FR-03 · **Decisions:** Q-18, Q-20; A-26
- **Depends on stories:** S-06

## User story
As a staff member (Administrator or Support), I want to filter the user list by account status
and by family, so that I can work through groups of accounts, such as all waiting ones.

## Acceptance criteria
1. **Filter by status**
   - Given the user accounts list
   - When the staff member chooses status waiting, active or blocked
   - Then only accounts with that status are shown
2. **Filter by family**
   - Given the user accounts list
   - When the staff member chooses "in a family", "family creator" or "not in a family"
   - Then only matching accounts are shown
3. **Combine search and filters**
   - Given a search text and one or more filters
   - When they are applied together
   - Then only accounts matching all of them are shown
4. **Support can filter**
   - Given a staff member with the role Support
   - When they use the filters
   - Then they get the same results as an Administrator

## Out of scope
- Filtering by one particular family: TodoNow families have no name (A-26).
