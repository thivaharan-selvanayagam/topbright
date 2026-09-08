import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ loggedIn: getAdminSession() });
}
