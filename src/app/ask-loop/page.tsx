"use client";

import { useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";

export default function AskLoopPage() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {

    if (!question.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ask-loop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await res.json();

    setAnswer(data.answer);

    setLoading(false);
  }

  return (

    <main className="p-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex items-center gap-4">

            <Bot size={55} />

            <div>

              <h1 className="text-4xl font-bold">
                Ask LOOP
              </h1>

              <p className="text-blue-100 mt-2">
                Ask questions about your customer feedback using AI.
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

          <textarea
            rows={4}
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            placeholder="Example: What are customers complaining about?"
            className="w-full border rounded-2xl p-5 text-gray-900"
          />

          <button
            onClick={askAI}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 flex justify-center gap-3"
          >

            <SendHorizonal size={20}/>

            {loading ? "Thinking..." : "Ask LOOP"}

          </button>

        </div>

        {answer && (

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

            <div className="flex items-center gap-3 mb-5">

              <Bot className="text-blue-600"/>

              <h2 className="text-2xl font-bold">
                LOOP Response
              </h2>

            </div>

            <p className="text-gray-700 whitespace-pre-wrap">
              {answer}
            </p>

          </div>

        )}

      </div>

    </main>

  );

}