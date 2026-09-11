import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") || "";
  let title = "",
    description = "",
    category = "Model Papers",
    subCategory = "",
    grade = "",
    fileUrl = "",
    fileName = "",
    fileSize = "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    title = String(form.get("title") || "");
    description = String(form.get("description") || "");
    category = String(form.get("category") || form.get("type") || "Model Papers");
    subCategory = String(form.get("subCategory") || "");
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
      fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
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
    category = body.category || body.type || "Model Papers";
    subCategory = body.subCategory || "";
    grade = body.grade;
    fileUrl = body.fileUrl;
    fileName = body.fileName || title;
    fileSize = body.fileSize || "";
  }

  if (!title || !category || !grade || !fileUrl) {
    return NextResponse.json({ error: "Title, category, grade and file/link are required." }, { status: 400 });
  }

  const item: Record<string, any> = {
    id: nanoid(8),
    title,
    description,
    category,
    grade,
    fileUrl,
    fileName,
    addedAt: new Date().toISOString().slice(0, 10),
  };

  if (subCategory && category === "School Exam Papers") {
    item.subCategory = subCategory;
  }
  if (fileSize) {
    item.fileSize = fileSize;
  }

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
  const filtered = downloads.filter((d: any) => d.id !== id);
  await db.downloads.save(filtered);
  return NextResponse.json({ ok: true });
}