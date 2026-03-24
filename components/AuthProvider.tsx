"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Role, User } from "@/types";

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextShape = {
  user: User | null;
  login: (payload: LoginPayload) => { ok: boolean; message?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextShape | null>(null);

const demoUsers: Record<string, User & { password: string }> = {
  "manager@slooze.xyz": {
    id: "1",
    email: "manager@slooze.xyz",
    role: "MANAGER",
    name: "Nadia Manager",
    password: "manager123",
  },
  "store@slooze.xyz": {
    id: "2",
    email: "store@slooze.xyz",
    role: "STORE_KEEPER",
    name: "Rohit Store Keeper",
    password: "store123",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setUser(JSON.parse(session) as User);
    }
  }, []);

  const login = ({ email, password }: LoginPayload) => {
    const foundUser = demoUsers[email.toLowerCase()];
    if (!foundUser || foundUser.password !== password) {
      return { ok: false, message: "Invalid credentials" };
    }

    const sessionUser: User = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role as Role,
      name: foundUser.name,
    };

    setUser(sessionUser);
    localStorage.setItem("session", JSON.stringify(sessionUser));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}