// components/ShareForm.js
export function renderShareForm(noteId) {
  return `
    <div class="card mt-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">Compartir esta nota</h5>
        <form id="share-form" data-note-id="${noteId}">
          <div class="mb-3">
            <label for="share-to" class="form-label">Usuario o correo</label>
            <input type="text" id="share-to" class="form-control" placeholder="ej: ana@correo.com" required />
          </div>
          <div class="mb-3">
            <label for="share-permission" class="form-label">Permiso</label>
            <select id="share-permission" class="form-select">
              <option value="read">Solo lectura</option>
              <option value="edit">Lectura y edición</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Compartir</button>
          <div id="share-msg" class="mt-3"></div>
        </form>
      </div>
    </div>
  `;
}
