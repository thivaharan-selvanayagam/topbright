import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import AdminSubmissionsClient from "./AdminSubmissionsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchSubmissionsFromStorage() {
  try {
    if (db && (db as any).unitSubmissions) {
      const res = await (db as any).unitSubmissions.all();
      if (Array.isArray(res) && res.length > 0) return res;
    }
  } catch {}

  try {
    const tmpPath = path.join("/tmp", "unitSubmissions.json");
    const content = await fs.readFile(tmpPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}

  try {
    const dataPath = path.join(process.cwd(), "data", "unitSubmissions.json");
    const content = await fs.readFile(dataPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}

  return [];
}

export default async function AdminSubmissionsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [submissions, students, downloads] = await Promise.all([
    fetchSubmissionsFromStorage(),
    db.students.all().catch(() => []),
    db.downloads.all().catch(() => []),
  ]);

  return (
    <AdminSubmissionsClient
      initialSubmissions={submissions}
      students={students}
      downloads={downloads}
    />
  );
}