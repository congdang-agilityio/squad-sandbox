# S-15: Add TodoNow to my phone's Home Screen

- **Priority:** P1
- **Covers:** NFR-01, NFR-02 · **Decisions:** Q-14, Q-27
- **Depends on stories:** S-03

## User story
As a family member, I want to add TodoNow to my phone's Home Screen and open it like an app, so
that I can reach my tasks quickly without the App Store or Google Play.

## Acceptance criteria
1. **Android**
   - Given I open TodoNow in Chrome on an Android phone
   - When I add it to the Home Screen and open it from the icon
   - Then TodoNow opens like an app, showing the login screen or my task list
2. **iPhone**
   - Given I open TodoNow in Safari on an iPhone
   - When I add it to the Home Screen and open it from the icon
   - Then TodoNow opens like an app, showing the login screen or my task list
3. **Loads quickly**
   - Given a phone on a 4G connection
   - When I open a TodoNow page
   - Then the page loads in under 2 seconds

## Out of scope
- App Store / Google Play apps (Q-27).
- Computer browsers as a target (Q-27).

## Notes
- On iPhone, phone notifications (S-23) only work after TodoNow is added to the Home Screen on a
  recent iOS version (R-03).
- NFR-02 (under 2 s on 4G) applies to every page; this story verifies it for the installed app.
