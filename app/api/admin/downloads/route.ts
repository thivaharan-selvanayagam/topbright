import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { DownloadCategory, DownloadItem } from "@/lib/types";

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

    // Handle physical file upload if attached
    if (file && file.size > 0) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads", "downloads");
      await fs.mkdir(uploadDir, { recursive: true });

      const ext = file.name.split(".").pop() || "pdf";
      const safeName = `${Date.now()}-${nanoid(4)}.${ext}`;
      await fs.writeFile(path.join(uploadDir, safeName), bytes);

      fileUrl = `/uploads/downloads/${safeName}`;
      fileName = file.name;
      fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    }

    if (!fileUrl) {
      return NextResponse.json({ error: "Please provide a file upload or external link." }, { status: 400 });
    }

    // Cast string input explicitly to DownloadCategory union type
    const category = categoryStr as DownloadCategory;

    const newItem: DownloadItem = {
      id: nanoid(8),
      title,
      description,
      category,
      subCategory,
      grade,
      fileUrl,
      fileName,
      fileSize,
      addedAt: new Date().toISOString().slice(0, 10),
    };

    const downloads = await db.downloads.all();
    downloads.unshift(newItem);
    await db.downloads.save(downloads);

    return NextResponse.json({ success: true, item: newItem }, { status: 200 });
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

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Item ID required" }, { status: 400 });
  }

  const downloads = await db.downloads.all();
  const updated = downloads.filter((item) => item.id !== id);
  await db.downloads.save(updated);

  return NextResponse.json({ success: true });
}