# Chat Secrets Configuration

## Vercel (Production Environment)

Set the following environment variables in Vercel dashboard:

- `CHAT_PASS_SALT` - Salt for password hashing
- `CHAT_PASS_HASH` - Hashed password for chat authentication
- `CHAT_FLAG_SECRET` - Secret flag for chat feature

## GitHub Actions

Go to Settings > Secrets and variables > Actions and add:

- `CHAT_PASSWORD` = `Financeflow2025`

This is required for the chat smoke test workflow to pass.
