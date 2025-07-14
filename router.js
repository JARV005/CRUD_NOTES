// router.js
import { requireAuth } from './utils/middleware.js';
import { renderHome } from './views/home.js';
import { renderNoteEditor } from './views/noteEditor.js';
import { renderSharedNotes } from './views/sharedNotes.js';
import { renderMyNotes } from './views/myNotes.js';
import { renderProfile } from './views/profile.js';

// Handle routing by hash changes
const routes = {
  home: renderHome,
  editor: renderNoteEditor,
  compartidas: renderSharedNotes,
  personales: renderMyNotes,
  perfil: renderProfile
};

// Load route based on current hash
function loadRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const view = routes[hash];

  if (!view) {
    document.getElementById('app-view').innerHTML = `<div class="alert alert-danger">Ruta no encontrada</div>`;
    return;
  }

  // Enforce authentication before accessing any route
  requireAuth(() => {
    view();
  });
}

// Listen for hash changes
window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
