# Agenda de contactos

SPA en **React + Vite** para gestionar contactos con autenticación y datos guardados en el navegador (`localStorage` / `sessionStorage`).

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación

```bash
pnpm install
pnpm dev
```

Alternativa con npm:

```bash
npm install
npm run dev
```

Abre la URL de la terminal (por defecto `http://localhost:5173`).

## Acceso demo

| Campo      | Valor      |
| ---------- | ---------- |
| Usuario    | `admin`    |
| Contraseña | `admin123` |

## Funcionalidades

- Login y cierre de sesión (rutas protegidas)
- CRUD de contactos: crear, listar, editar y eliminar
- Campos: número, nombre, apellido, apodos, notas, foto
- Foto con recorte (máx. 400×400 px, 2 MB) y avatar por defecto
- 5 vistas del contacto: List, Compact, Grid, Minimal, Detailed
- Modal de detalle al hacer clic en un contacto
- Preferencia de vista guardada en el navegador
- Búsqueda por nombre, teléfono, apodo o nota
- Ordenar: más recientes, más antiguos, nombre A–Z / Z–A
- PWA instalable con soporte offline básico (tras el primer uso)

## Build de producción

```bash
pnpm build
pnpm preview
```

La carpeta `dist/` se puede desplegar en cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.).

## Estructura del proyecto

```
src/
├── components/   # UI (contactos, layout, modal)
├── config/       # credenciales demo, límites de imagen
├── context/      # auth, contactos, variante de vista
├── hooks/
├── pages/        # login, agenda, edición
├── services/     # auth, contactos, imágenes
└── styles/
```

## Notas

- Las credenciales son solo para demostración; no usar en producción real.
- Los datos viven en el navegador: si borras el almacenamiento local, se pierden los contactos.

## Repositorio

https://github.com/AngeloCastellanii/Aplicacion-de-contactos-
