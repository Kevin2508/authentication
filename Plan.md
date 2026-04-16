
# Plan for Login/Signup System

This is my approach to implementing a login/signup system.
---

### Login and Signup

- **Frontend Validation**:
  - Valid email
  - strong password
  - CAPTCHA is solved
- **Backend Validation** (the main guardrail):
  - Check that emails are unique in the database. I’ll also enforce this with a `UNIQUE` constraint directly in the database.
  - Passwords need to be secure:
    - At least one uppercase, one lowercase, a number, a special character, and a minimum length (e.g., 10 characters).
    - No overly common or weak passwords.
  - Emails will be verified for proper formatting during signup.
  - I'll add CAPTCHA enforcement—this will mainly sit as middleware on sensitive routes (e.g., signup and logins after failed attempts).

- **Data Storage**:
  Passwords will be hashed and salted before storing in the database (bcrypt or argon2, probably). Tokens for authentication will be short-lived, and I'll explain how refresh tokens will work below.

---

### CAPTCHA

The system needs simple but effective CAPTCHA functionality to reduce bots. Here’s the logic:
- CAPTCHA challenges last **60 seconds**, after which they expire.
- If solved in **less than 3 seconds**, it’s suspicious and the user will get a new CAPTCHA challenge.
- I’ll use `captcha_pass_tokens` to validate CAPTCHA completions. These tokens will be short-lived and included whenever it's required (like signup).

CAPTCHA challenges will include some basics like distorted text, math problems, or puzzles for variety. These will be server-generated and validated entirely on the backend.

---

### "Remember Me" Functionality

For persistent login, I’ll generate a **refresh token** only if the "remember me" box is checked. This token will be stored in an **HttpOnly, Secure cookie** to prevent tampering or exposure to client-side scripts.

- If "remember me" isn’t checked, only a short-lived access token is issued. The user will need to log in again after it expires.
- If "remember me" is checked, the refresh token allows the user to re-authenticate automatically without logging in repeatedly.

---

### Persistent Login Design

Here’s the plan for handling token-based authentication:
- **Access Token**: Short expiration (let’s say 10–15 mins) and used for most client-server calls.
- **Refresh Token**: Only issued for "remember me." It’ll allow fetching new access tokens without logging in again.

These refresh tokens will be tied to user sessions and revoked upon logout. I plan to store these securely in cookies with proper security flags enabled.

---

### Forgot Password

This will be a simple workflow since I’m intentionally skipping mailing services:
1. The user enters their email, hits "Forgot Password," and the backend verifies if the email exists in the database. 
2. The backend responds with a link (or token) for resetting the password that’s immediately opened in a **new tab**.
3. The user inputs their new password on the reset page. On submission:
   - The server checks password strength and ensures it’s **not the same as the old password**.
   - The password can only be reset **once every 7 days**. The `password_changed_at` timestamp will be used to enforce this.

4. Upon a successful password reset, the user is redirected back to the login page.

---

### Login and Security Handling

Failed login attempts will be tracked, and after **3 incorrect tries**, the user must pass a CAPTCHA. The login API will:
- Validate credentials.
- If correct, generate an access token (and refresh token if "remember me" is checked).
- If incorrect, track the failure count and require reCAPTCHA verification after repeated failures.

For security:
- I’ll rate-limit login attempts per IP/email to prevent brute-force attacks.
- Tokens will expire quickly, ensuring limited exposure.

---

### Testing Plan

I plan to test all key scenarios:
- Validate scenarios like duplicate signup prevention, strong password checks, and incorrect logins triggering CAPTCHA.
- Verify CAPTCHA challenges for timing constraints (e.g., solving too fast or after expiry).
- Test the "Forgot Password" flow, including:
  - 7-day reset lock.
  - Rejection of repeated or weak passwords.

I’ll use Postman to test all backend routes and assess edge cases like expired tokens, invalid CAPTCHA tokens, and rate limits.

---

### Closing Notes

This system is focused on security (to a reasonable extent for practice) while being simple enough to learn the core workflows of authentication. For the frontend, it’s all about providing helpful feedback to the user—for example, error messages if the CAPTCHA fails or if the password reset isn’t allowed due to the 7-day limit. Let me know if there’s anything missing or needs adjustment.