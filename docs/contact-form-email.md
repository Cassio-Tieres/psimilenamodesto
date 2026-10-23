# Contact form email setup

The contact form sends messages through Gmail SMTP from the server. It needs these runtime variables:

- `GMAIL_SMTP_EMAIL`: Gmail account used to authenticate and send. Defaults to `naorespondasites26@gmail.com`.
- `GMAIL_APP_PASSWORD`: Gmail app password. Keep it server-only.
- `CONTACT_EMAIL_TO`: recipient address. Defaults to `psimilenamodesto@gmail.com` if omitted.

For local development, put these variables in `.env.local` in the project root. On Netlify, add them in the site's environment variables settings. Do not use a `VITE_` prefix for these values, and do not commit the local file.

Enable 2-Step Verification for the Gmail account, then create an app password for this integration. POP is not needed for sending; Gmail SMTP uses `smtp.gmail.com` on port `587` with STARTTLS. The form displays a setup message until `GMAIL_APP_PASSWORD` is configured.
