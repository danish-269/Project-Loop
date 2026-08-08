"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import StatCard from "@/components/StatCard";
import Link from "next/link";

import {
  MessageSquare,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

export default function FeedbackListPage() {
  const user = useUser();

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedback() {
      if (!user?.workspaceId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/feedback?workspaceId=${user.workspaceId}`
        );

        const data = await response.json();

        if (data.success) {
          setFeedbacks(data.feedbacks);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to load feedback:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, [user?.workspaceId]);

  if (!user || loading) {
    return (
      <main className="p-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500 text-lg">
            Loading feedback...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="mb-8">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-5 transition"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900">
          📋 Feedback History
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          View, search and manage customer feedback.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search feedback..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400"
          />

          <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400">
            <option>All Sentiments</option>
            <option>😊 Positive</option>
            <option>😐 Neutral</option>
            <option>😞 Negative</option>
          </select>

          <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400">
            <option>All Categories</option>
            <option>Product</option>
            <option>Support</option>
            <option>Delivery</option>
            <option>Pricing</option>
          </select>

          <Link
            href="/api/export"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md text-center"
          >
            📥 Export CSV
          </Link>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Feedback"
          value={feedbacks.length}
          change={`${feedbacks.length} records`}
          icon={MessageSquare}
          color="bg-blue-600"
        />

        <StatCard
          title="😊 Positive"
          value={feedbacks.filter(f => f.sentiment === "POSITIVE").length}
          change="Positive reviews"
          icon={Smile}
          color="bg-green-600"
        />

        <StatCard
          title="😐 Neutral"
          value={feedbacks.filter(f => f.sentiment === "NEUTRAL").length}
          change="Neutral reviews"
          icon={Meh}
          color="bg-yellow-500"
        />

        <StatCard
          title="😞 Negative"
          value={feedbacks.filter(f => f.sentiment === "NEGATIVE").length}
          change="Negative reviews"
          icon={Frown}
          color="bg-red-600"
        />

      </div>

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Feedback History
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="space-y-6">

          {feedbacks.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border p-6"
            >

              {/* Top Row */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.customer || "Anonymous"}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.message}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold text-sm
          ${item.sentiment === "POSITIVE"
                      ? "bg-green-100 text-green-700"
                      : item.sentiment === "NEGATIVE"
                        ? "bg-red-100 text-red-700"
                        : item.sentiment === "NEUTRAL"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {item.sentiment || "Pending"}
                </span>

              </div>

              <div className="flex items-center gap-4 mt-5 text-sm text-gray-500">

                <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1 rounded-full">
                  🏷 {item.theme || "No Theme"}
                </span>

                <span>
                  📅{" "}
                  {new Date(item.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

              </div>

              <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-100">

                <h3 className="font-semibold text-blue-700 mb-2">
                  🤖 AI Summary
                </h3>

                <p className="text-gray-700">
                  {item.summary || "AI summary is not available yet."}
                </p>

              </div>

              <div className="flex justify-between items-center mt-5">

                {user.role !== "VIEWER" && (
                  <div className="flex gap-3">

                    <Link
                      href={`/feedback/edit/${item.id}`}
                      className="px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      ✏ Edit
                    </Link>

                    <button
                      onClick={async () => {
                        const confirmed = confirm(
                          "Are you sure you want to delete this feedback?"
                        );

                        if (!confirmed) return;

                        try {
                          const response = await fetch(`/api/feedback/${item.id}`, {
                            method: "DELETE",
                          });

                          const data = await response.json();

                          if (!data.success) {
                            alert(data.message || "Failed to delete feedback.");
                            return;
                          }

                          setFeedbacks((current) =>
                            current.filter((feedback) => feedback.id !== item.id)
                          );
                        } catch (error) {
                          console.error(error);
                          alert("Something went wrong while deleting feedback.");
                        }
                      }}
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      🗑 Delete
                    </button>

                  </div>
                )}

                <Link
                  href={`/feedback/${item.id}`}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                >
                  👁 View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}