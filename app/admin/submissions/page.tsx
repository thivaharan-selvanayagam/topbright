import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import AdminSubmissionsClient from "./AdminSubmissionsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSubmissionsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [submissions, students, downloads] = await Promise.all([
    db.unitSubmissions.all().catch(() => []),
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