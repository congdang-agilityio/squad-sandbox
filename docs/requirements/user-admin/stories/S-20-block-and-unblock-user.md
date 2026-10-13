# S-20: Block and unblock a user

- **Priority:** P1
- **Covers:** FR-11, FR-06 · **Decisions:** Q-10, Q-20, Q-29; A-09, A-12, A-14
- **Depends on stories:** S-08

## User story
As an Administrator, I want to block a user so they cannot log in, and unblock them later with
nothing lost, so that I can stop misuse without deleting anyone's data.

## Acceptance criteria
1. **Blocked user cannot log in**
   - Given an active user account
   - When an Administrator blocks it
   - Then its status is blocked and the user cannot log in to the TodoNow app
2. **Logged out everywhere at once**
   - Given the user is logged in on one or more phones
   - When the account is blocked
   - Then the user is logged out on every phone at once
3. **Nothing changes for others**
   - Given the blocked user is in a family (also as family creator) and has shared tasks
   - When family members use the app
   - Then the blocked user is still in the family and their shared tasks are still visible
4. **Unblock**
   - Given a blocked account
   - When an Administrator unblocks it
   - Then the user can log in again and all their data is unchanged
5. **Support cannot block**
   - Given a staff member with the role Support
   - When they try to block or unblock
   - Then it is not offered and any attempt is refused

## Out of scope
- The email to the user about the block (S-23).

## Notes
- BR-09. A blocked family creator stays creator; the family cannot be managed until they are unblocked or deleted (A-14).
- A waiting account can also be blocked (A-09). What unblocking a never-activated account returns it to is not stated in the requirements.
- Block and unblock are recorded (S-24).
