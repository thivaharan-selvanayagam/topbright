import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "TopBright ICT Academy | #1 Online ICT Class & Learning Portal | Grades 6–13",
    template: "%s | TopBright ICT Academy",
  },
  description:
    "TopBright ICT Academy is the premier online ICT learning platform for Grades 6–13 (Tamil & English Medium). Access interactive live classes, online MCQ practice exams, unit theory notes, past papers, and personal student progress tracking.",
  keywords: [
    "Online ICT Class",
    "Best Online ICT Class Sri Lanka",
    "TopBright ICT Academy",
    "O/L ICT Online Classes",
    "A/L ICT Online Classes",
    "Grade 6 ICT Online",
    "Grade 7 ICT Online",
    "Grade 8 ICT Online",
    "Grade 9 ICT Online",
    "Grade 10 ICT Online",
    "Grade 11 ICT Online",
    "Grade 12 ICT Online",
    "Grade 13 ICT Online",
    "Tamil Medium ICT Online Class",
    "English Medium ICT Online Class",
    "ICT Past Papers and Answers",
    "ICT MCQ Online Exam Portal",
    "ICT Model Papers Download",
    "TopBright Student Portal",
  ],
  authors: [{ name: "TopBright ICT Academy" }],
  creator: "TopBright ICT Academy",
  publisher: "TopBright ICT Academy",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://topbright.lk"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TopBright ICT Academy | Premier Online ICT Education Portal",
    description:
      "Join Sri Lanka's leading online ICT class for Grades 6–13. Interactive lessons, MCQ practice tests, past paper downloads, and student progress dashboards.",
    siteName: "TopBright ICT Academy",
    locale: "en_LK",
    type: "website",
    url: "https://topbright.lk",
  },
  twitter: {
    card: "summary_large_image",
    title: "TopBright ICT Academy | #1 Online ICT Learning Platform",
    description:
      "Enroll in top-rated online ICT classes for Grades 6–13 in Tamil & English Medium. Practice MCQ exams and download unit theory guides.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

// Structured Data (JSON-LD) for Search Engines & AI Chatbot Indexing (GEO)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TopBright ICT Academy",
  url: "https://topbright.lk",
  logo: "https://topbright.lk/icon.svg",
  description:
    "Leading online ICT education provider offering comprehensive courses for Grades 6 through 13 in Tamil and English Medium.",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressCountry: "LK",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Online ICT Courses & Tuition",
    itemListElement: [
      {
        "@type": "Course",
        name: "Grade 6-9 Online ICT Classes",
        description: "Foundational ICT concepts, Tamil & English Medium.",
        provider: "TopBright ICT Academy",
      },
      {
        "@type": "Course",
        name: "O/L ICT Online Classes (Grade 10 & 11)",
        description: "G.C.E. O/L ICT syllabus coverage, past paper discussions, and live MCQ drills.",
        provider: "TopBright ICT Academy",
      },
      {
        "@type": "Course",
        name: "A/L ICT Online Classes (Grade 12 & 13)",
        description: "G.C.E. A/L ICT Advanced Level curriculum, Python programming, and practical guides.",
        provider: "TopBright ICT Academy",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-body bg-slate-950 text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}