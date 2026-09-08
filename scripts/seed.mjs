// Run with: npm run seed
// Creates demo student accounts in data/students.json with bcrypt-hashed passwords.
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const demoStudents = [
  { id: "ICT2026001", name: "Nithusha Kumar", grade: "10", mode: "Online", password: "student123" },
  { id: "ICT2026002", name: "Aravind Selvam", grade: "12", mode: "Physical", password: "student123" },
  { id: "ICT2026003", name: "Priya Devan", grade: "7", mode: "Group", password: "student123" },
];

async function main() {
  const students = [];
  for (const s of demoStudents) {
    const passwordHash = await bcrypt.hash(s.password, 10);
    students.push({
      id: s.id,
      name: s.name,
      grade: s.grade,
      mode: s.mode,
      passwordHash,
      createdAt: new Date().toISOString(),
    });
  }

  const filePath = path.join(process.cwd(), "data", "students.json");
  await fs.writeFile(filePath, JSON.stringify(students, null, 2), "utf-8");

  console.log("Seeded students.json with demo accounts:");
  demoStudents.forEach((s) => console.log(`  ${s.id} / ${s.password}`));
}

main();
