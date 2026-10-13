# User administration: how I understand it (after round 5 answers, all questions answered)

## What it is
- An **admin area** for **our own TodoNow team** to manage **all TodoNow user accounts**.
  People outside the team, such as a school or company, do not use it.
- It is used on a **computer browser only**, in **Vietnamese and English following the browser
  language**, like the TodoNow app. The TodoNow app itself stays phone-only.
- It comes **after the Tet 2027 launch**, and should be ready **within about 3 months after
  launch**. The app launches without it.

## Staff accounts and roles
- Staff log in with a **separate admin account** (own email and password), then enter a
  **one-time code sent to their admin email**. An admin account cannot be used in the TodoNow
  app, and a TodoNow app account cannot open the admin area.
- Two roles:
  - **Administrator**: can do everything below.
  - **Support**: can only find and look at accounts and send a user a link to set a new
    password.
- Our technical team sets up the **first Administrator**. After that, Administrators give and
  remove admin access in the admin area. A new staff member gets an **email with a link to set
  their own password**; nobody hands out passwords.
- A staff member who **forgets their password** uses "forgot password" on the admin login page
  and gets a link at their admin email. If they **can no longer open that email**, an
  Administrator removes their admin account and gives access again with a new email.

## What staff can do with user accounts
- **Find** accounts: search by email or display name, and filter the list by account status and
  by family. (Administrator and Support)
- **See** an account. Staff see only: email, display name, family, account status and when the
  account was created. **Never tasks.** (Administrator and Support)
- **Send a link to set a new password** by email. (Administrator and Support)
- **Create** one account with email and display name. (Administrator)
- **Change the display name.** Nothing else can be changed: not the email, not the family.
  (Administrator)
- **Block** an account (the person cannot log in) and **unblock** it later with nothing lost.
  While blocked, **nothing changes for others**: the person stays in their family and the tasks
  they shared stay visible. (Administrator)
- **Delete** an account permanently, with the same effect as the person deleting it
  themselves: their tasks are deleted, also for the people they shared them with, and they
  leave their family. If they **created a family**, the creator role **passes automatically to
  another member**; if there is no other member, the family is deleted. (Administrator)
- **Import a CSV file** with email and display name per row, **up to about 1,000 people**, to
  add a group at once, as often as needed. Good rows become accounts; **wrong rows and emails
  that already have an account are skipped** and shown in a list with the reason. Existing
  accounts are never changed. Imported people are not put in any family. (Administrator)
- **Send the account email again** to a person who has not started yet. (Administrator)
- The user gets **an email** when an Administrator **changes their display name, blocks or
  deletes** their account.

## Emails
- Every email TodoNow sends to a user because of the admin area is written in **Vietnamese and
  English in the same email**, because TodoNow does not know which language each person reads.

## Record of staff actions
- The system **records what each staff member does** (who, what, when, to which account).
  **Administrators** can view this record in the admin area; Support cannot.
- When a user's account is deleted (by an Administrator, by the user, or automatically after 30
  days), the record **no longer shows their email or name**, only "deleted user" with what was
  done, by whom and when.
- Each record is **deleted automatically after 1 year**.

## How a created or imported person starts
- TodoNow sends them an **email with a link**. Through the link they **set their own password**
  (same password rule as the app) and **agree to the privacy notice**.
- The link **works for 7 days**. An Administrator can send a new one while the account exists.
- If the person instead **signs up in the app with the same email**, that sign-up completes the
  waiting account (they set their password and agree there), and the email link stops working.
- Until they do one of these, nobody can log in to that account.
- If they do not do it within **30 days**, the account is **deleted automatically**.
- Staff never choose or hand out passwords for users.

## Privacy notice
- The privacy notice will be **updated** to say that our team can see and manage account data
  (not tasks) and that accounts can be created by staff or by import. The team drafts it in
  Vietnamese and English and **you approve it** before the admin area is used.
- People who agreed to the old notice must agree to the updated one **the next time they open
  the app**, even if they stay logged in. Until they agree they cannot continue using the app.

## What I still need to know
- Nothing: all questions are answered. Please check the assumptions below and the points where
  this touches what you signed off for TodoNow.

## Where this touches what you already signed off for TodoNow
- Today an account exists only when the person signs up and agrees to the privacy notice. With
  your answers, created and imported people agree through the email link or at sign-up first,
  so that rule still holds; their email and name are kept at most 30 days before they agree.
