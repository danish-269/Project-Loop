import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function FeedbackDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (!currentUser.workspaceId) {
    redirect("/dashboard");
  }

  const { id } = await params;

  const feedback = await prisma.feedback.findFirst({
    where: {
      id,
      workspaceId: currentUser.workspaceId,
    },
  });

  if (!feedback) {
    notFound();
  }

  return (
    <main className="p-10">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/feedback/list"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          ← Back to Feedback History
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex justify-between items-start gap-6">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {feedback.customer || "Anonymous"}
              </h1>

              <p className="text-gray-500 mt-2">
                Feedback Details
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full font-semibold text-sm ${feedback.sentiment === "POSITIVE"
                  ? "bg-green-100 text-green-700"
                  : feedback.sentiment === "NEGATIVE"
                    ? "bg-red-100 text-red-700"
                    : feedback.sentiment === "NEUTRAL"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }`}
            >
              {feedback.sentiment || "Pending"}
            </span>

          </div>

          <div className="mt-8">

            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Customer Feedback
            </h2>

            <div className="bg-gray-50 border rounded-2xl p-5">
              <p className="text-gray-700 text-lg">
                {feedback.message}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
              <h3 className="font-semibold text-purple-700">
                🏷 Theme
              </h3>

              <p className="text-gray-700 mt-2">
                {feedback.theme || "No theme available"}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-semibold text-blue-700">
                📅 Submitted
              </h3>

              <p className="text-gray-700 mt-2">
                {new Date(feedback.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">

            <h3 className="font-semibold text-blue-700 mb-3">
              🤖 AI Summary
            </h3>

            <p className="text-gray-700">
              {feedback.summary || "AI summary is not available yet."}
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}