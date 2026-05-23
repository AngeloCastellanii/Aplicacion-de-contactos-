# Agenda de contactos

Aplicación web en React para gestionar contactos con autenticación y persistencia en el navegador.

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Con pnpm:

```bash
pnpm install
pnpm dev
```

Abre la URL que indique la terminal (por defecto `http://localhost:5173`).

## Acceso

| Campo      | Valor      |
| ---------- | ---------- |
| Usuario    | `admin`    |
| Contraseña | `admin123` |

## Funcionalidades

- Inicio de sesión y cierre de sesión
- Listado de contactos guardados en el navegador
- Alta de contactos (número, nombre, apellido, apodos, notas)
- Eliminación de contactos
- Avatar predeterminado cuando no hay foto

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/services/` — lógica de autenticación y contactos
- `src/context/` — estado global de la aplicación
- `src/components/` — interfaz reutilizable
- `src/pages/` — pantallas principales
