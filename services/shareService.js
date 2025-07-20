// services/shareService.js
const BASE_URL = 'https://crudnote-api.onrender.com';
import { getNoteById, updateNote as updateOriginalNote } from './noteService.js';

// Get notes shared with this user
export async function getSharedNotes(userId) {
  const sharedRes = await fetch(`${BASE_URL}/shared?sharedWith=${userId}`);
  const sharedLinks = await sharedRes.json();

  const sharedNotes = [];

  for (const link of sharedLinks) {
    const note = await getNoteById(link.noteId);
    sharedNotes.push({
      ...note,
      permission: link.permission
    });
  }

  return sharedNotes;
}

// Update shared note content if permitted
export async function updateNote(noteId, updatedNote) {
  return updateOriginalNote(noteId, updatedNote);
}
