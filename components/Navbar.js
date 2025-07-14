// components/Navbar.js
import { getSession, clearSession } from '../utils/session.js';

function renderNavbar() {
  const user = getSession();
  const navbarContainer = document.getElementById('navbar-container');

  if (!user) {
    navbarContainer.innerHTML = '';
    return;
  }

  navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">CrudNote</a>
        <div class="d-flex align-items-center gap-3">
          <a href="#personales" class="nav-link text-dark">Mis notas</a>
          <a href="#compartidas" class="nav-link text-dark">Notas compartidas</a>
          <a href="#perfil" class="nav-link text-dark">Perfil</a>
          <button id="logout-btn" class="btn btn-outline-dark btn-sm">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  `;

  document.getElementById('logout-btn').addEventListener('click', () => {
    clearSession();
    window.location.href = './login.html';
  });
}

window.addEventListener('DOMContentLoaded', renderNavbar);
window.addEventListener('hashchange', renderNavbar);
