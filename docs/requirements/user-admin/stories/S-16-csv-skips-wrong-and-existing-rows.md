# S-16: CSV import skips wrong and existing rows

- **Priority:** P1
- **Covers:** FR-07 · **Decisions:** Q-12; A-16
- **Depends on stories:** S-15

## User story
As an Administrator, I want an import to create the good rows and list the skipped ones with the
reason, so that a few mistakes in an organisation's file do not stop the rest and existing users
are never changed.

## Acceptance criteria
1. **Wrong rows are skipped**
   - Given rows with a missing or invalid email address, or a missing display name
   - When the file is imported
   - Then those rows are skipped and the other rows are created
2. **Existing accounts are untouched**
   - Given rows whose email already has a TodoNow account (waiting, active or blocked)
   - When the file is imported
   - Then those rows are skipped and the existing accounts are not changed and get no email
3. **Same email twice in a file**
   - Given an email address that appears in more than one row
   - When the file is imported
   - Then the first row is imported and the later ones are skipped
4. **List of skipped rows**
   - Given the import has finished with skipped rows
   - When the Administrator looks at the result
   - Then they see each skipped row with the reason it was skipped
5. **Unreadable file**
   - Given a file that cannot be read as a CSV with the columns email and display name
   - When the Administrator imports it
   - Then the whole file is refused with a message and nothing is created

## Notes
- BR-06. R-04 data quality.
