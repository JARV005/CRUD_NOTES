// views/home.js
import { getSession } from '../utils/session.js';

export function renderHome() {
  const app = document.getElementById('app-view');
  const user = getSession();

  app.innerHTML = `
    <div class="container py-4">
      <h2 class="fw-bold mb-4">Hola, ${user.username}</h2>

      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a class="nav-link active" href="#home">Todo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#personales">Personales</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#compartidas">Compartidas</a>
        </li>
      </ul>

      <h5 class="fw-semibold mb-3">Mis notas</h5>
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <div class="card-body">
              <h6 class="card-title fw-bold">📌 Crear</h6>
              <p class="card-text text-muted">Crea notas con texto, imágenes, y más.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <div class="card-body">
              <h6 class="card-title fw-bold">👥 Colaborar</h6>
              <p class="card-text text-muted">Comparte tus notas con tu equipo.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <div class="card-body">
              <h6 class="card-title fw-bold">🔒 Privado</h6>
              <p class="card-text text-muted">Solo tú puedes ver tus notas personales.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-end">
        <a href="#editor" class="btn btn-primary">
          <i class="bi bi-plus-lg me-1"></i> Nueva nota
        </a>
      </div>
    </div>
  `;
}
