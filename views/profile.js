// views/profile.js
import { getSession } from '../utils/session.js';

export async function renderProfile() {
  const app = document.getElementById('app-view');
  const user = getSession();

  const [notesRes, sharedRes, usersRes] = await Promise.all([
    fetch(`http://localhost:3000/notes?userId=${user.id}`),
    fetch(`http://localhost:3000/shared`),
    fetch(`http://localhost:3000/users`)
  ]);

  const notes = await notesRes.json();
  const shared = await sharedRes.json();
  const users = await usersRes.json();

  // Filtrar notas compartidas por el usuario actual
  const sharedByMe = shared.filter(s => notes.find(n => n.id === s.noteId));

  app.innerHTML = `
    <div class="container py-4">
      <h2 class="fw-bold mb-4">Mi perfil</h2>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Información de cuenta</h5>
          <p><strong>Usuario:</strong> ${user.username}</p>
          <p><strong>Correo:</strong> ${user.email}</p>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3">Notas compartidas por mí</h5>
          ${sharedByMe.length === 0 ? `
            <p class="text-muted">Aún no has compartido ninguna nota.</p>
          ` : `
            <ul class="list-group list-group-flush">
              ${sharedByMe.map(s => {
                const receptor = users.find(u => u.id === s.sharedWith);
                const nota = notes.find(n => n.id === s.noteId);
                return `
                  <li class="list-group-item">
                    <strong>${nota.title}</strong><br>
                    Compartida con: ${receptor.username} (${receptor.email})<br>
                    Permiso: ${s.permission === 'edit' ? 'Lectura y edición' : 'Solo lectura'}
                  </li>
                `;
              }).join('')}
            </ul>
          `}
        </div>
      </div>
    </div>
  `;
}
