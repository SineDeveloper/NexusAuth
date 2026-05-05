# AI Memory: Nexus Auth

This file captures the context and architectural decisions for this project, enabling other AI agents to continue work seamlessly.

## 🟢 Context & Status
- **Project Name**: Nexus Auth
- **Core Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Motion, Zod.
- **Current Milestone**: Full auth flow with Profile and Settings views implemented. Zod validation active.
- **Design Aesthetic**: "Frosted Glass Dark" — Translucent layers, vibrant background glows, and high-readability typography.

## 🛠 Architectural Decisions
1. **JWT Library**: `jose` used for Edge-compatible middleware.
2. **Validation**: `Zod` implemented in all write-based API routes (Login, Register).
3. **Mock Data**: In-memory store refined. Profile and Settings pages consume session data directly from the JWT payload.
4. **Navigation**: Centralized in `Navbar` with conditional rendering for authenticated states.

## 🔜 Recommended Next Steps
1. **Real Database Integration**: Transition `lib/db.ts` to Prisma or Firebase to persist users across restarts.
2. **MFA Protocol**: Add a mock or real TOTP flow to the Security settings.
3. **Google OAuth**: Implement `lucide-react` icons and `jose` support for third-party providers.
4. **Password Reset**: Build the "Forgot Password" flow with a mock email sender.

## ⚠️ Known Implementation Details
- `JWT_SECRET` is required in `.env`.
- Middleware protects `/dashboard`.
- Layout uses `suppressHydrationWarning` for cleaner hydration with dark theme variables.
- `motion` is imported from `motion/react` as per latest updates.
