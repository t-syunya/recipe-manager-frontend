"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

export default function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<Button onClick={() => signOut()} variant="outlined">
				サインアウト
			</Button>
		);
	}
	return (
		<Button onClick={() => signIn("google")} variant="contained">
			Googleでサインイン
		</Button>
	);
}
