# Clarifying questions: TodoNow

- Slug: `todonow`
- Open: 0 · Answered: 0 · Confirmed: 34 · Deferred: 0
- Next batch to ask: none. Round 8 change (log out, password rule) is clear and ready for
  re-sign-off at GATE 1.

Rules: the PM asks each question **verbatim** (translation allowed, no rephrasing, merging or
answering) and records the answer verbatim plus an English translation. Only the BA changes a
status to `confirmed` or `deferred`.

---

### Q-01: How do users log in?
- **Question:** The product brief says login is by email and password only, with no third-party login providers. The kickoff meeting notes (1 Oct 2026) say users sign in with their Google account. Which login method(s) should TodoNow offer?
- **Why it matters:** It decides the whole account system (sign-up, password reset, external Google setup) and is needed before any other login work can start.
- **Related:** FR-02, FR-03, C-01, R-02
- **Options:**
  - A) Email and password only (as in the brief)
  - B) Google account only (as in the meeting notes)
  - C) Both: users can choose email and password or Google
  - D) Other (please describe)
- **Answer (original):** A  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** A) Email and password only (as in the brief)
- **Status:** confirmed
- **BA note:** Round 2: C-01 resolved in favour of SRC-1. FR-02 confirmed as email and password only; Google and other third-party login moved to out of scope; R-02 closed. Sign-up and password recovery remain open in Q-08.

### Q-02: What is a "family" in the app and how do people join it?
- **Question:** Tasks can be shared with family members. How does a family get set up in the app: who creates it, how do other members join, and can one person belong to more than one family?
- **Why it matters:** Sharing cannot work without knowing who counts as "family"; this shapes the data model and the sign-up flow.
- **Related:** FR-09, G-01
- **Options:**
  - A) One person creates a family and invites others (e.g. by email or a link); each person belongs to one family only
  - B) Same as A, but a person can belong to several families
  - C) No family group: a user shares each task directly with any other user (e.g. by email)
  - D) Other (please describe)
- **Answer (original):** A  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** A) One person creates a family and invites others (e.g. by email or a link); each person belongs to one family only
- **Status:** confirmed
- **BA note:** Round 2: added FR-14 (create family, invite) and FR-15 (join), BR-05 (one family per user). The option named email or a link only as examples, so the invitation method is asked in follow-up Q-15; leaving/removal and using the app without a family in Q-16.

### Q-03: What can family members do with a shared task?
- **Question:** When a task is shared with family members, what may they do with it, and do they see it in their own task list?
- **Why it matters:** Defines permissions and what each person sees after login; wrong guesses lead to people changing or deleting tasks they should not.
- **Related:** FR-05, FR-09, G-02, A-01
- **Options:**
  - A) View only; it appears in their list
  - B) View and mark as done; it appears in their list
  - C) Full control: view, mark done, edit and delete
  - D) Other (please describe, e.g. differs for parents and children)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** B) View and mark as done; it appears in their list
- **Status:** confirmed
- **BA note:** Round 2: FR-05 and FR-09 confirmed, BR-06 added (recipients may view and mark done, not edit or delete); A-01 confirmed. Who receives a shared task is asked in Q-17, and whether "done" applies to everyone in Q-18.

### Q-04: Are reminders part of the first launch?
- **Question:** The brief says "reminders would be nice". Should the first launch (before Tet) include reminders, and if so, when and how should a user be reminded?
- **Why it matters:** Reminders add significant effort and have limits on mobile browsers (especially iPhone); this affects whether the Tet deadline is realistic.
- **Related:** FR-11, G-04, R-01, R-03
- **Options:**
  - A) Not in the first launch; maybe later
  - B) Yes, a reminder inside the app only (e.g. a list of what is due today when the user opens the app)
  - C) Yes, a message sent to the user (e.g. email or phone notification) at a chosen time before the due date
  - D) Other (please describe)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** B) Yes, a reminder inside the app only (e.g. a list of what is due today when the user opens the app)
- **Status:** confirmed
- **BA note:** Round 2: FR-11 confirmed as in-app only, in the first launch; email/phone reminders out of scope. The exact content of the in-app reminder is asked in follow-up Q-19.

### Q-05: Are family members notified about shared tasks?
- **Question:** The meeting left this open: when a task is shared with family members (or changed, or done), should they be notified?
- **Why it matters:** Notifications need a delivery channel and add effort; the meeting explicitly marked this "Not decided".
- **Related:** FR-10, G-03, R-03
- **Options:**
  - A) No notifications; members just see shared tasks in their list
  - B) Notify when a task is shared with them only
  - C) Notify when a task is shared, changed, or marked done
  - D) Other (please describe, including how: email, phone notification, inside the app)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** B) Notify when a task is shared with them only
- **Status:** confirmed
- **BA note:** Round 2: FR-10 confirmed (notify only on share), BR-07 added; notifications on change/done out of scope. The answer does not say how the notification is delivered, so the channel is asked in follow-up Q-20.

