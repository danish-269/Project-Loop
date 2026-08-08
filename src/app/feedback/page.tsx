"use client";

import { useState } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";

import {
  User,
  Mail,
  MessageSquare,
  Send,
  ArrowLeft,
  Bot,
} from "lucide-react";

export default function FeedbackPage() {
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [category, setCategory] = useState("Product");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!customer || !message) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          email,
          message,
          rating,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to analyze feedback.");
        return;
      }

      alert("Feedback analyzed successfully!");

      // Optional: clear the form
      setCustomer("");
      setEmail("");
      setMessage("");
      setRating(5);
      setCategory("Product");

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN", "ANALYST"]}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-10">

        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="
              absolute
              top-24
              left-1/2
              -translate-x-1/2
              w-[700px]
              h-[700px]
              bg-blue-400/10
              blur-[150px]
              rounded-full
            "
          />
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Back to Dashboard */}
          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-2
              text-blue-600
              hover:text-blue-700
              font-medium
              mb-6
            "
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

            {/* Header */}
            <div className="flex items-center gap-5 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl text-white">
                  📝
                </span>
              </div>

              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Add Customer Feedback
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                  Collect customer reviews and let AI analyze sentiment,
                  themes and insights instantly.
                </p>
              </div>

              <div
                className="
                  ml-auto
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-50
                  to-indigo-50
                  border
                  border-blue-200
                  shadow-sm
                "
              >
                <Bot size={18} className="text-blue-600" />

                <div className="rounded-full px-2">
                  <p className="text-xs text-gray-500">
                    Powered by
                  </p>

                  <p className="text-xs font-semibold text-blue-700">
                    OpenRouter AI
                  </p>
                </div>
              </div>

            </div>

            {/* Form */}
            <div className="space-y-7">

              {/* Customer */}
              <div>
                <label className="font-semibold text-gray-700">
                  Customer Name
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4">
                  <User className="text-gray-400" size={20} />

                  <input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full p-4 outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-gray-700">
                  Email (Optional)
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4">
                  <Mail className="text-gray-400" size={20} />

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full p-4 outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>

                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Customer Rating
                </label>

                <div className="flex items-center gap-3">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className={`transition-all duration-200 hover:scale-125 ${star <= (hover || rating)
                          ? "scale-110 drop-shadow-md"
                          : ""
                        }`}
                    >
                      <span
                        className={`text-4xl transition-all duration-200 ${star <= (hover || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    </button>
                  ))}

                  <p
                    className={`px-3 py-1 rounded-full text-sm font-medium ${rating >= 4
                        ? "bg-green-100 text-green-700"
                        : rating === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {rating === 5 && "😍 Excellent"}
                    {rating === 4 && "😊 Good"}
                    {rating === 3 && "😐 Average"}
                    {rating === 2 && "😕 Poor"}
                    {rating === 1 && "😠 Very Poor"}
                  </p>

                </div>
              </div>

              {/* Feedback */}
              <div>

                <label className="font-semibold text-gray-700">
                  Feedback
                </label>

                <div className="flex border rounded-xl mt-2 px-4">

                  <MessageSquare
                    className="mt-4 text-gray-400"
                    size={20}
                  />

                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write customer feedback..."
                    className="w-full p-4 outline-none resize-none text-gray-900"
                  />

                </div>
              </div>

              {/* Category */}
              <div>

                <label className="font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-xl p-4 mt-2 text-gray-900"
                >
                  <option>Product</option>
                  <option>Support</option>
                  <option>Pricing</option>
                  <option>Delivery</option>
                  <option>Website</option>
                </select>

              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  group
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-purple-600
                  px-6
                  py-5
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                <div className="flex flex-col items-center">

                  <div className="flex items-center gap-3">

                    {loading ? (
                      <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="transition-transform group-hover:translate-x-1">
                        🚀
                      </span>
                    )}

                    <span className="text-lg font-bold">
                      {loading
                        ? "Analyzing Feedback..."
                        : "Analyze Feedback with AI"}
                    </span>

                  </div>

                  <span className="mt-1 text-sm text-blue-100">
                    AI analyzes sentiment, themes and summary in seconds
                  </span>

                </div>
              </button>

              {/* AI Processing Engine */}
              <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 p-8 shadow-lg">

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md">
                    🤖
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-blue-700">
                      AI Processing Engine
                    </h2>

                    <p className="text-gray-600">
                      Every feedback is automatically analyzed after submission.
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-green-600 font-semibold text-lg">
                      😊 Sentiment Analysis
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                      Detects whether the feedback is Positive, Neutral or Negative.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-purple-600 font-semibold text-lg">
                      🧠 Theme Detection
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                      Finds common topics like Support, Pricing, Delivery and UI.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-orange-600 font-semibold text-lg">
                      📝 AI Summary
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                      Generates a concise summary of the customer's feedback.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-blue-600 font-semibold text-lg">
                      📊 Actionable Insights
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                      Suggests improvements to help improve customer satisfaction.
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-5">

                  <span className="text-sm text-gray-500">
                    ⚡ Powered by OpenRouter • Real-time AI Analysis
                  </span>

                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    AI Ready
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>
    </RoleGuard>
  );
}