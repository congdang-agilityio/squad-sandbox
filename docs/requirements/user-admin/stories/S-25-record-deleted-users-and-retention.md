# S-25: Record of staff actions: deleted users and 1-year limit

- **Priority:** P1
- **Covers:** FR-17, FR-05, FR-14, NFR-02 · **Decisions:** Q-33, Q-34; A-28
- **Depends on stories:** S-24, S-14

## User story
As a TodoNow user, I want my email and name removed from the staff record when my account is
deleted, and every record removed after a year, so that my personal data is not kept longer than
needed.

## Acceptance criteria
1. **Deleted by an Administrator**
   - Given records about a user account
   - When an Administrator deletes that account
   - Then those records show "deleted user" instead of the email and display name, and still show what was done, by whom and when
2. **Deleted by the user or automatically**
   - Given records about a user account
   - When the user deletes their own account in the app, or the account is deleted automatically after 30 days
   - Then those records show "deleted user" in the same way
3. **Deleted after 1 year**
   - Given a record of an action done 1 year ago
   - When the year has passed
   - Then the record is deleted automatically
4. **Removed staff stay named**
   - Given records of actions by a staff member whose admin access was removed
   - When an Administrator views the record
   - Then those records still show who did them, until each is deleted after 1 year

## Notes
- BR-18; conflict C-06 resolved.
