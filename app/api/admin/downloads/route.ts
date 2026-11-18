import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { DownloadCategory, DownloadItem } from "@/lib/types";

// Force Next.js to execute dynamically on Vercel and disable static route caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const downloads = await db.downloads.all();
    return NextResponse.json(
      { downloads: downloads || [], items: downloads || [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ downloads: [], items: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");
    const categoryStr = String(form.get("category") || "Past Papers");
    const subCategory = form.get("subCategory") ? String(form.get("subCategory")) : undefined;
    const grade = String(form.get("grade") || "All Grades");
    let fileUrl = String(form.get("fileUrl") || "");
    const file = form.get("file") as File | null;

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let fileName: string | undefined = undefined;
    let fileSize: string | undefined = undefined;

    // Handle physical file upload (Works in local dev; catches Vercel read-only disk limitations)
    if (file && file.size > 0) {
      try {
        const bytes = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public", "uploads", "downloads");
        await fs.mkdir(uploadDir, { recursive: true });

        const ext = file.name.split(".").pop() || "pdf";
        const safeName = `${Date.now()}-${nanoid(4)}.${ext}`;
        await fs.writeFile(path.join(uploadDir, safeName), bytes);

        fileUrl = `/uploads/downloads/${safeName}`;
        fileName = file.name;
        fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      } catch (fileErr: any) {
        console.warn("Serverless filesystem is read-only (Vercel EROFS fallback):", fileErr?.message);
        if (!fileUrl) {
          return NextResponse.json(
            {
              error:
                "Direct file saving is restricted on Vercel serverless. Please paste an External Link (Google Drive, OneDrive, etc.).",
            },
            { status: 400 }
          );
        }
      }
    }

    if (!fileUrl) {
      return NextResponse.json(
        { error: "Please provide a file upload or external link." },
        { status: 400 }
      );
    }

    const category = categoryStr as DownloadCategory;

    const newItem: DownloadItem = {
      id: nanoid(8),
      title: title.trim(),
      description: description.trim(),
      category,
      subCategory,
      grade,
      fileUrl: fileUrl.trim(),
      fileName,
      fileSize,
      addedAt: new Date().toISOString().slice(0, 10),
    };

    const downloads = await db.downloads.all();
    downloads.unshift(newItem);
    await db.downloads.save(downloads);

    return NextResponse.json(
      { success: true, item: newItem, download: newItem },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to save download item." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 });
    }

    const downloads = await db.downloads.all();
    const updated = downloads.filter((item) => item.id !== id);
    await db.downloads.save(updated);

    return NextResponse.json({ success: true, ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete download item." },
      { status: 500 }
    );
  }
}