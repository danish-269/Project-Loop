"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function EditFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const user = useUser();

  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const id = params.id as string;

  useEffect(() => {
    async function loadFeedback() {
      if (!user?.workspaceId || !id) return;

      try {
        const response = await fetch(
          `/api/feedback/${id}?workspaceId=${user.workspaceId}`
        );

        const data = await response.json();

        if (!data.success) {
          setError(data.message || "Feedback not found.");
          return;
        }

        setCustomer(data.feedback.customer || "");
        setMessage(data.feedback.message || "");
        setSource(data.feedback.source || "");
      } catch {
        setError("Failed to load feedback.");
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, [user?.workspaceId, id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) {
      setError("Feedback message is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          message,
          source,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to update feedback.");
        return;
      }

      router.push("/feedback/list");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (!user || loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  // VIEWER protection
  if (user.role === "VIEWER") {
    router.replace("/access-denied");
    return null;
  }

  if (error && !message) {
    return (
      <div className="p-10">
        <p className="text-red-600">{error}</p>
        <Link
          href="/feedback/list"
          className="text-blue-600 mt-4 inline-block"
        >
          ← Back to Feedback History
        </Link>
      </div>
    );
  }

  return (
    <main className="p-10">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/feedback/list"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          ← Back to Feedback History
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-gray-900">
            ✏ Edit Feedback
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Update the customer feedback details.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Customer
              </label>

              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-gray-900"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Feedback
              </label>

              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter feedback"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Source
              </label>

              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-gray-900"
                placeholder="Feedback source"
              />
            </div>

            <div className="flex gap-4">

              <Link
                href="/feedback/list"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </main>
  );
}