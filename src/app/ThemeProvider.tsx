"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type * as React from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const theme = createTheme({
	palette: {
		background: { default: "#F7FAFC" },
		primary: { main: "#4573A1" },
		secondary: { main: "#F2F2F2" },
	},
	typography: {
		fontFamily: `${geistSans.style.fontFamily}, 'Plus Jakarta Sans', 'Manrope', sans-serif`,
	},
});

export default function MuiThemeProvider({
	children,
}: { children: React.ReactNode }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
