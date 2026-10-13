# S-15: Import people from a CSV file

- **Priority:** P1
- **Covers:** FR-07, FR-09, FR-06 · **Decisions:** Q-06, Q-11, Q-20
- **Depends on stories:** S-10

## User story
As an Administrator, I want to import a CSV file with the email and display name of each person,
so that I can add a whole school, company or organisation at once.

## Acceptance criteria
1. **Accounts are created**
   - Given a CSV file where each row has a valid email address and a display name, none of which has a TodoNow account
   - When an Administrator imports it
   - Then one waiting account per row appears in the user list
2. **Each person gets the account email**
   - Given the import has created accounts
   - When the people check their mailboxes
   - Then each has the account email of S-10 (Vietnamese and English, link working 7 days)
3. **Result is shown**
   - Given the import has finished
   - When the Administrator looks at the result
   - Then it shows how many accounts were created
4. **No family**
   - Given the imported people
   - When their accounts are opened
   - Then none of them is in a family
5. **Support cannot import**
   - Given a staff member with the role Support
   - When they try to import a file
   - Then it is not offered and any attempt is refused

## Out of scope
- Wrong and existing rows (S-16). File size limit (S-17). Updating existing accounts (Q-12: never).

## Notes
- Imports can be repeated as often as needed (Q-06).
- The import is recorded with the numbers of rows created and skipped (S-24).
