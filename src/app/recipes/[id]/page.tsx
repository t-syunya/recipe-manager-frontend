"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

// 仮のレシピデータ
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
	// ...他のレシピも同様に追加可
];

export default function RecipeDetailPage() {
	// Next.js app routerのuseParamsでid取得
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
	const recipe = recipes.find((r) => r.id === id) || recipes[0]; // 仮: 見つからなければ1件目

	return (
		<Box maxWidth={600} mx="auto">
			<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h4" fontWeight={700}>
						{recipe.name}
					</Typography>
					<Button
						component={Link}
						href={`/recipes/${recipe.id}/edit`}
						variant="outlined"
						color="primary"
						size="small"
						sx={{ borderRadius: 2 }}
					>
						編集
					</Button>
				</Stack>
				<Typography variant="subtitle1" color="text.secondary" mb={1}>
					{recipe.category} / {recipe.tags.join(", ")}
				</Typography>
				<Typography variant="body1" mb={3}>
					{recipe.description}
				</Typography>
				<Typography variant="h6" fontWeight={600} mb={1}>
					材料
				</Typography>
				<ul style={{ marginTop: 0, marginBottom: 16 }}>
					{recipe.ingredients.map((item) => (
						<li key={item}>
							<Typography variant="body2">{item}</Typography>
						</li>
					))}
				</ul>
				<Typography variant="h6" fontWeight={600} mb={1}>
					作り方
				</Typography>
				<ol style={{ marginTop: 0 }}>
					{recipe.steps.map((step, idx) => (
						<li key={`step-${idx}-${step.slice(0, 10)}`}>
							<Typography variant="body2">{step}</Typography>
						</li>
					))}
				</ol>
			</Paper>
		</Box>
	);
}
