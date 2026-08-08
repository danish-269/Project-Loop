"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    PlusCircle,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Bot,
} from "lucide-react";

const menu = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "ANALYST", "VIEWER"],
    },
    {
        name: "Add Feedback",
        href: "/feedback",
        icon: PlusCircle,
        roles: ["ADMIN", "ANALYST"],
    },
    {
        name: "Feedback History",
        href: "/feedback/list",
        icon: ClipboardList,
        roles: ["ADMIN", "ANALYST", "VIEWER"],
    },
    {
        name: "Reports",
        href: "/reports",
        icon: BarChart3,
        roles: ["ADMIN", "ANALYST"],
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        roles: ["ADMIN"],
    },
    {
        name: "Ask LOOP",
        href: "/ask-loop",
        icon: Bot,
        roles: ["ADMIN", "ANALYST"],
    },
];

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    workspaceId: string;
};

export default function Sidebar({ user }: { user: User }) {
    const pathname = usePathname();

    const filteredMenu = menu.filter((item) =>
        item.roles.includes(user.role)
    );

    return (
        <aside className="w-64 bg-white border-r h-screen flex flex-col">

            <div className="p-8">
                <h1 className="text-3xl font-bold text-blue-600">
                    Project LOOP
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    AI Feedback Platform
                </p>
            </div>

            <nav className="px-5 space-y-2 flex-1">
                {filteredMenu.map((item) => {
                    const Icon = item.icon;

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

            <div className="p-5 border-t">
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