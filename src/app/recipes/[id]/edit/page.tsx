"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const recipes = [
	{
		id: "1",
		name: "カルボナーラ",
		category: "イタリアン",
		tags: ["パスタ", "クリーミー"],
		description: "クリーミーなソースが美味しい定番イタリアンパスタです。",
		ingredients: [
			"スパゲッティ",
			"卵",
			"パンチェッタ",
			"パルメザンチーズ",
			"黒胡椒",
		],
		steps: [
			"パスタを茹でる。",
			"パンチェッタを炒める。",
			"卵とチーズを混ぜる。",
			"全てを合わせて盛り付ける。",
		],
	},
	{
		id: "2",
		name: "チキン炒め",
		category: "中華",
		tags: ["鶏肉", "炒め物"],
		description: "素早く作れてヘルシーなチキン炒めです。",
		ingredients: ["鶏胸肉", "野菜ミックス", "醤油", "ニンニク", "生姜"],
		steps: [
			"鶏肉と野菜を切る。",
			"鶏肉を炒める。",
			"野菜とソースを加える。",
			"熱々で盛り付ける。",
		],
	},
];

export default function RecipeEditPage() {
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
	const recipe = recipes.find((r) => r.id === id) || recipes[0];

	const [name, setName] = React.useState(recipe.name);
	const [category, setCategory] = React.useState(recipe.category);
	const [tags, setTags] = React.useState(recipe.tags.join(", "));
	const [description, setDescription] = React.useState(recipe.description);
	const [ingredients, setIngredients] = React.useState(
		recipe.ingredients.join("\n"),
	);
	const [steps, setSteps] = React.useState(recipe.steps.join("\n"));

	return (
		<Box maxWidth={600} mx="auto">
			<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
				<Typography variant="h4" fontWeight={700} mb={2}>
					レシピを編集
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
