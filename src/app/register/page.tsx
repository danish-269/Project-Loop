"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";




export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const result = await response.json();

    setLoading(false);

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert("Registration successful!");



    router.push("/login");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");

    console.log(result);

  };

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md brightness-90 scale-110"
        style={{
          backgroundImage: "url('/images/register-bg.png')",
        }}
      ></div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/45"></div>

      {/* AI Summary Card */}
      <div className="absolute z-10 top-24 left-10 w-64 bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5 border border-gray-200 hover:scale-105 transition duration-300 float1">

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤖</span>
          <h3 className="font-bold text-blue-600">
            AI Summary
          </h3>
        </div>

        <p className="text-gray-600 text-sm">
          Customers appreciate the easy-to-use interface but request faster support responses.
        </p>

      </div>

      {/* Positive Feedback Card */}
      <div className="absolute z-10 top-32 right-12 w-52 bg-green-50 rounded-2xl shadow-xl p-5 hover:scale-105 transition duration-300 float2">

        <p className="text-sm text-gray-600">
          Positive Feedback
        </p>

        <h2 className="text-4xl font-bold text-green-600">
          87%
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
        </div>

      </div>

      {/* AI Detection Card */}
      <div className="absolute z-10 bottom-28 right-12 w-56 bg-white rounded-2xl shadow-xl p-5 border border-gray-200 hover:scale-105 transition duration-300 float5">

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🧠</span>

          <h3 className="font-bold text-purple-600">
            AI Detection
          </h3>
        </div>

        <div className="space-y-3">

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Theme
            </p>

            <p className="font-semibold text-gray-800">
              Customer Support
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Sentiment
            </p>

            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Positive
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">
              AI Confidence
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full w-[96%]"></div>
            </div>

            <p className="text-right text-purple-600 font-bold mt-1">
              96%
            </p>
          </div>

        </div>

      </div>

      {/* Total Feedback Card */}
      <div className="absolute z-10 bottom-28 left-10 bg-white rounded-2xl shadow-xl p-5 w-64 hover:scale-105 transition duration-300 float3">

        <p className="text-gray-600 font-medium">
          Total Feedback
        </p>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-3xl">📊</span>

          <div>
            <h2 className="text-5xl font-bold text-blue-600">
              2540
            </h2>

            <p className="text-green-600 font-medium">
              ↑ 18% this month
            </p>
          </div>
        </div>

        <div className="mt-5 border-t pt-4">

          <div className="flex items-center justify-between">

            <div className="text-yellow-500 text-2xl">
              ⭐⭐⭐⭐☆
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Average Rating
              </p>

              <p className="font-bold text-gray-800">
                4.5 / 5
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Secure Badge */}
      <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-full shadow-xl font-semibold float4">
        🔒 Secure AI Powered Registration
      </div>

      {/* Register Card */}
      <div className="relative z-20 bg-white/90 backdrop-blur-xl border border-white/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 w-full max-w-md p-8">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          🧠 Project LOOP
        </h1>

        <div className="text-center mb-8">

          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-4xl text-white">
            👤
          </div>

          <h1 className="text-3xl font-bold mt-5 text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Join Project LOOP and analyze customer feedback using AI.
          </p>

        </div>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition rounded-lg p-3 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition rounded-lg p-3 text-black placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition rounded-lg p-3 pr-14 text-black placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition rounded-lg p-3 pr-14 text-black placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-3 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold shadow-lg transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center mt-6">

            <p className="text-gray-600">

              Already have an account?

              <Link
                href="/login"
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </form>

      </div>

    </main>
  );
}