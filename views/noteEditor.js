// views/noteEditor.js
import { createNote, getNoteById, updateNote } from '../services/noteService.js';
import { getSession } from '../utils/session.js';
import { renderShareForm } from '../components/ShareForm.js';

const API_URL = 'https://crud-notas-jsonserver.onrender.com';

export async function renderNoteEditor() {
  const app = document.getElementById('app-view');
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const noteId = params.get('id');

  const user = getSession();
  let note = { title: '', content: '' };

  if (noteId) {
    note = await getNoteById(noteId);
    if (!note || note.userId !== user.id) {
      app.innerHTML = `<div class="alert alert-danger">Nota no encontrada o sin permisos.</div>`;
      return;
    }
  }

  app.innerHTML = `
    <div class="container py-4">
      <h2 class="fw-bold mb-4">${noteId ? 'Editar nota' : 'Nueva nota'}</h2>
      <form id="note-form" class="mb-4">
        <div class="mb-3">
          <input type="text" id="title" class="form-control form-control-lg" placeholder="Título de la nota" value="${note.title}" required />
        </div>
        <div class="mb-3">
          <textarea id="content" class="form-control" rows="8" placeholder="Contenido de la nota..." required>${note.content}</textarea>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
          ${noteId ? `<button type="button" class="btn btn-secondary" id="btn-share">Compartir nota</button>` : ''}
        </div>
      </form>
      <div id="share-form-container"></div>
    </div>
  `;

  // Guardar nota
  document.getElementById('note-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newNote = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      userId: user.id
    };

    if (noteId) {
      await updateNote(noteId, newNote);
    } else {
      await createNote(newNote);
    }

    window.location.hash = '#personales';
  });

  // Compartir
  if (noteId) {
    const btnShare = document.getElementById('btn-share');
    const shareContainer = document.getElementById('share-form-container');

    btnShare.addEventListener('click', () => {
      shareContainer.innerHTML = renderShareForm(noteId);

      const form = document.getElementById('share-form');
      const msg = document.getElementById('share-msg');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = getSession();
        const target = document.getElementById('share-to').value.trim().toLowerCase();
        const permission = document.getElementById('share-permission').value;

        const res = await fetch(`${API_URL}/users`);
        const users = await res.json();
        const receiver = users.find(u =>
          u.email.toLowerCase() === target || u.username.toLowerCase() === target
        );

        if (!receiver) {
          msg.innerHTML = `<div class="text-danger">Usuario no encontrado.</div>`;
          return;
        }

        if (receiver.id === user.id) {
          msg.innerHTML = `<div class="text-danger">No puedes compartir contigo mismo.</div>`;
          return;
        }

        const check = await fetch(`${API_URL}/shared?noteId=${noteId}&sharedWith=${receiver.id}`);
        if ((await check.json()).length > 0) {
          msg.innerHTML = `<div class="text-warning">Ya compartiste esta nota con ese usuario.</div>`;
          return;
        }

        const shareData = {
          noteId: parseInt(noteId),
          sharedWith: receiver.id,
          permission
        };

        await fetch(`${API_URL}/shared`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shareData)
        });

        msg.innerHTML = `<div class="text-success">Nota compartida con <strong>${receiver.username}</strong>.</div>`;
        form.reset();
      });
    });
  }
}
