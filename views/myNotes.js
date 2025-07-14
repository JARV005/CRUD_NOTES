// views/myNotes.js
import { getUserNotes, deleteNote } from '../services/noteService.js';
import { getSession } from '../utils/session.js';
import { renderShareForm } from '../components/ShareForm.js';

export async function renderMyNotes() {
  const app = document.getElementById('app-view');
  const user = getSession();

  app.innerHTML = `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Mis notas</h2>
        <a href="#editor" class="btn btn-primary">
          <i class="bi bi-plus"></i> Nueva nota
        </a>
      </div>
      <div id="notes-list" class="row g-3"></div>
    </div>

    <!-- Modal para compartir -->
    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Compartir nota</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="modal-share-body">
            <!-- Aquí se inserta el ShareForm -->
          </div>
        </div>
      </div>
    </div>
  `;

  const notes = await getUserNotes(user.id);
  const notesList = document.getElementById('notes-list');

  if (notes.length === 0) {
    notesList.innerHTML = `<p class="text-muted">Aún no tienes notas creadas.</p>`;
    return;
  }

  notes.forEach(note => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${note.title}</h5>
            <p class="card-text text-muted">${note.content.slice(0, 100)}...</p>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="#editor?id=${note.id}" class="btn btn-outline-primary btn-sm">Editar</a>
            <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${note.id}">Eliminar</button>
            <button class="btn btn-outline-secondary btn-sm btn-share" data-id="${note.id}" data-bs-toggle="modal" data-bs-target="#shareModal">Compartir</button>
          </div>
        </div>
      </div>
    `;
    notesList.appendChild(col);
  });

  // Eliminar nota
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      await deleteNote(id);
      renderMyNotes();
    });
  });

  // Compartir nota
  document.querySelectorAll('.btn-share').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const noteId = e.target.dataset.id;
      const modalBody = document.getElementById('modal-share-body');
      modalBody.innerHTML = renderShareForm(noteId);
      // Luego de insertar el formulario, enganchar eventos
      attachShareLogic(noteId);
    });
  });
}


function attachShareLogic(noteId) {
  const form = document.getElementById('share-form');
  const msg = document.getElementById('share-msg');
  const user = getSession();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = document.getElementById('share-to').value.trim().toLowerCase();
    const permission = document.getElementById('share-permission').value;

    const res = await fetch('http://localhost:3000/users');
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

    const check = await fetch(`http://localhost:3000/shared?noteId=${noteId}&sharedWith=${receiver.id}`);
    if ((await check.json()).length > 0) {
      msg.innerHTML = `<div class="text-warning">Ya compartiste esta nota con ese usuario.</div>`;
      return;
    }

    const shareData = {
      noteId: parseInt(noteId),
      sharedWith: receiver.id,
      permission
    };

    await fetch('http://localhost:3000/shared', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shareData)
    });

    msg.innerHTML = `<div class="text-success">Nota compartida con <strong>${receiver.username}</strong>.</div>`;
    form.reset();
  });
}
