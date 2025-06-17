"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function RequireAuth({
	children,
}: { children: React.ReactNode }) {
	const { status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			signIn("google");
		}
	}, [status]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "authenticated") {
		return <>{children}</>;
	}

	// サインイン中は何も表示しない
	return null;
}