- **Sign-up changes in one case:** signing up with the email of a waiting account completes that
  account instead of being refused.
- Staff see account data but never tasks, so the rule "each user sees only their own and shared
  tasks" still holds. The privacy notice will be updated.
- **Existing users will see a new screen** in the app asking them to agree to the updated
  privacy notice the next time they open it; today agreement is asked only at sign-up.
- For TodoNow you decided that the creator role is **not** handed over automatically when an
  account is deleted. That stays true when a person deletes their own account. Only when an
  **Administrator** deletes a family creator does the role pass automatically.
- Deleting an account removes the person's personal data, also from the record of staff
  actions.
- TodoNow sends no emails except password recovery today. The account email, the emails about
  admin actions, the admin login code, the staff password link and admin "forgot password" are
  new emails. One import can send up to about 1,000 emails at once.
- "Blocked" and "waiting" are new account states the app does not have today.

## What I am assuming (please confirm or correct)
- TodoNow's password and data protection rules also apply here, including admin passwords.
  (A-03)
- "Computer browser" means current Chrome, Edge, Firefox and Safari on a computer. (A-07)
- The password link sent by staff works like the app's "forgot password", does not log the
  person out on their other phones, and its email is also in Vietnamese and English together.
  (A-08)
- An Administrator can also block or delete an account that is still waiting; its email link
  then stops working. (A-09)
- An Administrator can change a staff member's role, and the last Administrator cannot be
  removed. (A-10)
- A staff member's admin account may use the same email as their own TodoNow app account; the
  two are independent. (A-11)
- Blocking logs the person out at once on all their phones. (A-12)
- When an Administrator deletes a family creator, the new creator is the member who joined the
  family earliest (preferring members who are not blocked). The new creator gets no message.
  (A-13)
- A blocked family creator stays creator; the family cannot be managed until they are unblocked
  or deleted. (A-14)
- The 30 days count from the day the account was created; sending a new link does not extend
  them. (A-15)
- A CSV row is "wrong" if the email is missing or invalid, the display name is missing, or the
  same email already appeared earlier in the file (the first one is imported). A file that
  cannot be read as a CSV with these two columns is refused as a whole. (A-16)
- The admin login code works once, for 10 minutes, and is needed at every login. (A-17)
- A new staff member's link to set their password works once, for 24 hours; an Administrator
  can send a new one. (A-18)
- The record of staff actions contains every action that changes something or sends an email
  (create, change name, block, unblock, delete, import with counts, password link, account
  email, giving, removing or changing admin access). Looking at accounts and logging in are not
  recorded, nor are the automatic 30-day deletions. Nobody can change or delete a record in the
  admin area. (A-19)
- The email about an admin action is sent for a name change, a block and a deletion of an
  account that was in use. It is not sent for an account still waiting, for an unblock, for the
  password link (that is already an email) or for the automatic 30-day deletion. It says what
  happened and how to contact our team; **you need to give us the contact address**. (A-20)
- When a new account email is sent, the links in earlier ones stop working. Only an
  Administrator can send it. (A-21)
- When sign-up completes a waiting account, the display name entered by the Administrator or in
  the file is kept. (A-22)
- The admin "forgot password" link works once, for 24 hours; the page does not reveal whether an
  email has an admin account; the email code is still needed after the reset. If the last
  Administrator loses their email, our technical team sets one up again. An admin account's
  email cannot be changed. (A-23)
- A CSV file with more than 1,000 rows is refused; it must be split. Account emails to imported
  people may take some minutes to arrive. (A-24)
- An existing user who does not agree to the updated notice can only log out; their account and
  data stay as they are, and they are asked again next time. "Opening the app" includes starting
  or reloading it; someone who already has it open is asked at the next start or reload. (A-25)
- The filters are: account status (waiting, active, blocked) and family (in a family, family
  creator, not in a family). TodoNow families have no name, so the list cannot be filtered by
  one particular family. Search and filters can be combined, and Support can use them too.
  (A-26)
- Emails to staff (login code, links to set an admin password) are also in Vietnamese and
  English together. (A-27)
- When a staff member's admin access is removed, their name stays in the record of staff
  actions until each record is deleted after 1 year. (A-28)
- Creating one account for an email that already has an account is refused. (BR-06)
