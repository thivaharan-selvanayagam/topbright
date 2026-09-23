import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Bypasses static caching on Vercel so updates show up immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const timetable = await db.timetable.all();
    return NextResponse.json(
      { timetable: timetable || [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ timetable: [] }, { status: 200 });
  }
}