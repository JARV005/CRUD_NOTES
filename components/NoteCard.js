// components/NoteCard.js
export function renderNoteCard(note, editable = false) {
  const btns = editable ? `
    <div class="mt-2 d-flex gap-2">
      <a href="#editor?id=${note.id}" class="btn btn-sm btn-outline-primary">Editar</a>
      <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${note.id}">Eliminar</button>
    </div>` : '';

  return `
    <div class="col-md-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.content.slice(0, 100)}...</p>
          ${btns}
        </div>
      </div>
    </div>
  `;
}
