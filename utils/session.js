// utils/session.js

// Save session data to sessionStorage
export function setSession(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

// Get current session user
export function getSession() {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Clear session completely
export function clearSession() {
  sessionStorage.removeItem('user');
}
