// views/sharedNotes.js
import { getSharedNotes, updateNote } from '../services/shareService.js';
import { getSession } from '../utils/session.js';

export async function renderSharedNotes() {
  const app = document.getElementById('app-view');
  const user = getSession();

  app.innerHTML = `
    <div class="container py-4">
      <h2 class="fw-bold mb-4">Notas compartidas conmigo</h2>
      <div id="shared-list" class="row g-3"></div>
    </div>
  `;

  const notes = await getSharedNotes(user.id);
  const container = document.getElementById('shared-list');

  if (notes.length === 0) {
    container.innerHTML = `<p class="text-muted">No tienes notas compartidas todavía.</p>`;
    return;
  }

  notes.forEach(note => {
    const editable = note.permission === 'edit';

    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${note.title}</h5>
          <textarea class="form-control mb-2 flex-grow-1" rows="5" ${editable ? '' : 'readonly'}>${note.content}</textarea>
          <small class="text-muted">Permiso: ${note.permission === 'edit' ? 'Lectura y edición' : 'Solo lectura'}</small>
          ${editable ? '<button class="btn btn-sm btn-primary mt-2 btn-save">Guardar cambios</button>' : ''}
        </div>
      </div>
    `;

    if (editable) {
      const btn = col.querySelector('.btn-save');
      const textarea = col.querySelector('textarea');

      btn.addEventListener('click', async () => {
        const updated = { ...note, content: textarea.value };
        await updateNote(note.id, updated);
        alert('Nota actualizada.');
      });
    }

    container.appendChild(col);
  });
}
