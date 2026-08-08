"use client";

type Props = {
  topTheme: string;
  topThemeCount: number;
  negativeTheme: string;
  negativeThemeCount: number;
  recommendation: string;
};

export default function AIInsights({
  topTheme,
  topThemeCount,
  negativeTheme,
  negativeThemeCount,
  recommendation,
}: Props) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Insights
      </h2>

      <div className="space-y-5">

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Most Common Theme
          </h3>

          <p className="text-sm mt-2">
            {topTheme
              ? `${topTheme} appears most frequently in your feedback (${topThemeCount} ${
                  topThemeCount === 1 ? "time" : "times"
                }).`
              : "No theme data available yet."}
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Recurring Issue
          </h3>

          <p className="text-sm mt-2">
            {negativeTheme
              ? `${negativeTheme} is the most common theme among negative feedback (${negativeThemeCount} ${
                  negativeThemeCount === 1 ? "entry" : "entries"
                }).`
              : "No negative feedback data available yet."}
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Recommendation
          </h3>

          <p className="text-sm mt-2">
            {recommendation}
          </p>
        </div>

      </div>

    </div>
  );
}