// services/noteService.js
const API_URL = 'http://localhost:3000/notes';

// Get notes created by the current user
export async function getUserNotes(userId) {
  const res = await fetch(`${API_URL}?userId=${userId}`);
  return res.json();
}

// Get a single note by ID
export async function getNoteById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Create new note
export async function createNote(note) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
  return res.json();
}

// Update existing note
export async function updateNote(id, updatedNote) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote)
  });
  return res.json();
}

// Delete note
export async function deleteNote(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
