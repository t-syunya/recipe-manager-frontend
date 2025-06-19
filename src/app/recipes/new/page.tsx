"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function RecipeNewPage() {
	const [name, setName] = React.useState("");
	const [category, setCategory] = React.useState("");
	const [tags, setTags] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [ingredients, setIngredients] = React.useState("");
	const [steps, setSteps] = React.useState("");

	return (
		<Box maxWidth={600} mx="auto">
			<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
				<Typography variant="h4" fontWeight={700} mb={2}>
					新しいレシピ
				</Typography>
				<Stack spacing={2}>
					<TextField
						label="レシピ名"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
					/>
					<TextField
						label="カテゴリ"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						fullWidth
					/>
					<TextField
						label="タグ (カンマ区切り)"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						fullWidth
					/>
					<TextField
						label="説明"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						multiline
						minRows={2}
					/>
					<TextField
						label="材料 (1行に1つずつ)"
						value={ingredients}
						onChange={(e) => setIngredients(e.target.value)}
						fullWidth
						multiline
						minRows={3}
					/>
					<TextField
						label="作り方 (1行に1ステップずつ)"
						value={steps}
						onChange={(e) => setSteps(e.target.value)}
						fullWidth
						multiline
						minRows={3}
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{ borderRadius: 2, mt: 2 }}
					>
						保存
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
}
