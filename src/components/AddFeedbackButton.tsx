"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function AddFeedbackButton() {
  const user = useUser();

  if (!user) return null;

  // Viewer cannot add feedback
  if (user.role === "VIEWER") {
    return null;
  }

  return (
    <Link
      href="/feedback"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      + Add Feedback
    </Link>
  );
}