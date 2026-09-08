import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAMES.STUDENT_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
