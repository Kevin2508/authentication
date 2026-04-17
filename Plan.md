Plan for Login/Signup System


I'll set up both front-end and back-end validation for signups and logins. When a user signs up, they have to enter their email address, password, and complete a CAPTCHA. The backend will check the database and keep a UNIQUE constraint on the email column to make sure that invalid emails are not sent, strong password rules are followed, and duplicate users are not allowed. Only after hashing will passwords be saved.

I will make a CAPTCHA challenge that must be solved in 60 seconds. If it takes less than three seconds to solve, I'll think it's suspicious and make you do a new CAPTCHA. CAPTCHA will always be needed to sign up, and it will also be needed to log in after several failed attempts.

On login, the backend verifies credentials and issues an access token. If the user checks “Remember me”, I’ll also issue a refresh token in a secure cookie to support persistent login. Logout will clear the session.

For “Forgot password”, the user enters their email and gets a reset link that opens in a new tab to set a new password. The backend will only allow a reset once every 7 days, and it will reject the reset if the new password matches the current password, or if it doesn’t meet strength rules. After reset, the user is redirected back to login.

All APIs will be tested in Postman, including edge cases like duplicate signup, weak passwords, CAPTCHA solves, failed logins triggering, and the 7‑day password reset restriction.
