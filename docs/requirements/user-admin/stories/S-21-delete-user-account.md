# S-21: Delete a user account

- **Priority:** P1
- **Covers:** FR-05, FR-06, NFR-02 · **Decisions:** Q-10, Q-20; A-09
- **Depends on stories:** S-08

## User story
As an Administrator, I want to delete a user account permanently, so that a user who asks to
leave, or an account that must go, is removed with all its personal data.

## Acceptance criteria
1. **Account is deleted**
   - Given an active or blocked user account whose user is not a family creator
   - When an Administrator deletes it
   - Then the account no longer appears in the admin area and nobody can log in with it
2. **Same effects as deleting one's own account**
   - Given the user had own tasks shared with others and was a family member
   - When the account is deleted
   - Then all the user's own tasks are deleted, also for the people they were shared with, and the user is no longer in the family
3. **Waiting account**
   - Given a waiting account
   - When an Administrator deletes it
   - Then its account email link no longer works
4. **Support cannot delete**
   - Given a staff member with the role Support
   - When they try to delete an account
   - Then it is not offered and any attempt is refused

## Out of scope
- Deleting a family creator (S-22). Email to the user (S-23). The record after deletion (S-25).

## Notes
- BR-03, same as SRC-2 FR-16. Deletion cannot be undone; use block (S-20) for a reversible stop.
