// utils/theme.js

// Apply saved theme on load
function applyTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('bg-dark', theme === 'dark');
  document.body.classList.toggle('text-white', theme === 'dark');
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  applyTheme();
}

// Add event listener to toggle button
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();

  const toggleBtn = document.getElementById('toggle-theme');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
});
