import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const headers = [
    "Customer",
    "Message",
    "Source",
    "Sentiment",
    "Theme",
    "Summary",
    "Created At",
  ];

  const rows = feedbacks.map((item) => [
    item.customer ?? "Anonymous",
    item.message,
    item.source,
    item.sentiment ?? "Pending",
    item.theme ?? "No Theme",
    item.summary ?? "N/A",
    item.createdAt.toLocaleString(),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="feedback-history.csv"',
    },
  });
}