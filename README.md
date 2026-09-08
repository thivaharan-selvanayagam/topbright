# Lavanya ICT Classes — Website

A Next.js 14 website for Lavanya's ICT classes (Grade 6–12, Batticaloa): landing page, about,
timetable, downloads, videos, contact, student login, online exams with instant marking, and a
simple admin panel — plus a WhatsApp button on every page.

## What's included

- **Public pages:** Home, About, Timetable, Downloads, Videos, Contact
- **Student accounts:** unique Student ID + password, JWT session cookies
- **Online exams:** multiple-choice, timed, auto-graded the instant a student submits, with the
  score saved permanently against their Student ID and visible on their dashboard
- **Admin panel** (`/admin`, password-protected): add/remove students, create & publish exams,
  add YouTube videos, add downloadable papers/books/tutes (upload a file or paste a link), and
  edit the timetable
- **WhatsApp button** fixed to the bottom-right corner on every page, pre-filled with a greeting
  message, linking to **071 431 6092**

## 1. Run it locally

You need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
cp .env.example .env.local     # then edit .env.local, see below
npm run seed                   # creates 3 demo student logins
npm run dev
```

Open http://localhost:3000

**Demo student logins** (created by `npm run seed`):

| Student ID  | Password    |
|-------------|-------------|
| ICT2026001  | student123  |
| ICT2026002  | student123  |
| ICT2026003  | student123  |

**Admin login:** go to `/admin/login` and use the password set in `ADMIN_PASSWORD` (see below).

### Environment variables (`.env.local`)

```
AUTH_SECRET=change-this-to-a-long-random-string
ADMIN_PASSWORD=changeme123
```

Change both before putting this online. `AUTH_SECRET` can be any long random string (used to
sign login sessions). `ADMIN_PASSWORD` is what Lavanya types in at `/admin/login`.

## 2. Editing the starter content

Everything the site ships with — sample videos, sample papers, the timetable, the two demo
exams — lives in the `data/` folder as plain JSON files. You can either:

- Edit those JSON files directly (safe, simple, and works great before launch), **or**
- Use the `/admin` panel once the site is running (see the note about Vercel below).

Real student accounts should be added either by running a variation of `scripts/seed.mjs`, or
through the admin panel's **Students** tab.

## 3. Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import that repository.
3. Under **Environment Variables**, add `AUTH_SECRET` and `ADMIN_PASSWORD` (same as your
   `.env.local`, but use a fresh random `AUTH_SECRET` for production).
4. Deploy. Vercel auto-detects Next.js — no extra build settings are needed.

### ⚠️ Important: Vercel's filesystem is read-only in production

This project stores data (students, exam results, videos, downloads, timetable) in JSON files
under `data/`, read and written with plain Node `fs` calls. That's simple and works perfectly:

- when running locally (`npm run dev` / `npm start`), and
- when self-hosted on any server that keeps its disk between requests (a VPS, Railway, Render,
  etc).

**On Vercel specifically**, each request can run on a fresh, temporary serverless instance whose
filesystem is **read-only** outside of `/tmp`, and `/tmp` isn't shared between requests. In
practice this means:

- New student logins added via the admin panel may work in that moment but **won't reliably be
  there** the next time someone logs in.
- Exam results a student submits may not reliably be saved for the teacher to see later.
- New videos/downloads/timetable entries added via `/admin` won't show on the public pages
  anyway, since those pages read a bundled copy of the JSON at build time — they need a
  redeploy either way.

**This is fine for a demo, a portfolio preview, or content that only changes by editing the
JSON files and redeploying.** For a live class where students will actually log in and sit
exams, upgrade the data layer to a real database before relying on it:

- **Easiest:** [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or
  [Supabase](https://supabase.com) (both have a free tier)
- Swap the functions in `lib/db.ts` to read/write that database instead of JSON files — the
  rest of the app (API routes, pages) doesn't need to change, since everything already goes
  through `lib/db.ts`.
- For file uploads (past papers, books), use a storage bucket such as
  [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), Supabase Storage, or Google
  Drive/Dropbox links pasted into the admin panel (already supported — see the "paste a link"
  option in **Downloads**).

If you'd like, this can be wired up for you — it's a fairly small change since `lib/db.ts` is
the single place all data reads/writes go through.

## 4. Project structure

```
app/                 Pages (App Router) and API routes
  admin/              Admin login + panel
  api/                 All backend endpoints (auth, exams, admin CRUD)
  dashboard/          Student dashboard (available exams + past results)
  exam/[id]/          Timed exam-taking page with instant grading
  login/              Student login
  <page>/             about, timetable, downloads, videos, contact
components/          Navbar, Footer, WhatsAppButton, page-specific UI
lib/                 db.ts (data layer), auth.ts (sessions), types.ts
data/                JSON "database" — students, exams, results, videos, downloads, timetable
scripts/seed.mjs    Creates demo student logins with hashed passwords
```

## 5. Customising

- **Contact details / WhatsApp number:** `data/settings.json`
- **Colours and fonts:** `tailwind.config.ts` and `app/layout.tsx`
- **Site title/description:** `app/layout.tsx` → `metadata`
- **Demo student accounts:** `scripts/seed.mjs`

## 6. A note on security

- Student and admin passwords are hashed with bcrypt before being stored — never stored in
  plain text.
- Sessions are signed JWTs stored in `httpOnly` cookies (not readable by page JavaScript).
- Before going live, set a strong, random `AUTH_SECRET` and a strong `ADMIN_PASSWORD` in your
  Vercel environment variables (not the defaults in `.env.example`).
