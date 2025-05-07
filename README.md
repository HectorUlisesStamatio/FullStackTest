# Sistema de Administración de Proveedores (FullStack)

Este proyecto es una aplicación FullStack que permite administrar proveedores mediante operaciones CRUD.  
Incluye una API desarrollada en **Node.js con Express (ES6)** y un frontend en **React + Vite + Redux Toolkit + Material UI**.

---

## 🧩 Tecnologías Utilizadas

### Backend
- Node.js v18+
- Express.js
- UUID
- JSDoc
- FileSystem para persistencia simulada (`bd.json`)

### Frontend
- React 18+
- Vite
- Redux Toolkit
- Material UI
- FontAwesome
- SweetAlert2
- JSDoc

---

## 🚀 Instalación y ejecución

### 🔧 Backend

```bash
cd server
npm install
npm run dev
```

El backend se ejecutará en `http://localhost:3001`.

#### Endpoints disponibles:
- `GET /providers` - Obtener todos los proveedores
- `POST /providers` - Agregar proveedor
- `PUT /providers/:name` - Modificar proveedor
- `DELETE /providers/:name` - Eliminar proveedor
- `GET /info` - Información general
- `GET /version` - Versión del sistema

> 📁 La base de datos simulada se almacena en `bd.json`.

---

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:5173`.

> La app se conecta automáticamente a `http://localhost:3001` para consumir la API.

---

## 📦 Estructura del Proyecto

```
├── client/                # Frontend React
│   ├── api/               # Configuración de axios
│   ├── app/               # Redux store
│   ├── components/        # Tabla y formulario
│   ├── features/          # Slice de Redux
│   ├── pages/             # Página principal
│   ├── App.jsx
│   └── main.jsx
│
├── server/                # Backend Node + Express
│   ├── controllers/       # Controladores Express
│   ├── middleware/        # Logger + UUID
│   ├── routes/            # Rutas Express
│   ├── services/          # Lógica de negocio
│   ├── bd.json            # Base de datos simulada
│   └── app.js             # Entry point
```

---

## ⚒️ Funcionalidades

- 🔍 Listado con paginación
- ➕ Alta de proveedor
- 🗑️ Eliminación con confirmación
- 🖨️ Botón para imprimir
- 🎨 Interfaz responsiva y amigable
- 🧾 Comentarios JSDoc en todo el código

---

## 🛡️ Seguridad

- Middleware de CORS configurado con origen seguro
- UUID por transacción para trazabilidad en logs
- Validaciones y mensajes de error amigables

---
