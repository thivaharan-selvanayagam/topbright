import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Bypasses static caching on Vercel so newly published videos appear immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const videos = await db.videos.all();
    return NextResponse.json(
      { videos: videos || [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}