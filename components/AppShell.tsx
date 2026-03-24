"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const menu = useMemo(() => {
    const base = [{ href: "/products", label: "Products", enabled: !!user }];
    const dashboardEnabled = user?.role === "MANAGER";
    return [{ href: "/dashboard", label: "Dashboard", enabled: dashboardEnabled }, ...base];
  }, [user]);

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "1rem 1.2rem" }}>
      <header
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <strong>Slooze Commodities</strong>
          {menu.map((item) =>
            item.enabled ? (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: pathname === item.href ? "var(--accent)" : "var(--text)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span key={item.href} style={{ color: "var(--muted)", opacity: 0.65 }}>
                {item.label}
              </span>
            ),
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={toggleTheme} style={buttonStyle}>
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          {!user ? (
            <Link href="/login" style={buttonStyle}>
              Login
            </Link>
          ) : (
            <>
              <span style={{ color: "var(--muted)" }}>{user.name}</span>
              <button onClick={onLogout} style={buttonStyle}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "1rem auto 0" }}>{children}</main>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--panel)",
  borderRadius: 10,
  color: "var(--text)",
  padding: "0.4rem 0.7rem",
  textDecoration: "none",
  cursor: "pointer",
};