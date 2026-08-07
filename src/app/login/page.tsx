"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            console.log("Role:", data.user.role);

            if (!response.ok) {
                alert(data.message);
                setLoading(false);
                return;
            }

            // Save logged in user
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(`Welcome ${data.user.name}!`);

            router.push("/dashboard");

        } catch (error) {

            alert("Something went wrong.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/10 to-purple-100/20 blur-md"
                style={{
                    backgroundImage: "url('/images/login-bg.png')",
                }}
            />

            <div className="absolute inset-0 bg-white/40"></div>

            {/* Floating Card 1 */}

            <div className="absolute left-24 top-20 z-10 bg-white rounded-2xl shadow-xl p-5 w-60 float1">

                <h3 className="font-bold text-blue-600 mb-3">
                    🤖 AI Analysis
                </h3>

                <p className="text-gray-600 text-sm">
                    AI has processed over
                </p>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                    12.5K
                </p>

                <p className="text-green-600">
                    feedback entries
                </p>

            </div>

            {/* Floating Card 2 */}

            <div className="absolute right-24 top-24 z-10 bg-white rounded-2xl shadow-xl p-5 w-56 float2">

                <h3 className="font-bold text-purple-600">
                    🧠 AI Accuracy
                </h3>

                <p className="text-5xl font-bold text-purple-600 mt-3">
                    98%
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-600 h-2 rounded-full w-[98%]"></div>
                </div>

            </div>

            <div className="absolute bottom-24 right-20 z-10 bg-white rounded-2xl shadow-xl p-5 w-60 hover:scale-105 transition duration-300 float3">

                <div className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>

                    <h3 className="font-bold text-blue-600">
                        Today's Activity
                    </h3>
                </div>

                <div className="mt-4">

                    <h2 className="text-5xl font-bold text-blue-600">
                        142
                    </h2>

                    <p className="text-gray-600 mt-1">
                        New Feedback Received
                    </p>

                    <div className="flex items-center justify-between mt-4">

                        <span className="text-green-600 font-semibold">
                            ↑ 22%
                        </span>

                        <span className="text-gray-500 text-sm">
                            vs Yesterday
                        </span>

                    </div>

                </div>

            </div>

            {/* Login Card */}

            <div className="absolute w-[520px] h-[520px] bg-blue-500/15 rounded-full blur-3xl"></div>

            <div className="relative z-20 bg-white/85 backdrop-blur-xl border border-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl w-full max-w-md p-8">

                <h1 className="text-3xl text-center font-bold text-blue-600">
                    Project LOOP
                </h1>

                <p className="text-gray-500 text-center text-sm mt-1">
                    AI Customer Feedback Intelligence
                </p>

                <div className="text-center mt-6">

                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white text-4xl">
                        🔐
                    </div>

                    <h2 className="text-3xl font-bold mt-5 text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Login to continue your AI feedback analysis.
                    </p>

                </div>

                <div className="space-y-5 mt-8">

                    <div className="relative">

                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="relative">

                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    <div className="flex justify-between text-sm">

                        <label className="flex gap-2 text-gray-700">
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <a href="#" className="text-blue-600">
                            Forgot Password?
                        </a>

                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="
                            w-full
                            py-3
                            rounded-xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            hover:from-blue-700
                            hover:to-indigo-700
                            hover:scale-[1.02]
                            hover:shadow-2xl
                            active:scale-95
                            transition-all
                            duration-300
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                             "
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Logging in...</span>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-center text-gray-600">

                        Don't have an account?

                        <Link
                            href="/register"
                            className="ml-2 text-blue-600 font-semibold"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}