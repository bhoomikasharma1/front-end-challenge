"use client";

import { RoleGuard } from "@/components/RoleGuard";
import { initialProducts } from "@/lib/mockData";

export default function DashboardPage() {
  const totalItems = initialProducts.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = initialProducts.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <RoleGuard allowedRoles={["MANAGER"]}>
      <section style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Manager Dashboard</h1>
        <p style={{ color: "var(--muted)" }}>Manager-only overview for commodity operations.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <StatCard title="Products" value={String(initialProducts.length)} />
          <StatCard title="Total Units" value={String(totalItems)} />
          <StatCard title="Inventory Value" value={`Rs. ${totalValue.toLocaleString()}`} />
        </div>
      </section>
    </RoleGuard>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ ...cardStyle, padding: "0.75rem" }}>
      <p style={{ color: "var(--muted)", margin: "0 0 0.3rem" }}>{title}</p>
      <strong style={{ fontSize: "1.2rem" }}>{value}</strong>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "1rem",
};