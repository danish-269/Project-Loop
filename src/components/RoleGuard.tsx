"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

type Props = {
  children: React.ReactNode;
  allowedRoles: ("ADMIN" | "ANALYST" | "VIEWER")[];
};

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (!allowedRoles.includes(user.role)) {
      router.replace("/access-denied");
    }
  }, [user, allowedRoles, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}