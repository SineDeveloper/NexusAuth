# AI Memory: Nexus Auth

This file captures the context and architectural decisions for this project, enabling other AI agents to continue work seamlessly.

## 🟢 Context & Status
- **Project Name**: Nexus Auth
- **Core Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Motion.
- **Current Milestone**: Basic JWT Auth flow implemented (Register, Login, Logout, Middleware).
- **Design Aesthetic**: "Elegant Dark Luxury" — High contrast, minimal, tracking-tight typography, and glassmorphism.

## 🛠 Architectural Decisions
1. **JWT Library**: Used `jose` instead of `jsonwebtoken` because `jose` is compatible with the Next.js Edge Runtime (required for Middleware on Vercel).
2. **Auth Strategy**: Stateless session stored in a `httpOnly` cookie named `nexus_auth_token`.
3. **Database**: Implemented a mock in-memory layer in `lib/db.ts` to allow immediate testing. It handles user searching and addition.

## 🔜 Recommended Next Steps
1. **Database Integration**: Replace `lib/db.ts` with a real DB (Prisma + Postgres or Firebase).
2. **Persistence**: The mock DB resets on rebuilds/restarts. Users need to re-register.
3. **Validation**: Use `zod` in API routes for stricter input validation.
4. **MFA**: Add multi-factor authentication or Google OAuth as a secondary path.
5. **Profile Page**: Create `/profile` to allow users to update their information.

## ⚠️ Known Implementation Details
- `JWT_SECRET` is required in `.env`.
- Middleware protects `/dashboard`.
- Layout uses `suppressHydrationWarning` for cleaner hydration with dark theme variables.
- `motion` is imported from `motion/react` as per latest updates.
