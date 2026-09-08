import { NextResponse } from "next/server";
import { getStudentSession } from "@/lib/auth";

export async function GET() {
  const session = getStudentSession();
  if (!session) {
    return NextResponse.json({ loggedIn: false });
  }
  return NextResponse.json({ loggedIn: true, studentId: session.studentId, name: session.name });
}
