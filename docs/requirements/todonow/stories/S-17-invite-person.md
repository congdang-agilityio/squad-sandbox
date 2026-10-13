# S-17: Invite a person to my family

- **Priority:** P1
- **Covers:** FR-14 (invitations) · **Decisions:** Q-15, Q-24
- **Depends on stories:** S-16

## User story
As a family creator, I want to get an invitation link and code for each person I invite, so that
I can send it to them myself, for example by Zalo or SMS.

## Acceptance criteria
1. **Get an invitation**
   - Given I am a family creator
   - When I create an invitation
   - Then I get a link and a code for one person that I can copy and send myself
2. **One invitation per person**
   - Given I have already created an invitation
   - When I create another invitation
   - Then I get a different link and code
3. **App sends nothing**
   - Given I create an invitation
   - When it is created
   - Then TodoNow sends no email or other message; delivering it is up to me
4. **Only the creator invites**
   - Given I am a family member but not the creator
   - When I look for a way to invite someone
   - Then I cannot create an invitation

## Out of scope
- Using the invitation to join (S-18).
- Listing and cancelling invitations (S-19).
- Invitation emails (Q-15).

## Notes
- BR-14: each invitation is for one person, can be used once, and expires 7 days after it was
  created. Use and expiry are verified in S-18.
- An invited person can join either by opening the link or by entering the code (FR-15).
