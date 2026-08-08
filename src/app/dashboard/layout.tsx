import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar user={currentUser} />

      <div className="flex-1">

        <Navbar user={currentUser} />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}