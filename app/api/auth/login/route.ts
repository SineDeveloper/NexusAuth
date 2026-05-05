import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { findUserByEmail } from '@/lib/db';
import { encrypt, TOKEN_NAME } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const sessionToken = await encrypt({
      userId: user.id,
      email: user.email,
      name: user.name,
      expires,
    });

    const response = NextResponse.json(
      { message: 'Logged in successfully', user: { email: user.email, name: user.name } },
      { status: 200 }
    );

    response.cookies.set({
      name: TOKEN_NAME,
      value: sessionToken,
      httpOnly: true,
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
