# S-29: Passwords follow the password rule

- **Priority:** P0
- **Covers:** FR-27, NFR-04 · **Decisions:** Q-34
- **Depends on stories:** S-02, S-04

## User story
As a visitor or family member setting a password, I want to know the password rule and have
passwords that break it refused, so that my account is protected by a strong password.

## Acceptance criteria
These criteria apply on both screens where a password is set: sign-up (S-02) and the new
password after "forgot password" (S-04).

1. **Rule is shown**
   - Given I am on a screen where I set a password
   - When I look at the password field
   - Then I see the password rule and the characters I may use (a-z, A-Z, 0-9 and keyboard symbols), in my interface language
2. **Too short**
   - Given I am setting a password
   - When I enter a password with fewer than 8 characters, e.g. "Ab1!xyz" (7 characters)
   - Then it is refused, it is not saved, and I am told it needs at least 8 characters
3. **A required character type is missing**
   - Given I am setting a password
   - When I enter a password of 8 or more characters without a lowercase letter ("ABCDEFG1!"), without an uppercase letter ("abcdefg1!"), without a digit ("Abcdefgh!") or without a keyboard symbol ("Abcdefg12")
   - Then it is refused, it is not saved, and I am told the password rule
4. **Letters with Vietnamese marks or spaces**
   - Given I am setting a password
   - When I enter a password containing a letter with Vietnamese marks (e.g. "Mậtkhẩu1!") or a space (e.g. "Abc 123!x")
   - Then it is refused, it is not saved, and I am told that only a-z, A-Z, 0-9 and keyboard symbols may be used
5. **Valid password accepted**
   - Given I am setting a password
   - When I enter a password that meets every part of the rule, e.g. "Abcdef1!" (exactly 8 characters) or "Todo~2027x"
   - Then it is accepted

## Out of scope
- Changing the password while logged in: not stated in the requirements.
- Checking existing passwords at login: every account is created under the rule (S-03).
- Further rules (maximum length, blocking common passwords): not stated in the requirements.

## Notes
- BR-24 (Q-34): at least 8 characters; at least one lowercase letter (a-z), one uppercase letter
  (A-Z), one digit (0-9) and one keyboard symbol; only these characters. Letters with
  Vietnamese marks (e.g. ă, â, đ, ê, ô, ơ, ư and any letter with a tone mark, in lower or upper
  case) and spaces are not allowed.
- A-20 (accepted at the change re-sign-off): keyboard symbols are the symbols on a standard
  English keyboard: ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ . Any one
  of them counts as the required special character.
- A-18 (accepted at the change re-sign-off): the rule applies at sign-up and when setting a new
  password after "forgot password".
- R-09: people who type Vietnamese letters with marks by habit must understand why a password
  is refused; the rule and allowed characters must be clear on screen (AC 1, AC 4).
- A-13: all messages are in the person's interface language. The exact wording is not specified
  in the requirements.