### Q-06: How does task priority relate to the due date?
- **Question:** The meeting notes define priorities as High = "Today", Normal = "This week", Low = "Some day". Does the user pick the priority themselves, or should the app set it from the due date? And which priority does a new task get by default?
- **Why it matters:** If priority follows the due date, the user never picks it and the two must stay in sync; if the user picks it, a "High" task could be due next month. This changes the task form and the task list.
- **Related:** FR-04, FR-08, AMB-01, BR-03
- **Options:**
  - A) The user picks the priority freely; the table is only a guide; default Normal
  - B) The app sets the priority automatically from the due date (due today = High, this week = Normal, later = Low)
  - C) Priority replaces the due date for tasks without a fixed date (e.g. "Some day" tasks have no due date)
  - D) Other (please describe)
- **Answer (original):** A  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** A) The user picks the priority freely; the table is only a guide; default Normal
- **Status:** confirmed
- **BA note:** Round 2: FR-08 and BR-03 confirmed (free choice, default Normal, table shown as guidance only); AMB-01 resolved.

### Q-07: Launch date and what must be ready for it
- **Question:** Does "launch before Tet" mean before Tet 2027 (6 February 2027)? With a small budget, which features must be ready by then, and which can come after launch?
- **Why it matters:** About 16 weeks remain; knowing the must-haves lets us order the work so the launch is not at risk.
- **Related:** NFR-05, NFR-06, G-07, A-05, R-01
- **Options:**
  - A) Tet 2027; must-have: login, create task, mark done, overdue highlight; sharing and everything else after launch
  - B) Tet 2027; must-have: everything above plus priority and sharing; reminders/notifications after launch
  - C) Tet 2027; everything in the brief and meeting notes must be ready
  - D) Other (please describe the date and the must-haves)
- **Answer (original):** C  (stakeholder reply on 2026-10-13: "1. A, 2. A, 3. B, 4.B, 5.B, 6.A,7.C")
- **Answer (English):** C) Tet 2027; everything in the brief and meeting notes must be ready
- **Status:** confirmed
- **BA note:** Round 2: NFR-05 confirmed (launch before 2027-02-06, all features in SRC-1 and SRC-2 are must-have, including the in-app reminders from Q-04 and the share notification from Q-05); A-05 confirmed. R-01 updated: little schedule room.

### Q-08: Creating an account and forgotten passwords
- **Question:** If users log in with email and password: can anyone sign up by themselves, and should there be a "forgot password" option? Should users be able to delete their account?
- **Why it matters:** These are separate screens and flows; leaving them out locks users out, adding them costs time.
- **Related:** FR-03, G-06, A-02 (only relevant if Q-01 is A or C)
- **Options:**
  - A) Self sign-up and forgot-password; account deletion later
  - B) Self sign-up, forgot-password, and account deletion
  - C) No self sign-up: only invited family members can create an account
  - D) Other (please describe)
- **Answer (original):** b  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** B) Self sign-up, forgot-password, and account deletion
- **Status:** confirmed
- **BA note:** Round 3: FR-03 confirmed (self sign-up, forgotten-password recovery), FR-16 added (delete own account), A-02 confirmed, G-06 resolved. Account deletion raises what happens to the user's shared tasks and to a family they created: follow-up Q-21. R-05: password recovery depends on email delivery.

### Q-09: What exactly is the due date?
- **Question:** Is the due date a day only, or a day and a time? Must every task have a due date?
- **Why it matters:** Decides the task form and when a task becomes overdue.
- **Related:** FR-04, AMB-03, BR-02
- **Options:**
  - A) Day only, required
  - B) Day only, optional
  - C) Day and (optional) time, required
  - D) Other (please describe)
- **Answer (original):** c  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** C) Day and (optional) time, required
- **Status:** confirmed
- **BA note:** Round 3: FR-04 and BR-02 confirmed (due date required, due time optional); AMB-03 resolved. The overdue moment for tasks with and without a time is still asked in Q-11.

### Q-10: Editing, deleting and un-doing tasks
- **Question:** Besides creating a task and marking it done, can a user edit a task, delete it, and undo "done"? Do done tasks stay visible?
- **Why it matters:** The sources only mention create and mark done; users usually expect more, and each is extra work.
- **Related:** FR-06, FR-12, G-05, A-03
- **Options:**
  - A) Edit, delete and undo done are all allowed; done tasks move to a separate "done" list
  - B) Same as A, but done tasks are hidden after some time (please say how long)
  - C) Only create and mark done for the first launch
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** A) Edit, delete and undo done are all allowed; done tasks move to a separate "done" list
- **Status:** confirmed
- **BA note:** Round 3: FR-06 (undo done), FR-12 (owner edits and deletes) confirmed, FR-17 (separate done list, not auto-hidden) and BR-09 added; A-03 confirmed, G-05 resolved. Per BR-06 only the owner edits or deletes. Follow-ups: who may undo "done" on a shared task (Q-22) and changing recipients / deleting a shared task (Q-26).

### Q-11: When is a task overdue and how should it stand out?
- **Question:** When does a task count as overdue, and how should overdue tasks stand out?
- **Why it matters:** "Stand out" can mean several things; agreeing now avoids rework.
- **Related:** FR-07, AMB-02, BR-04, A-06
- **Options:**
  - A) Overdue from the day after the due date (or after the due time, if Q-09 allows a time); shown in red
  - B) Same timing as A; shown in red and placed at the top of the list
  - C) Same timing as A; shown in a separate "Overdue" section
  - D) Other (please describe)
