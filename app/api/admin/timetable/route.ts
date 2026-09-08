import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { TimetableEntry } from "@/lib/types";

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { day, time, grade, mode, topic } = await req.json();

  if (!day || !time || !grade || !mode || !topic) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const entry: TimetableEntry = { id: nanoid(8), day, time, grade, mode, topic };
  const timetable = await db.timetable.all();
  timetable.push(entry);
  await db.timetable.save(timetable);

  return NextResponse.json({ entry });
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const timetable = await db.timetable.all();
  const filtered = timetable.filter((t) => t.id !== id);
  await db.timetable.save(filtered);
  return NextResponse.json({ ok: true });
}
