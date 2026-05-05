# AI Memory: Nexus Auth
> **Agent Note:** This project is a Next.js 15+ App Router application with a "Mock-First" development strategy. Use this as your primary context.

## 📁 System Architecture
- **Auth Core**: `lib/auth.ts` -> Uses `jose` for Edge-compatible JWT handling.
- **Middleware**: `middleware.ts` -> Protects `/(dashboard|profile|settings)`.
- **Database Layer**: `lib/db.ts` -> **MOCK**. Uses a global array to persist users between HMR triggers. DO NOT replace with a real DB until explicitly requested.
- **Validation**: `Zod` used in `app/api/auth/*` for safe parsing.

## 🎨 Styling Tokens (Frosted Glass)
- **Background**: `#050505` (Deep Black).
- **Surface**: `bg-white/[0.03]`, `backdrop-blur-2xl`, `border-white/10`.
- **Accents**: 
  - Blue (`blue-600/10` glows, `text-blue-400` highlights).
  - Purple (`purple-600/10` glows, `text-purple-400` settings icons).
  - White (Typography, primary buttons).

## 🚀 Mock Roadmap (Pre-Supabase Phase)
The priority is to build out a complete "simulated" ecosystem before connecting physical infrastructure.

1. **Feature: Mock MFA**
   - **Logic**: Add `mfaEnabled: boolean` to User type.
   - **Flow**: Login -> Redirect to `/verify` -> Check for static code `123456` -> Issue JWT.

2. **Feature: Mock Password Reset**
   - **Logic**: UI flow for `app/forgot-password`.
   - **Terminal**: `console.log` the "Reset Link" instead of sending email.

3. **Feature: Audit Logs**
   - **Logic**: Store a list of `events` in `lib/db.ts`.
   - **Display**: Show "Last login from IP X" on the Profile page.

## 🛑 Final Transition (Supabase)
Only when all UI/UX logic for the above features is finalized will we transition `lib/db.ts` and `lib/auth.ts` to utilize `@supabase/supabase-js`.
