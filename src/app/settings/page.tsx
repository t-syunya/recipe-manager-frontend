"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function SettingsPage() {
	const [name, setName] = React.useState("山田 太郎");
	const [email, setEmail] = React.useState("taro@example.com");

	return (
		<Box maxWidth={500} mx="auto">
			<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
				<Typography variant="h4" fontWeight={700} mb={2}>
					Settings
				</Typography>
				<Stack spacing={2}>
					<TextField
						label="User Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
					/>
					<TextField
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						fullWidth
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{ borderRadius: 2, mt: 2 }}
					>
						Save
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
}
