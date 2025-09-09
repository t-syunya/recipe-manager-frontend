"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Link from "next/link";

// 仮のレシピデータ
const recipes = [
	{
		id: "1",
		name: "カルボナーラ",
		category: "イタリアン",
		tags: ["パスタ", "クリーミー"],
		description: "クリーミーなソースが美味しい定番イタリアンパスタです。",
		cookingTime: "20分",
		difficulty: "簡単",
		servings: "2人分",
		ingredients: [
			"スパゲッティ 200g",
			"卵 2個",
			"パンチェッタ 100g",
			"パルメザンチーズ 50g",
			"黒胡椒 適量",
		],
		steps: [
			"大きな鍋にたっぷりのお湯を沸かし、塩を加えてスパゲッティを茹でる。",
			"パンチェッタを小さく切って、フライパンでカリカリになるまで炒める。",
			"ボウルに卵とパルメザンチーズ、黒胡椒を入れてよく混ぜ合わせる。",
			"茹で上がったパスタをフライパンに移し、火を止めて卵液を加えて素早く混ぜる。",
			"お皿に盛り付け、追加のチーズと黒胡椒をかけて完成。",
		],
	},
	{
		id: "2",
		name: "チキン炒め",
		category: "中華",
		tags: ["鶏肉", "炒め物"],
		description: "素早く作れてヘルシーなチキン炒めです。",
		cookingTime: "15分",
		difficulty: "普通",
		servings: "2人分",
		ingredients: [
			"鶏胸肉 300g",
			"野菜ミックス 200g",
			"醤油 大さじ2",
			"ニンニク 2片",
			"生姜 1片",
		],
		steps: [
			"鶏肉を一口大に切り、野菜も適当な大きさに切る。",
			"フライパンに油を熱し、鶏肉を炒めて色が変わるまで調理する。",
			"ニンニクと生姜を加えて香りを出し、野菜を加えて炒める。",
			"醤油で味付けし、全体に火が通ったら熱々で盛り付ける。",
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
		<Box maxWidth={800} mx="auto">
			{/* ヘッダー部分 */}
			<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2, mb: 3 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
					mb={3}
				>
					<Box>
						<Typography variant="h3" fontWeight={700} mb={2}>
							{recipe.name}
						</Typography>
						<Stack direction="row" spacing={1} mb={2}>
							<Chip
								icon={<CategoryIcon />}
								label={recipe.category}
								color="primary"
								size="small"
								sx={{ fontWeight: 600 }}
							/>
							{recipe.tags.map((tag) => (
								<Chip
									key={tag}
									label={tag}
									variant="outlined"
									size="small"
									sx={{ fontWeight: 500 }}
								/>
							))}
						</Stack>
					</Box>
					<Button
						component={Link}
						href={`/recipes/${recipe.id}/edit`}
						variant="contained"
						color="primary"
						startIcon={<EditIcon />}
						sx={{
							borderRadius: 2,
							px: 3,
							py: 1,
							boxShadow: 2,
							"&:hover": {
								boxShadow: 4,
								transform: "translateY(-1px)",
							},
							transition: "all 0.2s ease-in-out",
						}}
					>
						編集
					</Button>
				</Stack>

				<Typography
					variant="body1"
					color="text.secondary"
					mb={3}
					sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
				>
					{recipe.description}
				</Typography>

				{/* 基本情報 */}
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={3}
					justifyContent="space-around"
				>
					<Box display="flex" alignItems="center" gap={1}>
						<AccessTimeIcon color="primary" fontSize="small" />
						<Typography variant="body2" fontWeight={600}>
							調理時間
						</Typography>
						<Typography variant="body2">{recipe.cookingTime}</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<RestaurantIcon color="primary" fontSize="small" />
						<Typography variant="body2" fontWeight={600}>
							難易度
						</Typography>
						<Chip
							label={recipe.difficulty}
							size="small"
							color={
								recipe.difficulty === "簡単"
									? "success"
									: recipe.difficulty === "普通"
										? "info"
										: "warning"
							}
							variant="filled"
						/>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<FiberManualRecordIcon color="primary" fontSize="small" />
						<Typography variant="body2" fontWeight={600}>
							分量
						</Typography>
						<Typography variant="body2">{recipe.servings}</Typography>
					</Box>
				</Stack>
			</Paper>

			<Stack direction={{ xs: "column", md: "row" }} spacing={3}>
				{/* 材料セクション */}
				<Box sx={{ flex: { xs: 1, md: "0 0 40%" } }}>
					<Card sx={{ borderRadius: 3, boxShadow: 2, height: "fit-content" }}>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								fontWeight={700}
								mb={3}
								color="primary.main"
							>
								材料
							</Typography>
							<List sx={{ p: 0 }}>
								{recipe.ingredients.map((item, index) => (
									<ListItem key={item} sx={{ px: 0, py: 1 }}>
										<ListItemIcon sx={{ minWidth: 24 }}>
											<FiberManualRecordIcon
												sx={{ fontSize: 8, color: "primary.main" }}
											/>
										</ListItemIcon>
										<ListItemText
											primary={item}
											primaryTypographyProps={{
												variant: "body1",
												sx: { fontWeight: 500 },
											}}
										/>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Box>

				{/* 作り方セクション */}
				<Box sx={{ flex: { xs: 1, md: "0 0 60%" } }}>
					<Card sx={{ borderRadius: 3, boxShadow: 2 }}>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								fontWeight={700}
								mb={3}
								color="primary.main"
							>
								作り方
							</Typography>
							<Stack spacing={2}>
								{recipe.steps.map((step, idx) => (
									<Box key={`step-${idx}-${step.slice(0, 10)}`}>
										<Box display="flex" alignItems="flex-start" gap={2}>
											<Box
												sx={{
													minWidth: 32,
													height: 32,
													borderRadius: "50%",
													bgcolor: "primary.main",
													color: "white",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontWeight: 700,
													fontSize: "0.9rem",
													mt: 0.5,
												}}
											>
												{idx + 1}
											</Box>
											<Typography
												variant="body1"
												sx={{
													lineHeight: 1.8,
													flex: 1,
													mt: 0.5,
												}}
											>
												{step}
											</Typography>
										</Box>
										{idx < recipe.steps.length - 1 && (
											<Divider sx={{ my: 2, ml: 5 }} />
										)}
									</Box>
								))}
							</Stack>
						</CardContent>
					</Card>
				</Box>
			</Stack>
		</Box>
	);
}
