"use client";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../ThemeProvider";

export default function ThemeToggle() {
	const { isDarkMode, toggleDarkMode } = useTheme();

	return (
		<Tooltip
			title={isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
		>
			<IconButton
				onClick={toggleDarkMode}
				color="inherit"
				sx={{
					color: "text.primary",
					"&:hover": {
						backgroundColor: "action.hover",
					},
				}}
			>
				{isDarkMode ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</Tooltip>
	);
}
