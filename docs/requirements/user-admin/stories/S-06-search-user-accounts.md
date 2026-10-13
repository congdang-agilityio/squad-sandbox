# S-06: Find user accounts by search

- **Priority:** P0
- **Covers:** FR-03, FR-06 · **Decisions:** Q-08, Q-18, Q-20
- **Depends on stories:** S-01

## User story
As a staff member (Administrator or Support), I want to see the list of TodoNow user accounts
and search it by email or display name, so that I can quickly find the person I need to help.

## Acceptance criteria
1. **See the list**
   - Given a staff member is logged in
   - When they open the user accounts list
   - Then they see all TodoNow user accounts, each with email, display name and account status (waiting, active or blocked)
2. **Search by email**
   - Given the list
   - When the staff member searches with an email address
   - Then only accounts whose email matches are shown
3. **Search by display name**
   - Given the list
   - When the staff member searches with a display name
   - Then only accounts whose display name matches are shown
4. **No match**
   - Given no account matches the search
   - When the search runs
   - Then an empty list with a message is shown
5. **Support can search**
   - Given a staff member with the role Support
   - When they open the list and search
   - Then they get the same results as an Administrator

## Out of scope
- Filters (S-07). Opening one account (S-08).

## Notes
- Staff never see tasks (BR-04).
- How closely the text must match (whole or part, upper or lower case) is not stated in the requirements.
