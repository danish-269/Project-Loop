import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-10 py-6 bg-white/80 backdrop-blur-md shadow-sm">

        <h1 className="text-3xl font-bold text-blue-700">
          Project LOOP
        </h1>

        <div className="flex items-center gap-8">

          <a
            href="#features"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#tech"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Tech Stack
          </a>

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Sign up
          </Link>

        </div>

      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h1 className="text-6xl font-extrabold text-blue-700">
          Project LOOP
        </h1>

        <p className="mt-5 text-2xl font-semibold text-gray-700">
          AI Customer Feedback Intelligence Platform
        </p>

        <p className="mt-5 max-w-3xl text-lg text-gray-600 leading-8">
          Collect customer feedback from multiple channels, analyze it using Artificial Intelligence,
          identify sentiment, detect recurring themes, generate summaries and visualize
          insights through an interactive dashboard.
        </p>

        <Link
          href="/register"
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
        >
          🚀 Get Started
        </Link>

      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-8 pb-20"
      >

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-700">
              🤖 AI Sentiment Analysis
            </h3>

            <p className="mt-4 text-gray-600">
              Automatically classifies customer feedback into Positive,
              Neutral and Negative sentiments.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-700">
              🧠 Theme Detection
            </h3>

            <p className="mt-4 text-gray-600">
              Identifies common customer concerns such as pricing,
              customer support, delivery and product quality.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-700">
              📊 Analytics Dashboard
            </h3>

            <p className="mt-4 text-gray-600">
              Visualize customer insights using interactive charts,
              statistics and AI-generated reports.
            </p>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-6xl mx-auto py-16">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-5xl font-bold text-blue-600">
              1000+
            </h3>

            <p className="mt-3 text-gray-600">
              Feedback Processed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-5xl font-bold text-green-600">
              95%
            </h3>

            <p className="mt-3 text-gray-600">
              AI Sentiment Accuracy
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-5xl font-bold text-purple-600">
              24×7
            </h3>

            <p className="mt-3 text-gray-600">
              AI Powered Analysis
            </p>
          </div>

        </div>

      </section>

      {/* Tech Stack */}
      <section
        id="tech"
        className="bg-white py-16"
      >

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Technology Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "Prisma ORM",
            "OpenRouter AI",
          ].map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-semibold"
            >
              {tech}
            </span>
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="py-20 bg-blue-700 text-white text-center">

        <h2 className="text-5xl font-bold">
          Ready to Transform Customer Feedback?
        </h2>

        <p className="mt-5 text-xl">
          Start analyzing customer feedback with AI today.
        </p>

        <Link
          href="/register"
          className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
        >
          🚀 Get Started
        </Link>

      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6">
        © 2026 Project LOOP • AI Customer Feedback Intelligence Platform
      </footer>

    </main>
  );
}