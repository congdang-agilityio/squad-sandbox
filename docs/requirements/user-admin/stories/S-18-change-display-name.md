# S-18: Change a user's display name

- **Priority:** P1
- **Covers:** FR-04, FR-06 · **Decisions:** Q-09, Q-20
- **Depends on stories:** S-08

## User story
As an Administrator, I want to change a user's display name, so that I can fix a wrong or
unsuitable name when the user asks.

## Acceptance criteria
1. **Name is changed**
   - Given an Administrator has opened a user account
   - When they enter a new display name and save it
   - Then the new name is shown in the admin area and wherever the user's display name appears in the TodoNow app
2. **Nothing else can be changed**
   - Given an opened user account
   - When the Administrator looks for a way to change the email address or family membership
   - Then there is none
3. **Name cannot be empty**
   - Given an empty display name
   - When the Administrator saves it
   - Then it is refused with a message
4. **Support cannot change**
   - Given a staff member with the role Support
   - When they try to change a display name
   - Then it is not offered and any attempt is refused

## Out of scope
- The email to the user about the change (S-23).

## Notes
- The change is recorded (S-24).
