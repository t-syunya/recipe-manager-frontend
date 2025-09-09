"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type * as React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect, createContext, useContext } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// テーマコンテキストの型定義
interface ThemeContextType {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

// テーマコンテキスト作成
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// カスタムフック：テーマコンテキストを使用
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

// ライトテーマ
const lightTheme = createTheme({
	palette: {
		mode: "light",
		background: {
			default: "#F7FAFC",
			paper: "#FFFFFF",
		},
		primary: { main: "#4573A1" },
		secondary: { main: "#F2F2F2" },
		text: {
			primary: "#1A202C",
			secondary: "#718096",
		},
	},
	typography: {
		fontFamily: `${geistSans.style.fontFamily}, 'Plus Jakarta Sans', 'Manrope', sans-serif`,
	},
});

// ダークテーマ
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#1A202C",
			paper: "#2D3748",
		},
		primary: { main: "#63B3ED" },
		secondary: { main: "#4A5568" },
		text: {
			primary: "#F7FAFC",
			secondary: "#CBD5E0",
		},
	},
	typography: {
		fontFamily: `${geistSans.style.fontFamily}, 'Plus Jakarta Sans', 'Manrope', sans-serif`,
	},
});

export default function MuiThemeProvider({
	children,
}: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	// マウント後にローカルストレージから設定を読み込み
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("darkMode");
		if (savedTheme !== null) {
			setIsDarkMode(JSON.parse(savedTheme));
		}
	}, []);

	// ダークモード切り替え関数
	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
	};

	// クライアントサイドでのハイドレーション不一致を防ぐ
	if (!mounted) {
		return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
	}

	const currentTheme = isDarkMode ? darkTheme : lightTheme;

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			<ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
}
