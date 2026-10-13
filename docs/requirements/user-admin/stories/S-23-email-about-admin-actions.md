# S-23: Email users about admin actions

- **Priority:** P1
- **Covers:** FR-18, NFR-04 · **Decisions:** Q-15, Q-25; A-20
- **Depends on stories:** S-18, S-20, S-21

## User story
As a TodoNow user, I want an email when an Administrator changes my display name, blocks or
deletes my account, so that I am not surprised and know whom to contact.

## Acceptance criteria
1. **Display name changed**
   - Given an active or blocked account
   - When an Administrator changes its display name
   - Then the user receives an email in Vietnamese and English in the same email saying their display name was changed, with the TodoNow team contact address
2. **Account blocked**
   - Given an active account
   - When an Administrator blocks it
   - Then the user receives such an email saying their account was blocked
3. **Account deleted**
   - Given an active or blocked account
   - When an Administrator deletes it
   - Then the user receives such an email, at the account's email address, saying their account was deleted
4. **No email in other cases**
   - Given a waiting account changed, blocked or deleted, an unblock, a password link, or an automatic deletion after 30 days
   - When it happens
   - Then no email about an admin action is sent

## Notes
- **Open input:** the TodoNow team contact address to show in these emails was not given at sign-off (`sources/stakeholder-notes.md`, 2026-10-13). The stakeholder must provide it before this story is built.
- BR-17: TodoNow stores no language per user, so both languages are in one email.
