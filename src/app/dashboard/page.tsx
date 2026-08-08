export const dynamic = "force-dynamic";
import UserGreeting from "@/components/UserGreeting";
import { getCurrentUser } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import AddFeedbackButton from "@/components/AddFeedbackButton";

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

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const workspaceId = currentUser.workspaceId;

  console.log("DATABASE_URL:", process.env.DATABASE_URL?.slice(0, 60));
  console.log("Total Feedback:", await prisma.feedback.count());

  const totalFeedback = await prisma.feedback.count({
    where: {
      workspaceId,
    },
  });

  const positive = await prisma.feedback.count({
    where: {
      workspaceId,
      sentiment: "POSITIVE",
    },
  });

  const neutral = await prisma.feedback.count({
    where: {
      workspaceId,
      sentiment: "NEUTRAL",
    },
  });

  const negative = await prisma.feedback.count({
    where: {
      workspaceId,
      sentiment: "NEGATIVE",
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newFeedbackToday = await prisma.feedback.count({
    where: {
      workspaceId,
      createdAt: {
        gte: today,
      },
    },
  });

  const recentFeedback = await prisma.feedback.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const themeFeedback = await prisma.feedback.findMany({
    where: {
      workspaceId,
    },
    select: {
      theme: true,
    },
  });

  const themeCounts: Record<string, number> = {};

  themeFeedback.forEach((item) => {
    if (!item.theme) return;

    const theme = item.theme.trim();

    if (!theme) return;

    themeCounts[theme] = (themeCounts[theme] || 0) + 1;
  });

  const themeChartData = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([theme, value]) => ({
      theme,
      value,
    }));

  const topThemeEntry = Object.entries(themeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topTheme = topThemeEntry?.[0] || "";
  const topThemeCount = topThemeEntry?.[1] || 0;

  const negativeThemeCounts: Record<string, number> = {};

  const negativeFeedback = await prisma.feedback.findMany({
    where: {
      workspaceId,
      sentiment: "NEGATIVE",
    },
    select: {
      theme: true,
    },
  });

  negativeFeedback.forEach((item) => {
    if (!item.theme) return;

    const theme = item.theme.trim();

    if (!theme) return;

    negativeThemeCounts[theme] =
      (negativeThemeCounts[theme] || 0) + 1;
  });

  const negativeThemeEntry = Object.entries(
    negativeThemeCounts
  ).sort((a, b) => b[1] - a[1])[0];

  const negativeTheme = negativeThemeEntry?.[0] || "";
  const negativeThemeCount = negativeThemeEntry?.[1] || 0;

  let recommendation =
    "Continue monitoring customer feedback to identify improvement opportunities.";

  if (negativeTheme) {
    recommendation = `Focus on improving ${negativeTheme.toLowerCase()} to reduce negative customer feedback.`;
  }

  const monthlyFeedback = await prisma.feedback.findMany({
    where: {
      workspaceId,
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const now = new Date();

  const feedbackTrend = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (5 - index),
      1
    );

    const nextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    );

    const count = monthlyFeedback.filter(
      (item) =>
        item.createdAt >= date &&
        item.createdAt < nextMonth
    ).length;

    return {
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      feedback: count,
    };
  });


  const positivePercentage =
    totalFeedback > 0
      ? Math.round((positive / totalFeedback) * 100)
      : 0;

  const neutralPercentage =
    totalFeedback > 0
      ? Math.round((neutral / totalFeedback) * 100)
      : 0;

  const negativePercentage =
    totalFeedback > 0
      ? Math.round((negative / totalFeedback) * 100)
      : 0;

  const averageRating = await prisma.feedback.aggregate({
    where: {
      workspaceId,
    },
    _avg: {
      rating: true,
    },
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

                  <UserGreeting user={currentUser} />

                </div>

                <div className="hidden lg:flex gap-4">

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <TrendingUp className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">New Feedback</p>
                    <h2 className="text-3xl font-bold">+{newFeedbackToday}</h2>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <Smile className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">Positive</p>
                    <h2 className="text-3xl font-bold">{positivePercentage}%</h2>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-40">
                    <Bot className="mb-2" size={24} />
                    <p className="text-blue-100 text-sm">Average Rating</p>
                    <h2 className="text-2xl font-bold">⭐ {averageRating._avg.rating?.toFixed(1) ?? "N/A"}</h2>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Feedback"
              value={totalFeedback}
              change={`${newFeedbackToday} received today`}
              icon={MessageSquare}
              color="bg-blue-600"
            />

            <StatCard
              title="Positive"
              value={positive}
              change={`${positivePercentage}% of feedback`}
              icon={Smile}
              color="bg-green-600"
            />

            <StatCard
              title="Neutral"
              value={neutral}
              change={`${neutralPercentage}% of feedback`}
              icon={Meh}
              color="bg-yellow-500"
            />

            <StatCard
              title="Negative"
              value={negative}
              change={`${negativePercentage}% of feedback`}
              icon={Frown}
              color="bg-red-600"
            />

          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="col-span-2">
              <FeedbackChart data={feedbackTrend} />
            </div>

            <AIInsights
              topTheme={topTheme}
              topThemeCount={topThemeCount}
              negativeTheme={negativeTheme}
              negativeThemeCount={negativeThemeCount}
              recommendation={recommendation}
            />

          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">

            <SentimentChart
              positive={positivePercentage}
              neutral={neutralPercentage}
              negative={negativePercentage}
            />

            <ThemeChart data={themeChartData} />

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
                {currentUser.role === "ADMIN" && <AddFeedbackButton />}

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