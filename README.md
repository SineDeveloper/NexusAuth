# Nexus Auth Template

A clean, modern, and elegant JWT Authentication system for Next.js 15+ (App Router). Designed for Vercel deployment and high performance.

## Features

- **JWT Authentication**: Secure token-based auth using `jose` (Edge-compatible).
- **Elegant Dark UI**: Polished "Recipe 4: Dark Luxury" aesthetic with `Tailwind CSS`.
- **Animations**: Fluid transitions and micro-interactions powered by `motion`.
- **Route Protection**: Next.js Middleware prevents unauthorized access to `/dashboard`, `/profile`, etc.
- **Secure Handling**: Password hashing with `bcryptjs` and HttpOnly cookies for token storage.
- **Form Validation**: Clean error handling and user feedback with `react-hot-toast`.
- **Vercel Ready**: Optimized for serverless and edge environments.

## Architecture

- **/app/api/auth**: Backend routes for Login, Register, and Logout.
- **/lib/auth.ts**: Core JWT logic (encrypt, decrypt, session management).
- **/lib/db.ts**: Simple mock user repository (Ready to be mapped to Prisma/Firebase).
- **/middleware.ts**: Centralized route protection guard.

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
JWT_SECRET=your_strong_secret_key
```

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Visit `http://localhost:3000`

## Production Note

The current `lib/db.ts` uses an in-memory store for demonstration. For production deployment, connect it to a real database (e.g., PostgreSQL via Prisma or Firebase Firestore).
