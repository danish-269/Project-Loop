"use client";

import { Bell, Search } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Navbar() {

    const user = useUser();
    return (
        <header className="bg-white text-gray-900 border-b shadow-sm px-8 py-5 flex justify-between items-center">

            <div className="relative w-96">

                <Search
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                    placeholder="Search feedback..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-300 outline-none"
                />

            </div>

            <div className="flex items-center gap-6">

                <button className="relative">
                    <Bell size={22} />

                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {user?.name || "User"}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {user?.role || ""}
                        </p>
                    </div>

                </div>

            </div>

        </header>
    );
}