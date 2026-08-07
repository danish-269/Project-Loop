"use client";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bot } from "lucide-react";
import {
    LayoutDashboard,
    PlusCircle,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";


export default function Sidebar() {
    const user = useUser();

    const menu = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },

        ...(user?.role !== "VIEWER"
            ? [
                {
                    name: "Add Feedback",
                    href: "/feedback",
                    icon: PlusCircle,
                },
            ]
            : []),

        {
            name: "Feedback History",
            href: "/feedback/list",
            icon: ClipboardList,
        },

        ...(user?.role !== "VIEWER"
            ? [
                {
                    name: "Reports",
                    href: "/reports",
                    icon: BarChart3,
                },
                {
                    name: "Ask LOOP",
                    href: "/ask-loop",
                    icon: Bot,
                },
            ]
            : []),

        ...(user?.role === "ADMIN"
            ? [
                {
                    name: "Settings",
                    href: "/settings",
                    icon: Settings,
                },
            ]
            : []),
    ];
    return (
        <aside className="w-72 bg-white border-r shadow-sm min-h-screen">

            <div className="p-8">

                <h1 className="text-3xl font-bold text-blue-600">
                    Project LOOP
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    AI Feedback Platform
                </p>

            </div>

            <nav className="px-5 space-y-2">

                {menu.map((item) => {

                    const Icon = item.icon;

                    const pathname = usePathname();

                    return (

                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === item.href
                                ? "bg-blue-100 text-blue-600 shadow-sm"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );

                })}

            </nav>

            <div className="mt-auto p-5">

                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </aside>
    );
}