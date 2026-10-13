# S-09: Publish the updated privacy notice

- **Priority:** P0
- **Covers:** FR-13, NFR-04 · **Decisions:** Q-17, Q-32
- **Depends on stories:** none

## User story
As a TodoNow user, I want the privacy notice to tell me that the TodoNow team can see and
manage account data and that accounts can be created for me, so that I know how my data is used.

## Acceptance criteria
1. **Content of the updated notice**
   - Given the updated privacy notice
   - When a person reads it in Vietnamese or English
   - Then it states that TodoNow team members can see and manage account data (not tasks) and that accounts can be created by staff or by import from a list provided by an organisation
2. **Approved before use**
   - Given the team's draft in Vietnamese and English
   - When the admin area is about to be used
   - Then the stakeholder has approved the text; the admin area is not used before that
3. **New agreements use the updated notice**
   - Given the updated notice is in use
   - When a person signs up or activates a created account
   - Then they agree to the updated notice
4. **Known version per user**
   - Given users who agreed to the old or the updated notice
   - When the system checks a user
   - Then it knows which version that user agreed to

## Out of scope
- Asking existing users to agree again (S-26). Writing legal advice: the team cannot give it (R-02).

## Notes
- The notice is shown in the phone language like today (SRC-2 FR-13, FR-23).
