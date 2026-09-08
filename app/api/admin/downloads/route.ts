import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { DownloadItem } from "@/lib/types";

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") || "";
  let title = "", description = "", type: DownloadItem["type"] = "Other", grade = "", fileUrl = "", fileName = "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    title = String(form.get("title") || "");
    description = String(form.get("description") || "");
    type = (String(form.get("type") || "Other")) as DownloadItem["type"];
    grade = String(form.get("grade") || "");
    const externalUrl = String(form.get("fileUrl") || "");
    const file = form.get("file") as File | null;

    if (file && file.size > 0) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, safeName), bytes);
      fileUrl = `/uploads/${safeName}`;
      fileName = file.name;
    } else if (externalUrl) {
      fileUrl = externalUrl;
      fileName = title;
    } else {
      return NextResponse.json({ error: "Attach a file or paste a link." }, { status: 400 });
    }
  } else {
    const body = await req.json();
    title = body.title;
    description = body.description || "";
    type = body.type || "Other";
    grade = body.grade;
    fileUrl = body.fileUrl;
    fileName = body.fileName || title;
  }

  if (!title || !grade || !fileUrl) {
    return NextResponse.json({ error: "Title, grade and file/link are required." }, { status: 400 });
  }

  const item: DownloadItem = {
    id: nanoid(8),
    title,
    description,
    type,
    grade,
    fileUrl,
    fileName,
    addedAt: new Date().toISOString().slice(0, 10),
  };

  const downloads = await db.downloads.all();
  downloads.unshift(item);
  await db.downloads.save(downloads);

  return NextResponse.json({ item });
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const downloads = await db.downloads.all();
  const filtered = downloads.filter((d) => d.id !== id);
  await db.downloads.save(filtered);
  return NextResponse.json({ ok: true });
}
