"use client";

import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { theme: "Support", value: 48 },
    { theme: "Pricing", value: 23 },
    { theme: "Delivery", value: 17 },
    { theme: "UI", value: 12 },
];

export default function ThemeChart() {
    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 h-[380px]">

            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                🔥 Top Themes
            </h2>

            <ResponsiveContainer width="100%" height="90%">

                <BarChart data={data}>

                    <XAxis dataKey="theme" />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#2563eb"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}