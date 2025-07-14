// utils/middleware.js
import { getSession } from './session.js';

// Prevents access to routes if not authenticated
export function requireAuth(callback) {
  const user = getSession();
  if (!user) {
    window.location.href = './login.html';
    return;
  }
  callback(); // Proceed if authenticated
}
