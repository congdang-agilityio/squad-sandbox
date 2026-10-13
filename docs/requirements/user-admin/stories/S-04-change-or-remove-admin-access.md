# S-04: Change a staff member's role or remove their access

- **Priority:** P1
- **Covers:** FR-12, FR-06 · **Decisions:** Q-13, Q-20, Q-31; A-10, A-23
- **Depends on stories:** S-03

## User story
As an Administrator, I want to change a staff member's role or remove their admin access, so
that only the right people can do the right things in the admin area.

## Acceptance criteria
1. **Remove access**
   - Given an admin account that is not the last Administrator
   - When an Administrator removes its access
   - Then that staff member can no longer log in to the admin area and the account shows as removed
2. **Change role**
   - Given an admin account with the role Support (or Administrator)
   - When an Administrator changes it to Administrator (or Support)
   - Then from then on that staff member can do exactly what the new role allows
3. **Last Administrator is protected**
   - Given only one admin account has the role Administrator
   - When anyone tries to remove it or change it to Support
   - Then it is refused with a message
4. **Admin email cannot be changed**
   - Given any admin account
   - When an Administrator looks for a way to change its email address
   - Then there is none; a staff member who lost their admin mailbox is removed and given access again with a new email (S-03)
5. **Support cannot change staff**
   - Given a staff member with the role Support
   - When they try to change a role or remove access
   - Then it is not offered and any attempt is refused

## Out of scope
- What the record shows about removed staff (S-25).

## Notes
- If the last Administrator loses their mailbox, the technical team sets one up again, as for the first one (A-23).
- Changes are recorded (S-24).
