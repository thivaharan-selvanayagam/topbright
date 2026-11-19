import { NextResponse } from "next/server";

export async function GET() {
  const host = "topbright.lk";
  const key = "4b8f1c29e67d4a15a9e382d5610b7c4a";
  const keyLocation = `https://${host}/${key}.txt`;
  const urlList = [
    `https://${host}/`,
    `https://${host}/about`,
    `https://${host}/contact`,
    `https://${host}/timetable`,
    `https://${host}/downloads`,
    `https://${host}/videos`,
    `https://${host}/llms.txt`,
    `https://${host}/llms-full.txt`,
  ];

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      message: res.ok
        ? "Submitted to IndexNow (Bing, Yandex, Microsoft) successfully!"
        : `IndexNow responded with status ${res.status}`,
      submittedUrls: urlList,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
