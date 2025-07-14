// services/authService.js

const API_URL = 'http://localhost:3000/users';

// Login by username or email + password
export async function login(identifier, password) {
  const res = await fetch(API_URL);
  const users = await res.json();

  return users.find(user =>
    (user.username.toLowerCase() === identifier.toLowerCase() ||
     user.email.toLowerCase() === identifier.toLowerCase()) &&
    user.password === password
  );
}

// Register new user
export async function register(userData) {
  const res = await fetch(API_URL);
  const users = await res.json();

  const exists = users.some(user =>
    user.username === userData.username || user.email === userData.email
  );

  if (exists) {
    throw new Error('Usuario o correo ya en uso');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  return response.json();
}
