"use client";
import { SessionProvider } from "next-auth/react";
import type React from "react";

export default function NextAuthSessionProvider({
	children,
}: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
