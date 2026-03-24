"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("manager@slooze.xyz");
  const [password, setPassword] = useState("manager123");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace(user.role === "MANAGER" ? "/dashboard" : "/products");
    }
  }, [router, user]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    const result = login({ email, password });
    if (!result.ok) {
      setError(result.message ?? "Failed to login.");
      return;
    }

    router.push(params.get("next") || "/products");
  };

  return (
    <section style={cardStyle}>
      <h1 style={{ marginTop: 0 }}>Login</h1>
      <p style={{ color: "var(--muted)", marginTop: 0 }}>
        Demo users: manager@slooze.xyz / manager123 or store@slooze.xyz / store123
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 420 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={inputStyle} />
        <button type="submit" style={btnStyle}>
          Sign In
        </button>
      </form>
      {error ? <p style={{ color: "#d62828" }}>{error}</p> : null}
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "1rem",
};

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "transparent",
  color: "var(--text)",
  padding: "0.6rem",
};

const btnStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--accent)",
  color: "white",
  borderRadius: 10,
  padding: "0.55rem 0.75rem",
  cursor: "pointer",
};