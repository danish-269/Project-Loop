export default function AIInsights() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-6 text-white h-full">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Insights
      </h2>

      <div className="space-y-5">

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Most customers love
          </h3>

          <p className="text-sm mt-2">
            Easy-to-use interface and smooth experience.
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Recurring Issue
          </h3>

          <p className="text-sm mt-2">
            Faster customer support response.
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">
            Recommendation
          </h3>

          <p className="text-sm mt-2">
            Improve support turnaround to increase satisfaction.
          </p>
        </div>

      </div>

    </div>
  );
}