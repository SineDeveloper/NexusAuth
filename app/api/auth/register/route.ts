import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, addUser } from '@/lib/db';
import { encrypt, TOKEN_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      email,
      passwordHash,
      name,
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
    const sessionToken = await encrypt({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      expires,
    });

    // Set cookie
    const response = NextResponse.json(
      { message: 'User registered successfully', user: { email, name } },
      { status: 201 }
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
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
