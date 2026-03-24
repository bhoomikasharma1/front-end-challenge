"use client";

import { ProductManager } from "@/components/ProductManager";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/components/AuthProvider";
import { initialProducts } from "@/lib/mockData";

export default function ProductsPage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["MANAGER", "STORE_KEEPER"]}>
      <ProductManager editable={!!user} initialData={initialProducts} />
    </RoleGuard>
  );
}