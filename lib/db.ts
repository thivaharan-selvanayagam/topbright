import fs from "fs/promises";
import path from "path";
import os from "os";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const primaryPath = path.join(DATA_DIR, file);
  const tmpPath = path.join(os.tmpdir(), file);

  try {
    // Attempt reading from temporary storage first (for updated serverless instances)
    try {
      const tmpRaw = await fs.readFile(tmpPath, "utf-8");
      return JSON.parse(tmpRaw) as T;
    } catch {
      const raw = await fs.readFile(primaryPath, "utf-8");
      return JSON.parse(raw) as T;
    }
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  const primaryPath = path.join(DATA_DIR, file);
  const tmpPath = path.join(os.tmpdir(), file);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(primaryPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err: any) {
    // Catch read-only filesystem errors on Vercel / serverless deployments
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