- **Answer (original):** b  (stakeholder reply on 2026-10-13: "31.a, 11.b, 19.b, 12.a, 30.a")
- **Answer (English):** B) Same timing as A; shown in red and placed at the top of the list
- **Status:** confirmed
- **BA note:** Round 6: FR-07 and BR-04 confirmed (a task without a due time is overdue from the day after its due date; with a due time, once that time has passed), BR-21 added (red, at the top of the list); a separate "Overdue" section is out of scope. AMB-02 resolved, A-06 confirmed. Local time is assumed (A-12, shown at sign-off). How the rest of the list is ordered is asked in follow-up Q-32.

### Q-12: Choosing the language
- **Question:** How does the user get Vietnamese or English, and which language is the default?
- **Why it matters:** Decides whether a language setting is needed and what new users see first.
- **Related:** FR-13, NFR-03, AMB-04
- **Options:**
  - A) Follows the phone/browser language; Vietnamese if neither applies; no setting
  - B) Default Vietnamese; the user can switch in a setting
  - C) Follows the phone/browser language, and the user can switch in a setting
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "31.a, 11.b, 19.b, 12.a, 30.a")
- **Answer (English):** A) Follows the phone/browser language; Vietnamese if neither applies; no setting
- **Status:** confirmed
- **BA note:** Round 6: FR-13 and NFR-03 confirmed, BR-22 added (Vietnamese or English following the phone/browser language, otherwise Vietnamese; no language setting in the app, which is now out of scope). AMB-04 resolved; "preferred language" removed from the `User` entity. Assumed that share notifications and the privacy notice also follow each person's interface language (A-13, shown at sign-off).

### Q-13: What does "personal data stored securely" require?
- **Question:** Beyond normal good practice (secure connections, protected passwords, only you and your family can see your tasks), is there a specific legal or company requirement, for example Vietnam's personal data protection decree (Decree 13/2023), that TodoNow must formally meet?
- **Why it matters:** Formal compliance adds work (privacy notice, consent, data deletion requests) that must be planned before launch.
- **Related:** NFR-04, AMB-05, R-04
- **Options:**
  - A) Normal good practice only
  - B) Must formally comply with Decree 13/2023 (or another law; please name it)
  - C) Not sure; please propose what is needed
  - D) Other (please describe)
- **Answer (original):** c  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** C) Not sure; please propose what is needed
- **Status:** confirmed
- **BA note:** Round 3: the answer settles that the stakeholder knows of no specific legal or company requirement and wants a proposal. It does not decide the requirement itself, so NFR-04 stays open and the BA's proposal is put to the stakeholder for approval in follow-up Q-23. R-04 updated.

### Q-14: Which devices are in scope?
- **Question:** The requirements name mobile browsers (Chrome on Android, Safari on iPhone). Is a native app from the App Store / Google Play out of scope, and should the app also work well on computer browsers?
- **Why it matters:** Confirms the platform scope and what must be tested.
- **Related:** NFR-01, A-04
- **Options:**
  - A) Mobile browsers only; computers not a target; no native app
  - B) Mobile browsers and computer browsers; no native app
  - C) A native app is also needed (please say when)
  - D) Other (please describe)
- **Answer (original):** D: wpa cho phase này.  (stakeholder reply on 2026-10-13: "16. C, 21.C, 18.a, 24.a, 14.D: wpa cho phase này.")
- **Answer (English):** D) Other: "wpa for this phase." ("wpa" is written exactly as the stakeholder typed it [sic])
- **Status:** confirmed
- **BA note:** Round 4: not resolved; "wpa" was unclear and asked precisely in follow-up Q-27. Round 5: resolved together with Q-27 (answer A, clarified as "Pwa"): a PWA for phones only (Chrome on Android, Safari on iPhone), computers not a target, no App Store / Google Play app in this phase. NFR-01 confirmed, A-04 confirmed, AMB-07 resolved.

### Q-15: How does a family invitation reach the invited person?
- **Question:** You chose that one person creates the family and invites the others. How should the invitation reach the person being invited, and what do they need to do to join?
- **Why it matters:** Decides whether the app must send emails and how a new person ends up with an account inside the right family; it also interacts with sign-up (Q-08).
- **Related:** FR-14, FR-15, G-08, R-05, follow-up of Q-02
- **Options:**
  - A) The creator enters the person's email; the app sends an invitation email with a link; the person opens it, logs in or signs up, and joins
  - B) The app gives the creator an invitation link or code that they send themselves (e.g. by Zalo or SMS); the person opens it, logs in or signs up, and joins
  - C) Both A and B
  - D) Other (please describe)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** B) The app gives the creator an invitation link or code that they send themselves (e.g. by Zalo or SMS); the person opens it, logs in or signs up, and joins
- **Status:** confirmed
- **BA note:** Round 3: FR-14 and FR-15 confirmed (link or code sent by the creator; open it, log in or sign up, join); invitation emails out of scope; G-08 resolved. A forwarded link could let outsiders join (R-06), so validity is asked in follow-up Q-24.

