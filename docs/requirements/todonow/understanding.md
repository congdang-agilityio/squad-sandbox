# TodoNow: how I understand it (round 9, change after story review, ready for re-sign-off)

## What changed (your feedback on the story list, 13 October 2026)
You asked to "add log out, and passwords of at least 8 characters including lowercase letters,
uppercase letters, digits and special characters", and then answered Q-33 (B) and Q-34 (C).
Here is how I understand it:

- **Log out on this phone:** a logged-in person can log out on the phone they are using. After
  that, this phone shows no tasks until someone logs in again, and it gets **no more "a task
  was shared with you" notifications** for that person until they log in on it again.
- **Log out on all devices:** a separate option logs the person out on **every phone** they are
  logged in on at once (including the one they are using), with the same effect on each phone.
  Useful if a phone is lost or was lent to someone.
- **Password rule:** every password must have **at least 8 characters** and contain at least
  **one lowercase letter (a-z), one uppercase letter (A-Z), one digit (0-9) and one keyboard
  symbol** (such as ! @ # $ % ^ & *).
- **Only these characters are allowed:** letters with Vietnamese marks (for example ă, â, đ, ê,
  ô, ơ, ư, or any letter with a tone mark such as "ậ" or "ẩ") and **spaces cannot be used**. A
  password like "Mậtkhẩu1!" is refused. A password that breaks the rule is refused, and the app
  says what the rule is and which characters are allowed.

Everything else you signed off on 13 October 2026 stays the same (summary below).

## What I am assuming for this change (please correct me before you sign off)
- The password rule applies to every password a person sets: when signing up **and** when
  setting a new password after "forgot password". (A-18)
- A person stays logged in on their phone until they log out (or delete their account); the
  app does not log people out by itself after some time. (A-19)
- "Keyboard symbols" means the symbols on a standard English keyboard:
  ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ . Any one of them counts as
  the required special character. (A-20)
- Resetting a forgotten password does **not** log the person out on their other phones; they
  can use "log out on all devices" if they want that. (A-21)
- Changing your password while logged in is **not** added; you did not ask for it.

## What was already decided (signed off on 13 October 2026)
- **Platform:** a PWA for phones (Chrome on Android, Safari on iPhone) that can be added to the
  Home Screen. Computers are not a target in this phase; no App Store / Google Play app. Small
  budget; everything must be ready before Tet 2027 (6 February 2027).
- **Accounts:** sign up with email and password (agreeing to the privacy notice), log in,
  reset a forgotten password, delete your account. No Google or other outside login.
- **Language:** Vietnamese or English, following the phone's language; Vietnamese otherwise.
  No language switch in the app.
- **Privacy:** passwords never stored readable, connections encrypted, each person sees only
  their own and shared tasks, short privacy notice that you approve before launch, deleting an
  account removes personal data, data never shared or sold. No lawyer review.
- **Tasks:** title, required due date, optional time, priority High/Normal/Low (default
  Normal). The owner edits and deletes. Done tasks move to a separate "done" list and can be
  un-done.
- **List:** overdue tasks in red at the top; then all other tasks; both parts sorted by
  priority, then by due date and time.
- **Family and sharing:** a family is optional; one family per person; the creator invites
  with a one-time link or code (7 days), can cancel unused invitations, remove members, delete
  the family or hand over the role. Owners share tasks with chosen members, who can view, mark
  done and un-do; done is done for everyone and shows who did it.
- **Notifications and reminders:** a phone notification when a task is shared with you (only
  on phones where you are logged in); an in-app reminder of today's and overdue tasks when you
  open the app.
- **Speed:** pages load in under 2 seconds on 4G.

## Important to know
- Some people type Vietnamese letters with marks out of habit. With your choice those passwords
  are refused, so the sign-up and new-password screens will clearly list the allowed
  characters.
- After you confirm this change, the stories for sign-up and password reset get the password
  rule, the log-in story no longer says "log out not stated", and new story or stories for "log
  out" and "log out on all devices" are added. Nothing has been put on the board yet.
