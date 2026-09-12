import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const submissions = await db.unitSubmissions.all();
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const remainingSubmissions = [];
    let deletedCount = 0;

    for (const sub of submissions) {
      // Use submittedAt (or fallback to expiresAt / uploadedAt for legacy entries)
      const dateString = sub.submittedAt || (sub as any).uploadedAt;
      const submissionTime = dateString ? new Date(dateString).getTime() : Date.now();

      // Check if submission is older than 30 days
      if (submissionTime < thirtyDaysAgo) {
        deletedCount++;
        // Unlink files from public upload directory
        for (const fileUrl of sub.fileUrls || []) {
          try {
            const filePath = path.join(process.cwd(), "public", fileUrl);
            await fs.unlink(filePath);
          } catch {
            // Ignore if file was already removed
          }
        }
      } else {
        remainingSubmissions.push(sub);
      }
    }

    await db.unitSubmissions.save(remainingSubmissions);

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${deletedCount} expired submission(s).`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to cleanup submissions." },
      { status: 500 }
    );
  }
}