### Q-16: Family membership: no family, leaving and removing
- **Question:** Can someone use TodoNow for their own tasks before they create or join a family? And once in a family, can a member leave it, and can the creator remove a member?
- **Why it matters:** Decides what a new user sees first and what happens to shared tasks when family membership changes.
- **Related:** FR-14, FR-15, BR-05, G-09, A-08, follow-up of Q-02
- **Options:**
  - A) A family is optional (own tasks work without one); members cannot leave or be removed in the first launch
  - B) A family is optional; members can leave and the creator can remove members; after that they no longer see the family's shared tasks
  - C) Same as B, and the creator can also delete the family or hand the creator role to another member
  - D) Other (please describe, e.g. a family is required before using the app)
- **Answer (original):** C  (stakeholder reply on 2026-10-13: "16. C, 21.C, 18.a, 24.a, 14.D: wpa cho phase này.")
- **Answer (English):** C) Same as B, and the creator can also delete the family or hand the creator role to another member
- **Status:** confirmed
- **BA note:** Round 4: BR-10 added (a family is optional; own tasks work without one), A-08 confirmed. FR-19 (member leaves), FR-20 (creator removes a member), FR-21 (creator deletes the family), FR-22 (creator hands over the creator role) and BR-11 (after leaving or removal the person no longer sees tasks shared with them) added; G-09 resolved. Follow-ups: what happens to tasks the leaving/removed member had shared, and to shared tasks when the family is deleted (Q-28); whether the creator can leave the family (Q-29).

### Q-17: Who receives a shared task?
- **Question:** When the owner shares a task, does it go to the whole family at once, or does the owner pick which family members get it?
- **Why it matters:** Changes the share screen and who sees and is notified about each task.
- **Related:** FR-09, FR-10, G-12, follow-up of Q-03
- **Options:**
  - A) Always the whole family (one "share with family" action)
  - B) The owner picks one or more family members
  - C) The owner can choose either the whole family or specific members
  - D) Other (please describe)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** B) The owner picks one or more family members
- **Status:** confirmed
- **BA note:** Round 3: FR-09 confirmed and BR-08 added (owner picks one or more members); a single "share with whole family" action is out of scope; G-12 resolved. Only picked members are notified (FR-10). Changing recipients later is asked in Q-26. Round 5: the later reply "17.a" was clarified by the stakeholder ("Pwa") as an answer to Q-27, not a change to Q-17; Q-17 stays B.

### Q-18: When a family member marks a shared task done, is it done for everyone?
- **Question:** Family members may mark a shared task as done. When one of them does, is the task done for the owner and everyone else it is shared with, or only for that person?
- **Why it matters:** Decides what everyone sees in their list after someone finishes a shared task (e.g. "buy rice" done by one person).
- **Related:** FR-06, FR-09, AMB-06, A-07, follow-up of Q-03
- **Options:**
  - A) Done for everyone, and the app shows who marked it done
  - B) Done for everyone, without showing who did it
  - C) Each person marks it done only for themselves
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "16. C, 21.C, 18.a, 24.a, 14.D: wpa cho phase này.")
- **Answer (English):** A) Done for everyone, and the app shows who marked it done
- **Status:** confirmed
- **BA note:** Round 4: FR-18 and BR-12 added (a shared task marked done by anyone is done for the owner and all recipients; the app shows who marked it done); A-07 confirmed, AMB-06 resolved. Who may undo "done" on a shared task stays open in Q-22, which is now relevant.

### Q-19: What does the in-app reminder show?
- **Question:** You chose an in-app reminder. When the user opens the app, which tasks should the reminder show?
- **Why it matters:** Defines the reminder screen or section so it can be built and tested.
- **Related:** FR-11, G-11, follow-up of Q-04
- **Options:**
  - A) Tasks due today
  - B) Tasks due today and overdue tasks
  - C) Tasks due today, overdue tasks, and tasks due tomorrow
  - D) Other (please describe)
- **Answer (original):** b  (stakeholder reply on 2026-10-13: "31.a, 11.b, 19.b, 12.a, 30.a")
- **Answer (English):** B) Tasks due today and overdue tasks
- **Status:** confirmed
- **BA note:** Round 6: FR-11 confirmed (on opening the app, the reminder shows tasks due today and overdue tasks); tasks due tomorrow are out of scope. G-11 resolved. Assumed that the reminder covers the same tasks as the person's list, i.e. own and shared tasks that are not done (A-14, shown at sign-off).

### Q-20: How is a family member notified that a task was shared with them?
- **Question:** You chose to notify family members when a task is shared with them. How should they receive this notification?
- **Why it matters:** An in-app notice needs no outside service; email needs email sending; phone notifications in a mobile browser are limited, especially on iPhone, and add effort before the Tet launch.
- **Related:** FR-10, G-10, R-03, R-05, follow-up of Q-05
- **Options:**
  - A) Inside the app only (e.g. a "new shared tasks" mark the next time they open the app)
  - B) By email
  - C) By phone notification, even when the app is closed
  - D) Other (please describe, or a combination)
