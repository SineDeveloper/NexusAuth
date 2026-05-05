/**
 * MOCK DATABASE
 * NOTE: In a real application, you should use a database like PostgreSQL, MongoDB, or Firebase.
 * This in-memory store will reset whenever the server restarts or on different serverless instances.
 */

// Simple user store
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

// Global variable to persist (mostly) during dev. Vercel will reset this.
const globalForUsers = global as unknown as { users: User[] };

if (!globalForUsers.users) {
  globalForUsers.users = [];
}

export const users = globalForUsers.users;

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: User) {
  users.push(user);
}
