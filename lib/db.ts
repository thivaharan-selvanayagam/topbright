import { Redis } from "@upstash/redis";
import fs from "fs/promises";
import path from "path";
import os from "os";

// Detect Redis URL and Token from either UPSTASH_REDIS_REST_* or KV_REST_API_*
const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Initialize Redis if valid credentials exist (ignoring unpopulated local [SENSITIVE] placeholders)
const redis =
  redisUrl && redisToken && !redisToken.includes("[SENSITIVE]")
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

const DATA_DIR = path.join(process.cwd(), "data");

async function readFromLocalFs<T>(file: string): Promise<T | null> {
  const primaryPath = path.join(DATA_DIR, file);
  const tmpPath = path.join(os.tmpdir(), file);

  try {
    const tmpRaw = await fs.readFile(tmpPath, "utf-8");
    return JSON.parse(tmpRaw) as T;
  } catch {
    try {
      const raw = await fs.readFile(primaryPath, "utf-8");
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  // 1. Production / Deployed on Vercel (Upstash / Vercel KV Redis)
  if (redis) {
    try {
      const data = await redis.get<T>(file);
      if (data !== null && data !== undefined) {
        return data;
      }
      // If key doesn't exist in Redis yet, seed it from local JSON files
      const seedData = await readFromLocalFs<T>(file);
      if (seedData !== null) {
        await redis.set(file, seedData);
        return seedData;
      }
      return fallback;
    } catch (err) {
      console.error(`Error reading "${file}" from Redis:`, err);
      return fallback;
    }
  }

  // 2. Local Development Fallback (.json files)
  const localData = await readFromLocalFs<T>(file);
  return localData !== null ? localData : fallback;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  // 1. Production / Deployed on Vercel (Upstash / Vercel KV Redis)
  if (redis) {
    try {
      await redis.set(file, data);
      return;
    } catch (err) {
      console.error(`Error saving "${file}" to Redis:`, err);
    }
  }

  // 2. Local Development Fallback (.json files)
  const primaryPath = path.join(DATA_DIR, file);
  const tmpPath = path.join(os.tmpdir(), file);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(primaryPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err: any) {
    if (err?.code === "EROFS" || err?.code === "EACCES") {
      try {
        await fs.mkdir(path.dirname(tmpPath), { recursive: true });
        await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
      } catch (tmpErr) {
        console.error(`Failed fallback write to ${tmpPath}:`, tmpErr);
      }
    } else {
      console.error(`Error saving ${file}:`, err);
    }
  }
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