- **Answer (original):** C  (stakeholder reply on 2026-10-13: "8.b, 9.c, 10.a, 13.c,15.B, 17.B, 20.C")
- **Answer (English):** C) By phone notification, even when the app is closed
- **Status:** confirmed
- **BA note:** Round 3: FR-10 confirmed as a phone notification, also when the app is closed; G-10 resolved. R-03 updated: some users (notifications not allowed; iPhone users who have not added the app to the Home Screen or run an older iOS) will not receive it, so follow-up Q-25 asks what should happen for them.

### Q-21: What happens when a user deletes their account?
- **Question:** You chose that users can delete their account. When someone deletes their account, what should happen to their tasks (including tasks they shared with family members), and, if they created a family, to that family?
- **Why it matters:** Other family members may rely on tasks the person shared, and a family without its creator can no longer invite anyone; this decides what the remaining members see.
- **Related:** FR-16, G-13, Q-16, follow-up of Q-08
- **Options:**
  - A) All their tasks are deleted, also for the people they were shared with; if they created a family, the family is deleted and the other members keep using the app without a family
  - B) All their tasks are deleted, also for the people they were shared with; if they created a family, the family stays and the creator role passes automatically to another member
  - C) A family creator must first hand over the creator role (or delete the family) before they can delete their account; their tasks are deleted, also for the people they were shared with
  - D) Other (please describe, e.g. shared tasks stay with the family members)
- **Answer (original):** C  (stakeholder reply on 2026-10-13: "16. C, 21.C, 18.a, 24.a, 14.D: wpa cho phase này.")
- **Answer (English):** C) A family creator must first hand over the creator role (or delete the family) before they can delete their account; their tasks are deleted, also for the people they were shared with
- **Status:** confirmed
- **BA note:** Round 4: FR-16 updated and BR-13 added (a family creator must first hand over the creator role or delete the family; deleting an account deletes all the user's own tasks, also for the people they were shared with; the user leaves their family). G-13 resolved. Consistent with Q-16 (handover and family deletion exist).

### Q-22: Who may undo "done" on a shared task?
- **Question:** You chose that "done" can be undone. For a task shared with family members, who may undo "done"? (Only relevant if a shared task is done for everyone, Q-18 A or B.)
- **Why it matters:** Decides who can bring a finished shared task back to everyone's list.
- **Related:** FR-06, BR-06, G-14, Q-18, follow-up of Q-10
- **Options:**
  - A) The owner and everyone the task is shared with
  - B) Only the owner
  - C) The owner and the person who marked it done
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "17.a, 28.a, 29.a,22.a,26.a")
- **Answer (English):** A) The owner and everyone the task is shared with
- **Status:** confirmed
- **BA note:** Round 4: now relevant, because Q-18 was answered A (done for everyone). Round 5: FR-06 updated, BR-06 updated and BR-15 added (the owner or any member the task is currently shared with may undo "done"; it is undone for everyone). G-14 resolved.

### Q-23: Proposal for protecting personal data
- **Question:** You asked us to propose what is needed for "personal data stored securely". We are not lawyers; Vietnam's Decree 13/2023 on personal data protection may apply to an app that stores data about people in Vietnam. Our proposal for the launch: (1) passwords are never stored in readable form and all connections are encrypted; (2) each user can see only their own tasks and the tasks shared with them; (3) a short privacy notice in Vietnamese and English says what data is stored and why; (4) at sign-up the user agrees to the privacy notice; (5) deleting an account (already decided in Q-08) removes that user's personal data; (6) personal data is not shared with or sold to anyone else. Which do you choose?
- **Why it matters:** Items 3 and 4 add screens and text that must be written and translated before launch; skipping them may leave a legal risk.
- **Related:** NFR-04, AMB-05, R-04, follow-up of Q-13
- **Options:**
  - A) Accept the proposal (items 1 to 6)
  - B) Accept the proposal, and I will also have a lawyer check it before launch
  - C) Only items 1, 2, 5 and 6 (no privacy notice and no agreement at sign-up)
  - D) Other (please describe)
- **Answer (original):** A  (stakeholder reply on 2026-10-13: "23. A, 25.A")
- **Answer (English):** A) Accept the proposal (items 1 to 6)
- **Status:** confirmed
- **BA note:** Round 4: asked in round 3 but not answered; still open, ask again. Round 5: NFR-04 confirmed (item 1), NFR-07 (item 2) and NFR-08 (item 6) added; FR-23 privacy notice (item 3), FR-24 agreement at sign-up (item 4) and BR-19 added; FR-16 extended (item 5). AMB-05 resolved. No lawyer review was chosen, so R-04 keeps a residual legal risk. Who writes the notice text is asked in follow-up Q-31.

### Q-24: How long does an invitation link or code work?
- **Question:** You chose an invitation link or code that the creator sends themselves (e.g. by Zalo or SMS). Such a message can be forwarded. How many people may use one link or code, and for how long does it work?
- **Why it matters:** Anyone who joins a family can receive tasks shared with them; a link that works forever for anyone could let outsiders join.
- **Related:** FR-14, FR-15, G-15, R-06, follow-up of Q-15
- **Options:**
  - A) One link or code per invited person; it works once and expires after 7 days
  - B) One link or code for the whole family; it works for anyone until the creator replaces it
  - C) One link or code for the whole family; anyone can use it, but it expires after 7 days
  - D) Other (please describe, e.g. the creator must approve each person who joins)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "16. C, 21.C, 18.a, 24.a, 14.D: wpa cho phase này.")
