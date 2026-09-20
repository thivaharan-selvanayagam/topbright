export function calculateFee(grade: string, medium: string): number {
  let baseFee = 500;
  const cleanGrade = String(grade || "").toLowerCase().replace("grade", "").trim();
  const gNum = parseInt(cleanGrade, 10);

  if (gNum >= 6 && gNum <= 9) {
    baseFee = 400;
  } else if (gNum >= 10 && gNum <= 11) {
    baseFee = 500;
  } else if (gNum >= 12 && gNum <= 13) {
    baseFee = 700;
  }

  // Add LKR 100 surcharge for English medium classes
  if (String(medium).toLowerCase() === "english") {
    baseFee += 100;
  }

  return baseFee;
}