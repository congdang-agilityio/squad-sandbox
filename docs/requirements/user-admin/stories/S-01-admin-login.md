# S-01: Log in to the admin area with an email code

- **Priority:** P0
- **Covers:** FR-01, FR-08, NFR-06 · **Decisions:** Q-01, Q-03, Q-04, Q-21, Q-22; A-11, A-17, A-27
- **Depends on stories:** none

## User story
As a TodoNow team member with an admin account, I want to log in to the admin area with my
email, password and a one-time code sent to my admin email, so that only I can use my admin
access even if my password is stolen.

## Acceptance criteria
1. **Code is sent after a correct password**
   - Given an active admin account
   - When the staff member enters its email address and correct password on the admin login page
   - Then a one-time code is sent to that admin email address, in Vietnamese and English in the same email, and the page asks for the code
2. **Correct code finishes the login**
   - Given a code sent less than 10 minutes ago that has not been used
   - When the staff member enters it
   - Then they are in the admin area, and the same code cannot be used again
3. **Wrong details are refused**
   - Given a wrong password, or a wrong code, a code older than 10 minutes or a code already used
   - When the staff member submits it
   - Then the login is refused with a message and the admin area does not open
4. **Ask for a new code**
   - Given the page is waiting for the code
   - When the staff member asks for a new code
   - Then a new code is sent to the admin email address
5. **Admin and app accounts are separate**
   - Given a TodoNow app account and an admin account
   - When the app account is used on the admin login page, or the admin account is used on the TodoNow app login
   - Then the login is refused in both cases

## Out of scope
- Admin "forgot password" (S-05). Giving access to new staff (S-03).
- Logging out of the admin area is not stated in the requirements.

## Notes
- A code is needed at every login (A-17).
- The first Administrator is set up by the technical team outside the admin area (FR-12, Q-13); this is needed to test this story.
- A staff member may have an app account and an admin account with the same email; they are independent accounts with their own passwords (A-11, BR-10).
- BR-12. Admin passwords are never stored in readable form (NFR-01).