- **Answer (English):** A) One link or code per invited person; it works once and expires after 7 days
- **Status:** confirmed
- **BA note:** Round 4: FR-14 updated and BR-14 added (the creator gets a separate link or code for each invited person; it can be used once and expires 7 days after it was created); G-15 resolved, R-06 reduced. Follow-up: whether the creator can see and cancel invitations not yet used (Q-30).

### Q-25: What if someone cannot receive phone notifications?
- **Question:** You chose a phone notification, even when the app is closed, when a task is shared. In a phone's web browser this only works if the person allows notifications; on iPhone it also needs a recent iOS version and the person must first add TodoNow to their Home Screen. What should happen for people who do not get phone notifications?
- **Why it matters:** Some family members (especially iPhone users who only open TodoNow in Safari) will never see a phone notification; without a fallback they may not notice a shared task.
- **Related:** FR-10, NFR-01, G-16, R-03, Q-14, follow-up of Q-20
- **Options:**
  - A) Nothing extra; the shared task simply appears in their list
  - B) Also show a "new shared task" mark inside the app, for everyone
  - C) Send them an email instead
  - D) Other (please describe, e.g. a native app from the App Store / Google Play)
- **Answer (original):** A  (stakeholder reply on 2026-10-13: "23. A, 25.A")
- **Answer (English):** A) Nothing extra; the shared task simply appears in their list
- **Status:** confirmed
- **BA note:** Round 4: asked in round 3 but not answered; still open, ask again. Round 5: FR-10 updated (no fallback; a person without phone notifications just sees the shared task in their list); an in-app "new" mark and email fallback are out of scope. G-16 resolved; R-03 accepted by the stakeholder.

### Q-26: Changing or deleting a task that is already shared
- **Question:** You chose that the owner can edit and delete their tasks. For a task that is already shared: can the owner later add or remove the family members it is shared with, and what happens for those members when the owner deletes it?
- **Why it matters:** Decides the edit screen for shared tasks and what family members see when a task disappears.
- **Related:** FR-09, FR-12, G-17, A-09, follow-up of Q-10 and Q-17
- **Options:**
  - A) The owner can add and remove members at any time (newly added members get the "shared with you" notification); a deleted task disappears for everyone
  - B) The owner can only add more members later (they get the notification), not remove anyone; a deleted task disappears for everyone
  - C) The members cannot be changed once the task is shared; a deleted task disappears for everyone
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "17.a, 28.a, 29.a,22.a,26.a")
- **Answer (English):** A) The owner can add and remove members at any time (newly added members get the "shared with you" notification); a deleted task disappears for everyone
- **Status:** confirmed
- **BA note:** Round 5: FR-09, FR-10 and FR-12 updated, BR-07 updated and BR-16 added (the owner can add or remove recipients at any time; newly added members get the share notification; removed members no longer see the task; deleting a shared task removes it for everyone). A-09 confirmed, G-17 resolved.

### Q-27: What did you mean by "wpa" for the devices?
- **Question:** For the devices question (Q-14) you answered "D: wpa cho phase này" ("wpa for this phase"). We think "wpa" means "PWA" (progressive web app): TodoNow is a website that people can also add to their phone's Home Screen and then open like an app, without the App Store or Google Play. Is that what you meant, and should TodoNow also work well on computer browsers?
- **Why it matters:** Decides what is built and tested in this phase. A PWA added to the Home Screen is also what iPhone needs to receive phone notifications (Q-20, Q-25), so this affects notifications too.
- **Related:** NFR-01, A-04, AMB-07, R-03, Q-14, Q-25, follow-up of Q-14
- **Options:**
  - A) Yes, a PWA for phones only (Chrome on Android, Safari on iPhone); computers are not a target; no App Store / Google Play app in this phase
  - B) Yes, a PWA for phones, and it must also work well on computer browsers; no App Store / Google Play app in this phase
  - C) No, "wpa" meant something else (please describe)
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "17.a, 28.a, 29.a,22.a,26.a"; the PM asked whether "17.a" meant Q-27 or a change to the already-confirmed Q-17, and the stakeholder replied: "Pwa")
- **Answer (English):** A) Yes, a PWA for phones only (Chrome on Android, Safari on iPhone); computers are not a target; no App Store / Google Play app in this phase. Clarification reply: "PWA".
- **Status:** confirmed
- **BA note:** Round 5: the clarification "Pwa" ties "17.a" to this question (PWA is only an option here), so the answer is A. NFR-01 confirmed as a PWA for phones that can be added to the Home Screen; computer browsers are not a target; native apps are out of scope for this phase. Q-14 confirmed with it; A-04 confirmed, AMB-07 resolved. "Computers are not a target" is highlighted in understanding.md so the stakeholder can catch it at sign-off.

