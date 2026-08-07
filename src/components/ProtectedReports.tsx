"use client";

import RoleGuard from "@/components/RoleGuard";

export default function ProtectedReports({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN", "ANALYST"]}>
      {children}
    </RoleGuard>
  );
}