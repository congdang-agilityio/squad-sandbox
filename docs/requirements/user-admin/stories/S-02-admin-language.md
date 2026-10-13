# S-02: Admin area language follows the browser

- **Priority:** P1
- **Covers:** NFR-04, NFR-03, FR-01 · **Decisions:** Q-04, Q-16; A-07
- **Depends on stories:** S-01

## User story
As a staff member, I want the admin area in Vietnamese or English following my browser
language, like the TodoNow app, so that I can work in the language I read.

## Acceptance criteria
1. **Vietnamese browser**
   - Given a computer browser whose language is Vietnamese
   - When the staff member opens the admin area
   - Then every screen and message is in Vietnamese
2. **English browser**
   - Given a computer browser whose language is English
   - When the staff member opens the admin area
   - Then every screen and message is in English
3. **Any other language**
   - Given a browser language that is neither Vietnamese nor English
   - When the staff member opens the admin area
   - Then it is shown in Vietnamese
4. **No language setting**
   - Given any staff member
   - When they look for a way to choose the language in the admin area
   - Then there is none; the language follows the browser only
5. **Supported browsers**
   - Given a current version of Chrome, Edge, Firefox or Safari on a computer
   - When the staff member uses the admin area
   - Then every admin-area function works; phones are not a target

## Out of scope
- Languages of emails: each email story states it (bilingual in one email, BR-17, A-27).

## Notes
- Same rule as TodoNow (SRC-2 FR-13). Every later story with visible text provides both languages.
