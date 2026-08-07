"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", feedback: 35 },
    { month: "Feb", feedback: 48 },
    { month: "Mar", feedback: 62 },
    { month: "Apr", feedback: 55 },
    { month: "May", feedback: 81 },
    { month: "Jun", feedback: 96 },
];

export default function FeedbackChart() {
    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                📈 Feedback Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="feedback"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );
}