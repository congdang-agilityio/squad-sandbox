# S-01: Read the privacy notice

- **Priority:** P0
- **Covers:** FR-23 · **Decisions:** Q-23, Q-31, Q-12
- **Depends on stories:** none

## User story
As a visitor, I want to read a short privacy notice in my language, so that I know what
personal data TodoNow stores and why before I create an account.

## Acceptance criteria
1. **Notice reachable before sign-up**
   - Given I am a visitor on the sign-up screen
   - When I open the privacy notice
   - Then I see the privacy notice text and can return to the sign-up screen
2. **Notice in Vietnamese**
   - Given my phone/browser language is Vietnamese, or neither Vietnamese nor English
   - When I open the privacy notice
   - Then the notice is shown in Vietnamese
3. **Notice in English**
   - Given my phone/browser language is English
   - When I open the privacy notice
   - Then the notice is shown in English
4. **Approved content**
   - Given the stakeholder has approved the notice text in both languages
   - When I read the notice
   - Then it states what personal data TodoNow stores and why, exactly as approved

## Out of scope
- Agreeing to the notice at sign-up (S-02).
- A lawyer review of the notice (Q-23: not chosen).

## Notes
- The team drafts the text in Vietnamese and English; the stakeholder approves it before launch
  (Q-31). The approval is a launch dependency (R-07).
- The notice must reflect the agreed data protection measures: passwords never stored readable,
  encrypted connections, only own and shared tasks visible, account deletion removes personal
  data, no sharing or selling of personal data (Q-23 items 1, 2, 5, 6).
- Language selection follows BR-22 (S-14 covers the rest of the interface).
