import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.JWT_SECRET || 'default_secret_key_change_me';
const key = new TextEncoder().encode(secretKey);

export const TOKEN_NAME = 'nexus_auth_token';

/**
 * Payload structure for the JWT
 */
export interface AuthPayload {
  userId: string;
  email: string;
  name?: string;
  expires: number;
}

/**
 * Sign a new JWT token
 */
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

/**
 * Verify and decrypt a JWT token
 */
export async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Get the current session from cookies
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return await decrypt(token);
}

/**
 * Update and extend the session cookie
 */
export async function updateSession(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  if (!token) return null;

  // Decrypt the token to get the payload
  const parsed = await decrypt(token);
  if (!parsed) return null;

  // Refresh the expiration time
  parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const res = NextResponse.next();
  res.cookies.set({
    name: TOKEN_NAME,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}

/**
 * Clear the auth cookie
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, '', { expires: new Date(0) });
}
