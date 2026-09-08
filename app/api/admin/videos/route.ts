import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { Video } from "@/lib/types";

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) return m[1];
  }
  // Assume it's already a raw video ID
  return trimmed;
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, url, grade, category } = await req.json();

  if (!title || !url || !grade) {
    return NextResponse.json({ error: "Title, YouTube link and grade are required." }, { status: 400 });
  }

  const video: Video = {
    id: nanoid(8),
    title,
    description: description || "",
    youtubeId: extractYoutubeId(url),
    grade,
    category: category || "General",
    addedAt: new Date().toISOString().slice(0, 10),
  };

  const videos = await db.videos.all();
  videos.unshift(video);
  await db.videos.save(videos);

  return NextResponse.json({ video });
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const videos = await db.videos.all();
  const filtered = videos.filter((v) => v.id !== id);
  await db.videos.save(filtered);
  return NextResponse.json({ ok: true });
}
