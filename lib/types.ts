export type Student = {
  id: string; // e.g. ICT2026001, used as login username
  name: string;
  grade: string; // "6" - "13"
  mode: "Online" | "Physical" | "One-to-One" | "Group";
  phone?: string;
  passwordHash: string;
  createdAt: string;
};

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  marks: number;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  grade: string;
  durationMinutes: number;
  published: boolean;
  questions: Question[];
  createdAt: string;
};

export type Result = {
  id: string;
  studentId: string;
  studentName: string;
  examId: string;
  examTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  answers: Record<string, number>;
  submittedAt: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  grade: string;
  category: string;
  addedAt: string;
};

export type DownloadCategory =
  | "Past Papers"
  | "Model Papers"
  | "School Exam Papers"
  | "Books"
  | "Unit Exams"
  | "Unit Notes";

export type DownloadItem = {
  id: string;
  title: string;
  description?: string;
  category: DownloadCategory;
  subCategory?: "Term 1" | "Term 2" | "Term 3" | string;
  grade: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  addedAt?: string;
};

export type UnitExamSubmission = {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  grade: string;
  fileUrls: string[]; // Multi-image or PDF answer sheet uploads
  submittedAt: string;
  expiresAt: string; // Auto-calculated 30-day expiration date
};

export type TimetableEntry = {
  id: string;
  day: string;
  time: string;
  grade: string;
  mode: "Online" | "Physical" | "One-to-One" | "Group";
  topic: string;
};

export type Settings = {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  facebook?: string;
  youtube?: string;
};