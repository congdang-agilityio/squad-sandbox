# S-14: App language follows my phone

- **Priority:** P1
- **Covers:** FR-13, NFR-03 · **Decisions:** Q-12
- **Depends on stories:** none

## User story
As a family member, I want TodoNow to appear in my phone's language (Vietnamese or English), so
that I can use it without changing any setting.

## Acceptance criteria
1. **Vietnamese phone**
   - Given my phone/browser language is Vietnamese
   - When I open TodoNow
   - Then every screen is shown in Vietnamese
2. **English phone**
   - Given my phone/browser language is English
   - When I open TodoNow
   - Then every screen is shown in English
3. **Any other language**
   - Given my phone/browser language is neither Vietnamese nor English (e.g. French)
   - When I open TodoNow
   - Then every screen is shown in Vietnamese
4. **No language setting**
   - Given I am using TodoNow
   - When I look for a way to change the language inside the app
   - Then there is none; the language only follows the phone/browser

## Out of scope
- A language setting inside the app (Q-12).
- A stored language preference per user (Q-12).

## Notes
- BR-22.
- A-13: every text a person sees (including the share notification in S-23, the privacy notice
  in S-01 and the reset email in S-04) is in that person's interface language. Each story that
  adds visible text must provide both languages.
