# Arcade Hub

Arcade Hub is a React + Vite mini-game collection.

## Development

This project now includes a lightweight Node backend for authentication and cookie-based session management.

### Run frontend + backend together

```bash
npm run dev:full
```

This starts:
- Vite frontend on `http://localhost:5173`
- Backend API on `http://localhost:4000`

### Run only backend

```bash
npm run server
```

## Auth/session API

The frontend calls these server endpoints (no `localStorage` for auth state anymore):

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/users?search=`
- `POST /api/friends`

User records are stored in `server/data/users.json`, and sessions are tracked server-side with an `HttpOnly` cookie.
