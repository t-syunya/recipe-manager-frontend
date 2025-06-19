import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import MuiThemeProvider from "./ThemeProvider";
import AuthMenu from "./components/AuthMenu";
import NextAuthSessionProvider from "./SessionProvider";
import RequireAuth from "./components/RequireAuth";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Recipe Manager",
	description: "Figma MCP風レシピ管理アプリ（Next.js＋MUI）",
};

const drawerWidth = 240;

const navItems = [
	{ label: "レシピ一覧", href: "/recipes", icon: <ListAltIcon /> },
	{ label: "買い物リスト", href: "/shopping", icon: <ShoppingCartIcon /> },
	{ label: "レシピ検索・登録", href: "/recipes/search", icon: <SearchIcon /> },
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<MuiThemeProvider>
					<NextAuthSessionProvider>
						<RequireAuth>
							<Box
								sx={{
									display: "flex",
									minHeight: "100vh",
									background: "#F7FAFC",
								}}
							>
								<Drawer
									variant="permanent"
									sx={{
										width: drawerWidth,
										flexShrink: 0,
										"& .MuiDrawer-paper": {
											width: drawerWidth,
											boxSizing: "border-box",
											background: "#F7FAFC",
											borderRight: "1px solid #E5E8EB",
										},
									}}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											p: 3,
											pb: 1,
										}}
									>
										<HomeIcon color="primary" fontSize="large" />
										<span style={{ fontWeight: 700, fontSize: 20 }}>
											Recipe Manager
										</span>
										<Box sx={{ flexGrow: 1 }} />
									</Box>
									<List>
										{navItems.map((item) => (
											<ListItem key={item.href} disablePadding>
												<ListItemButton component={Link} href={item.href}>
													<ListItemIcon>{item.icon}</ListItemIcon>
													<ListItemText primary={item.label} />
												</ListItemButton>
											</ListItem>
										))}
									</List>
								</Drawer>
								<Box
									component="main"
									sx={{
										flexGrow: 1,
										p: 4,
										minHeight: "100vh",
										position: "relative",
									}}
								>
									<Box
										sx={{
											position: "absolute",
											top: 24,
											right: 32,
											zIndex: 10,
										}}
									>
										<AuthMenu />
									</Box>
									{children}
								</Box>
							</Box>
						</RequireAuth>
					</NextAuthSessionProvider>
				</MuiThemeProvider>
			</body>
		</html>
	);
}
