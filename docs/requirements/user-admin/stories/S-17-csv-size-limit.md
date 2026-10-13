# S-17: CSV file size limit

- **Priority:** P2
- **Covers:** NFR-07, FR-07 · **Decisions:** Q-19; A-24
- **Depends on stories:** S-16

## User story
As an Administrator, I want to import a file of up to about 1,000 people in one go, and be told
to split a larger file, so that large organisations can be added reliably.

## Acceptance criteria
1. **Up to 1,000 rows**
   - Given a file with 1,000 valid rows
   - When an Administrator imports it
   - Then all 1,000 accounts are created and all 1,000 account emails are sent; the emails may take some minutes to arrive
2. **More than 1,000 rows**
   - Given a file with more than 1,000 rows
   - When an Administrator imports it
   - Then the whole file is refused with a message asking to split it, and nothing is created
3. **Result when finished**
   - Given a large import is running
   - When it has finished
   - Then the Administrator sees the created count and the list of skipped rows (S-16)

## Notes
- R-05: email providers may limit or mark as spam about 1,000 emails sent at once.
