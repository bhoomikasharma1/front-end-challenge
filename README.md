![Logo](./public/FFFFFF-1.png)

# Slooze Take Home Challenge - Frontend

This repository contains a complete **Commodities Management frontend implementation** using **Next.js + TypeScript + Tailwind-ready setup** with role-based UI/route access, login flow, dashboard restrictions, products management, and theme switching.

## Implemented Features

### 1) Authentication & Access
- Login form with email/password validation
- Mock `POST /auth/login` behavior on frontend
- Session persisted in `localStorage`
- RBAC enforced for route access

### 2) Core UI Features
- **Dashboard** (Manager only)
- **View Products** (Manager + Store Keeper)
- **Add/Edit Products** (implemented for both roles as per table)

### 3) UI Enhancements
- Light/Dark mode with `localStorage` persistence
- Frontend role-based menu restrictions
- Guarded routes for unauthorized access

## Role Access Matrix

| Feature | Manager | Store Keeper |
|---|---|---|
| Login | Yes | Yes |
| Dashboard | Yes | No |
| View Products | Yes | Yes |
| Add/Edit Products | Yes | Yes |
| Role-Based UI | Yes | Yes |

## Demo Credentials
- Manager: `manager@slooze.xyz` / `manager123`
- Store Keeper: `store@slooze.xyz` / `store123`

## Assumptions
- Backend APIs are mocked client-side to keep the submission runnable as a standalone frontend.
- Product data starts with sample in-memory data and is editable during the active session.
- Route guards and menu restrictions are implemented on frontend (as requested).

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS (configured)
- RBAC via role-aware context + guards

## Run Locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

## Key Routes
- `/login`
- `/dashboard` (Manager only)
- `/products` (Manager + Store Keeper)

## Submission Notes
If needed, this can be pushed directly to GitHub and deployed to Vercel as-is.