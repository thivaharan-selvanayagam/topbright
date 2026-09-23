import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { TimetableEntry } from "@/lib/types";

// Force Next.js to execute dynamically on Vercel and disable static route caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { day, time, grade, mode, topic } = await req.json();

    if (!day || !time || !grade || !mode || !topic) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const entry: TimetableEntry = {
      id: nanoid(8),
      day,
      time,
      grade,
      mode,
      topic,
    };

    const timetable = await db.timetable.all();
    timetable.push(entry);
    await db.timetable.save(timetable);

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to save timetable slot." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const timetable = await db.timetable.all();
    const filtered = timetable.filter((t) => t.id !== id);
    await db.timetable.save(filtered);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete slot." },
      { status: 500 }
    );
  }
}