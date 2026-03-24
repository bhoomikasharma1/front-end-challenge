"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Role } from "@/types";
import { useAuth } from "./AuthProvider";

export function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(path)}`);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/products");
    }
  }, [allowedRoles, path, router, user]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}