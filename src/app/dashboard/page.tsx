import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StatCard from "@/components/StatCard";

import {
  MessageSquare,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

import {
  Sparkles,
  TrendingUp,
  Bot,
} from "lucide-react";

import FeedbackChart from "@/components/FeedbackChart";
import SentimentChart from "@/components/SentimentChart";
import ThemeChart from "@/components/ThemeChart";
import AIInsights from "@/components/AIInsights";

export default async function Dashboard() {

  const totalFeedback = await prisma.feedback.count();

  const positive = await prisma.feedback.count({
    where: {
      sentiment: "POSITIVE",
    },
  });

  const neutral = await prisma.feedback.count({
    where: {
      sentiment: "NEUTRAL",
    },
  });

  const negative = await prisma.feedback.count({
    where: {
      sentiment: "NEGATIVE",
    },
  });

  const recentFeedback = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="flex">

        {/* Main Content */}
        <section className="flex-1 p-8">

          <div className="mb-8">

            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <h1 className="text-4xl font-bold">
                    👋 Good Afternoon, Danish
                  </h1>

                  <p className="text-blue-100 mt-3 text-lg">
                    Welcome back! Here's what's happening with your customer feedback today.
                  </p>

                </div>

                <div className="hidden lg:flex gap-4">

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <TrendingUp className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">New Feedback</p>
                    <h2 className="text-3xl font-bold">+12</h2>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <Smile className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">Positive</p>
                    <h2 className="text-3xl font-bold">73%</h2>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <Bot className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">AI Status</p>
                    <h2 className="text-2xl font-bold">Ready</h2>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Feedback"
              value={totalFeedback}
              change="+18% this month"
              icon={MessageSquare}
              color="bg-blue-600"
            />

            <StatCard
              title="Positive"
              value={positive}
              change="73% of feedback"
              icon={Smile}
              color="bg-green-600"
            />

            <StatCard
              title="Neutral"
              value={neutral}
              change="16% of feedback"
              icon={Meh}
              color="bg-yellow-500"
            />

            <StatCard
              title="Negative"
              value={negative}
              change="11% of feedback"
              icon={Frown}
              color="bg-red-600"
            />

          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="col-span-2">
              <FeedbackChart />
            </div>

            <AIInsights />

          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">

            <SentimentChart />

            <ThemeChart />

          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-md mt-10">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
                🤖
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  AI Feedback Analyzer
                </h2>

                <p className="text-gray-600">
                  Every customer feedback is automatically processed using AI.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-green-600">
                  😊 Sentiment Analysis
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Detects Positive, Neutral and Negative feedback automatically.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-purple-600">
                  🧠 Theme Detection
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Finds recurring issues like Pricing, Support and Delivery.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-orange-600">
                  📝 AI Summary
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Generates short summaries for every customer review.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-blue-600">
                  📊 Actionable Insights
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Helps businesses identify improvement opportunities.
                </p>
              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <span className="text-sm text-gray-500">
                ⚡ Powered by OpenRouter AI
              </span>

              <div className="flex gap-3">

                <Link
                  href="/feedback"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Add Feedback
                </Link>

                <Link
                  href="/feedback/list"
                  className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50"
                >
                  View Feedback
                </Link>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Feedback
            </h2>

            <div className="space-y-5">

              {recentFeedback.map((item) => (

                <div
                  key={item.id}
                  className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {item.customer || "Anonymous"}
                      </h3>

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
                              : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {item.sentiment || "Pending"}
                    </span>

                  </div>

                  {/* Theme */}

                  <div className="mt-5">

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">

                      🏷 {item.theme || "No Theme"}

                    </span>

                  </div>

                  {/* AI Summary */}

                  <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">

                    <h4 className="font-semibold text-blue-700 mb-2">

                      🤖 AI Summary

                    </h4>

                    <p className="text-gray-700 text-sm">

                      {item.summary || "AI summary is not available yet."}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}