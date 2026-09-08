import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me-in-env";
const STUDENT_COOKIE = "lict_student";
const ADMIN_COOKIE = "lict_admin";

export type StudentSession = { studentId: string; name: string };

export function signStudentToken(payload: StudentSession) {
  return jwt.sign(payload, SECRET, { expiresIn: "8h" });
}

export function verifyStudentToken(token: string): StudentSession | null {
  try {
    return jwt.verify(token, SECRET) as StudentSession;
  } catch {
    return null;
  }
}

export function getStudentSession(): StudentSession | null {
  const token = cookies().get(STUDENT_COOKIE)?.value;
  if (!token) return null;
  return verifyStudentToken(token);
}

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "8h" });
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, SECRET) as { role: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export function getAdminSession(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export const COOKIE_NAMES = { STUDENT_COOKIE, ADMIN_COOKIE };
