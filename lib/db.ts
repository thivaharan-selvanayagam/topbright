import fs from "fs/promises";
import path from "path";

/**
 * Lightweight JSON-file "database".
 *
 * This is intentionally simple so the whole site works out of the box with
 * zero external services. It is perfect for local development and for
 * hosting on a persistent Node server (e.g. a VPS, Render, Railway).
 *
 * IMPORTANT — Vercel note:
 * Vercel's serverless functions have a READ-ONLY filesystem in production
 * (writes only survive for the lifetime of a single request and are not
 * shared between invocations). That means new student registrations, exam
 * submissions, and admin edits made through the live Vercel site will NOT
 * persist reliably once you have real traffic.
 *
 * For production on Vercel, swap the read/write functions below for a real
 * database — the easiest options are:
 *   - Vercel Postgres (https://vercel.com/docs/storage/vercel-postgres)
 *   - Supabase (free Postgres, https://supabase.com)
 *   - Turso / PlanetScale (MySQL/SQLite compatible)
 * A starter Prisma schema mirroring these JSON shapes is included in
 * prisma/schema.prisma — see README.md "Going to production" section.
 */

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, file);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  students: {
    all: () => readJson<import("./types").Student[]>("students.json", []),
    save: (data: import("./types").Student[]) => writeJson("students.json", data),
  },
  exams: {
    all: () => readJson<import("./types").Exam[]>("exams.json", []),
    save: (data: import("./types").Exam[]) => writeJson("exams.json", data),
  },
  results: {
    all: () => readJson<import("./types").Result[]>("results.json", []),
    save: (data: import("./types").Result[]) => writeJson("results.json", data),
  },
  videos: {
    all: () => readJson<import("./types").Video[]>("videos.json", []),
    save: (data: import("./types").Video[]) => writeJson("videos.json", data),
  },
  downloads: {
    all: () => readJson<import("./types").DownloadItem[]>("downloads.json", []),
    save: (data: import("./types").DownloadItem[]) => writeJson("downloads.json", data),
  },
  timetable: {
    all: () => readJson<import("./types").TimetableEntry[]>("timetable.json", []),
    save: (data: import("./types").TimetableEntry[]) => writeJson("timetable.json", data),
  },
  unitSubmissions: {
    all: () => readJson<import("./types").UnitExamSubmission[]>("unitSubmissions.json", []),
    save: (data: import("./types").UnitExamSubmission[]) => writeJson("unitSubmissions.json", data),
  },
  settings: {
    get: () => readJson<import("./types").Settings>("settings.json", {} as import("./types").Settings),
    save: (data: import("./types").Settings) => writeJson("settings.json", data),
  },
};