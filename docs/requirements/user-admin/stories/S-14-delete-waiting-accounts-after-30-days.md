# S-14: Waiting accounts are deleted after 30 days

- **Priority:** P1
- **Covers:** FR-14, NFR-02 · **Decisions:** Q-24; A-15, A-19, A-20
- **Depends on stories:** S-11

## User story
As a person whose organisation gave TodoNow my email, I want my data deleted if I never start
using TodoNow, so that it is not kept without my agreement.

## Acceptance criteria
1. **Deleted after 30 days**
   - Given a waiting account created 30 days ago that was never activated
   - When the 30 days have passed
   - Then the account is deleted automatically and no longer appears in the admin area
2. **Link no longer works**
   - Given an account email for the deleted account
   - When the person opens its link
   - Then a message says the link no longer works
3. **Email can be used again**
   - Given the account was deleted
   - When an Administrator creates an account for that email, or the person signs up with it
   - Then this is allowed
4. **Nothing sent, not a staff action**
   - Given an account deleted automatically
   - When the deletion happens
   - Then no email is sent to the person and no staff action is recorded for it
5. **Activated accounts stay**
   - Given an account activated within 30 days after creation
   - When the 30 days pass
   - Then it is not deleted

## Out of scope
- What the record shows for earlier staff actions on this account (S-25).

## Notes
- BR-11. The 30 days count from creation and are not extended by a new account email (A-15).