### Q-28: Shared tasks when someone leaves, is removed, or the family is deleted
- **Question:** You chose that members can leave, the creator can remove members, and the creator can delete the family; after leaving or removal a person no longer sees the tasks shared with them. What happens to the tasks that this person had shared with other family members, and what happens to shared tasks when the creator deletes the family?
- **Why it matters:** Other members may still need tasks the person shared (e.g. "buy rice"); this decides what everyone sees after a family change.
- **Related:** FR-09, FR-19, FR-20, FR-21, G-18, A-10, follow-up of Q-16
- **Options:**
  - A) Sharing simply ends: every task stays only with its owner, and the other members no longer see it (when a family is deleted, this happens for all shared tasks)
  - B) Tasks the leaving or removed person owns are deleted for everyone; when a family is deleted, sharing ends and every task stays only with its owner
  - C) Tasks the leaving or removed person shared stay visible to the remaining members they were shared with; when a family is deleted, sharing ends and every task stays only with its owner
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "17.a, 28.a, 29.a,22.a,26.a")
- **Answer (English):** A) Sharing simply ends: every task stays only with its owner, and the other members no longer see it (when a family is deleted, this happens for all shared tasks)
- **Status:** confirmed
- **BA note:** Round 5: FR-19, FR-20 and FR-21 updated, BR-17 added (when a member leaves or is removed, sharing of their tasks ends and the tasks stay only with them; when the family is deleted, all sharing ends and every task stays with its owner; no task is deleted). A-10 confirmed, G-18 resolved.

### Q-29: Can the family creator leave the family?
- **Question:** You chose that members can leave a family and that the creator can hand over the creator role or delete the family. Can the creator leave the family, and if so, how?
- **Why it matters:** A family without a creator can no longer invite or remove anyone; for account deletion (Q-21) you chose that the creator must first hand over the role or delete the family.
- **Related:** FR-19, FR-21, FR-22, G-19, A-11, follow-up of Q-16 and Q-21
- **Options:**
  - A) Only after handing over the creator role to another member or deleting the family (same rule as for deleting an account)
  - B) Yes, at any time; the creator role passes automatically to another member
  - C) No; the creator can only delete the family
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "17.a, 28.a, 29.a,22.a,26.a")
- **Answer (English):** A) Only after handing over the creator role to another member or deleting the family (same rule as for deleting an account)
- **Status:** confirmed
- **BA note:** Round 5: FR-19 updated and BR-18 added (the creator can leave only after handing over the creator role or deleting the family). A-11 confirmed, G-19 resolved.

### Q-30: Can the creator see and cancel invitations?
- **Question:** You chose a separate invitation link or code per invited person, usable once and expiring after 7 days. Can the family creator see the invitations that have not been used yet and cancel one (for example, if it was sent to the wrong person)?
- **Why it matters:** Without cancelling, a link sent to the wrong person works for up to 7 days and lets that person join the family.
- **Related:** FR-14, BR-14, G-20, R-06, follow-up of Q-24
- **Options:**
  - A) Yes: the creator sees a list of unused invitations and can cancel any of them
  - B) No list or cancelling; an unused invitation simply expires after 7 days (the creator can remove a wrong person after they join)
  - C) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "31.a, 11.b, 19.b, 12.a, 30.a")
- **Answer (English):** A) Yes: the creator sees a list of unused invitations and can cancel any of them
- **Status:** confirmed
- **BA note:** Round 6: FR-25 and BR-20 added (the creator sees the unused invitations and can cancel any of them; a cancelled invitation can no longer be used); `Invitation` gets a cancelled state. G-20 resolved, R-06 reduced further. Assumed that expired invitations are not shown in the list (A-15, shown at sign-off).

### Q-31: Who writes the privacy notice?
- **Question:** You accepted the proposal for protecting personal data, which includes a short privacy notice in Vietnamese and English that each user agrees to at sign-up. Who provides the text of this notice?
- **Why it matters:** Sign-up cannot work at launch without the notice text in both languages, and we are not lawyers; this decides who must write it and by when, before Tet.
- **Related:** FR-23, FR-24, NFR-04, G-21, R-04, R-07, follow-up of Q-23
- **Options:**
  - A) The team drafts a simple notice in both languages, and I approve it before launch
  - B) I (or someone I choose) provide the final text in both languages
  - C) I provide the text in Vietnamese; the team translates it into English, and I approve the translation
  - D) Other (please describe)
- **Answer (original):** a  (stakeholder reply on 2026-10-13: "31.a, 11.b, 19.b, 12.a, 30.a")
- **Answer (English):** A) The team drafts a simple notice in both languages, and I approve it before launch
- **Status:** confirmed
- **BA note:** Round 6: FR-23 confirmed (the team drafts the notice in Vietnamese and English; the stakeholder approves it before launch). G-21 resolved. R-07 updated: the stakeholder's approval of the text is a launch dependency. R-04 updated: the team's draft is not legal advice.

### Q-32: In what order are tasks shown in the task list?
- **Question:** You chose that overdue tasks are shown in red at the top of the task list. How should the other tasks in the list be ordered, and how are the overdue tasks ordered among themselves?
- **Why it matters:** Each task has a due date (with an optional time) and a priority (High, Normal, Low); the order decides what a busy family member sees first and must be fixed so it can be built and tested.
- **Related:** FR-05, FR-07, FR-08, G-22, follow-up of Q-11
- **Options:**
  - A) By due date and time, earliest first (overdue tasks at the top, also earliest first); priority does not change the order
  - B) By priority (High, then Normal, then Low), and within the same priority by due date and time, earliest first (overdue tasks at the top, ordered the same way)
  - C) By due date and time, earliest first, and within the same due date by priority (High first) (overdue tasks at the top, ordered the same way)
  - D) Other (please describe)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "B")
