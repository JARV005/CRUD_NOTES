# CRUD_NOTES

📄 README.md

# 📝 CrudNote

CrudNote es una aplicación web tipo SPA (Single Page Application) desarrollada con **JavaScript Vanilla**, **Bootstrap 5** y **json-server** como backend simulado. Permite a múltiples usuarios crear, editar, eliminar y compartir notas de forma rápida e intuitiva.

---

## 🔗 Enlace en vivo: fascinating-biscotti-b10df5.netlify.app

## 🚀 Características

- ✅ Registro e inicio de sesión con validación
- ✅ Creación, edición y eliminación de notas
- ✅ Compartir notas con otros usuarios por email o username
- ✅ Permisos personalizados: solo lectura o edición
- ✅ Tema claro/oscuro (opcional)
- ✅ SPA modular con enrutamiento basado en hash (`#`)
- ✅ UI 100% Bootstrap 5, responsive y moderna

---

## 📂 Estructura del proyecto

CrudNote/
│
├── index.html # Página principal SPA (notas, editor, perfil)
├── login.html # Vista de inicio de sesión
├── register.html # Vista de registro de usuarios
├── db.json # Base de datos simulada (usuarios, notas, compartidas)
│
├── router.js # Enrutador por hash
│
├── components/ # Componentes reutilizables
│ ├── Navbar.js
│ ├── NoteCard.js
│ └── ShareForm.js
│
├── views/ # Vistas SPA
│ ├── home.js
│ ├── myNotes.js
│ ├── sharedNotes.js
│ ├── noteEditor.js
│ └── profile.js
│
├── services/ # Comunicación con json-server
│ ├── noteService.js
│ ├── shareService.js
│ └── authService.js
│
└── utils/ # Utilidades generales
├── session.js
├── middleware.js
└── theme.js



---

## 🛠️ Requisitos

- [Node.js](https://nodejs.org/)
- `json-server` instalado globalmente:

```bash
npm install -g json-server
▶️ Cómo ejecutar el proyecto
1. Clona el repositorio o copia los archivos


git clone https://github.com/tu-usuario/crudnote.git
cd crudnote
2. Inicia el servidor json-server

json-server --watch db.json --port 3000
3. Abre login.html o register.html en tu navegador
http://localhost:3000/login.html
🧪 Datos de prueba
db.json ya incluye dos usuarios y una nota:

json
{
  "users": [
    {
      "id": 1,
      "username": "johan",
      "email": "johan@correo.com",
      "password": "123456"
    },
    {
      "id": 2,
      "username": "ana",
      "email": "ana@correo.com",
      "password": "654321"
    }
  ],
  "notes": [
    {
      "id": 1,
      "title": "Plan de proyecto",
      "content": "Organizar entregas y tareas",
      "userId": 1
    }
  ],
  "shared": [
    {
      "id": 1,
      "noteId": 1,
      "sharedWith": 2,
      "permission": "edit"
    }
  ]
}
📌 Funcionalidades clave
Función	Descripción
Crear notas	El usuario puede redactar nuevas notas desde el editor
Editar / Eliminar	Acciones disponibles desde la vista “Mis notas”
Compartir notas	Modal desde cada tarjeta o editor. Se asigna permiso
Ver notas compartidas	Las notas compartidas aparecen con campo de texto habilitado solo si el permiso es "edit"
Ver perfil	Muestra los datos del usuario y a quién ha compartido qué


🧾 Licencia
Este proyecto es de uso educativo y puede ser modificado libremente.

🙌 Autor
Desarrollado por Johan Rivera — 2025





