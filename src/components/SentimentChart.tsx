"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const data = [
    { name: "Positive", value: 73 },
    { name: "Neutral", value: 16 },
    { name: "Negative", value: 11 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export default function SentimentChart() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[380px]">

            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                🎨 Sentiment Distribution
            </h2>

            <ResponsiveContainer width="100%" height="90%">
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}