- **Answer (English):** B) By priority (High, then Normal, then Low), and within the same priority by due date and time, earliest first (overdue tasks at the top, ordered the same way)
- **Status:** confirmed
- **BA note:** Round 6: new follow-up of Q-11 (G-22). No source states the list order. Round 7: FR-05 confirmed and BR-23 added (overdue tasks first, then all other tasks; within each of the two groups by priority High, Normal, Low, and within the same priority by due date and time, earliest first). Ordering by due date first is out of scope. G-22 resolved. Two small details are assumed and shown at sign-off: on the same due date a task without a due time comes after tasks with a time (A-16); the in-app reminder uses the same order (A-17).

### Q-33: What happens when someone logs out?
- **Question:** You asked to add logging out. When someone logs out of TodoNow on their phone, what should happen?
- **Why it matters:** After logging out, that phone could still receive "a task was shared with you" notifications showing the task title, for example if the phone is lent to someone or used by another family member. A person who is logged in on more than one phone (or who lost a phone) may also want to log out everywhere at once.
- **Related:** FR-26, FR-10, BR-25, NFR-07, G-23, A-19, follow-up of the 2026-10-13 GATE 2 feedback
- **Options:**
  - A) They are logged out on this phone only; this phone gets no more "shared with you" notifications for them until they log in on it again
  - B) Same as A, plus a separate "log out on all devices" option that logs them out everywhere
  - C) They are logged out on this phone only; this phone keeps getting their "shared with you" notifications
  - D) Other (please describe)
- **Answer (original):** B  (stakeholder reply on 2026-10-13: "33.B, 34. C")
- **Answer (English):** B) Same as A, plus a separate "log out on all devices" option that logs them out everywhere
- **Status:** confirmed
- **BA note:** Round 8: new. FR-26 (log out) is confirmed from the stakeholder's feedback; this question settles what it affects. Related assumption shown at re-sign-off: a person stays logged in on a phone until they log out (A-19). Round 9: FR-26 updated (log out on this phone ends the session there and stops that phone getting the person's share notifications until they log in on it again; a separate "log out on all devices" option does the same on every phone at once), BR-25 updated, BR-26 added, FR-10 and NFR-07 cross-referenced (share notifications go only to phones where the recipient is logged in), `Login on a device` entity added. A logged-out phone that keeps receiving notifications is out of scope. G-23 resolved. Assumed that resetting a forgotten password does not log the person out on other phones (A-21, shown at re-sign-off).

### Q-34: Which characters count in the password rule?
- **Question:** You asked that passwords have at least 8 characters including lowercase letters, uppercase letters, digits and special characters. Many people type Vietnamese letters with marks (for example ă, ê, ơ, Đ) on their phone keyboard, and some type spaces. How should the rule treat these characters?
- **Why it matters:** It decides whether a password such as "Mậtkhẩu1!" is accepted, and how the app explains the rule on the sign-up and new-password screens, so that people are not refused for reasons they cannot see.
- **Related:** FR-27, BR-24, FR-03, NFR-04, AMB-08, A-18, follow-up of the 2026-10-13 GATE 2 feedback
- **Options:**
  - A) Letters with Vietnamese marks count as letters (ê is lowercase, Ê is uppercase); any character that is not a letter or a digit counts as a special character (for example ! @ # $ % or a space)
  - B) Only letters without marks (a-z, A-Z) count as lowercase or uppercase letters; letters with marks and spaces are allowed and count as special characters
  - C) Only letters without marks (a-z, A-Z), digits and keyboard symbols (for example ! @ # $ % ^ & *) are allowed; letters with marks and spaces cannot be used in a password
  - D) Other (please describe)
- **Answer (original):** C  (stakeholder reply on 2026-10-13: "33.B, 34. C")
- **Answer (English):** C) Only letters without marks (a-z, A-Z), digits and keyboard symbols (for example ! @ # $ % ^ & *) are allowed; letters with marks and spaces cannot be used in a password
- **Status:** confirmed
- **BA note:** Round 8: new. FR-27 (at least 8 characters with lowercase, uppercase, digit and special character) is confirmed from the stakeholder's feedback; this question settles AMB-08. Related assumption shown at re-sign-off: the rule also applies to a new password set after "forgot password" (A-18). Round 9: FR-27 and BR-24 updated (at least 8 characters; at least one a-z, one A-Z, one 0-9 and one keyboard symbol; no other characters, so letters with Vietnamese marks and spaces are refused); NFR-04 cross-referenced. AMB-08 resolved. The option gave keyboard symbols only as examples, so the full list is assumed as the symbols on a standard English keyboard (A-20, shown at re-sign-off). R-09 added: the screens must say clearly which characters are allowed. A "Mậtkhẩu1!"-style password is refused.

<!-- Status values: open | answered | confirmed | deferred
     answered  = PM recorded an answer, BA has not processed it
     confirmed = BA applied it to requirements.md
     deferred  = stakeholder agreed to postpone; reason required in BA note -->
