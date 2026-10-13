# S-24: Record of staff actions

- **Priority:** P1
- **Covers:** FR-17, FR-06 · **Decisions:** Q-14, Q-20; A-19
- **Depends on stories:** S-04, S-12, S-15, S-18, S-19, S-20, S-21

## User story
As an Administrator, I want to see a record of what each staff member did, so that I can find
mistakes or misuse and answer users' complaints.

## Acceptance criteria
1. **Actions are recorded**
   - Given a staff member creates, renames, blocks, unblocks or deletes a user account, imports a CSV file, sends a password link or an account email, or gives, changes or removes admin access
   - When the action is done
   - Then a record shows who did it, what was done, when, and to which account (for an import: the numbers of rows created and skipped)
2. **Not recorded**
   - Given a staff member views or searches accounts or logs in, or an account is deleted automatically after 30 days
   - When it happens
   - Then no record is added
3. **Administrators can view**
   - Given an Administrator is logged in
   - When they open the record of staff actions
   - Then they see the records
4. **Support cannot view**
   - Given a staff member with the role Support
   - When they try to open the record
   - Then it is not offered and any attempt is refused
5. **Records cannot be changed**
   - Given any record
   - When any staff member looks for a way to change or delete it in the admin area
   - Then there is none

## Out of scope
- Deleted users and the 1-year limit (S-25). Search, filter or export of the record (not stated).

## Notes
- BR-16.
