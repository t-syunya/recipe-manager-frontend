"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const recipes = [
	{
		id: "1",
		name: "カルボナーラ",
		category: "イタリアン",
		tags: "パスタ, クリーミー",
		createdAt: "2024-01-15",
		difficulty: "簡単",
		cookingTime: "20分",
	},
	{
		id: "2",
		name: "チキン炒め",
		category: "中華",
		tags: "鶏肉, 炒め物",
		createdAt: "2024-01-20",
		difficulty: "普通",
		cookingTime: "15分",
	},
	{
		id: "3",
		name: "野菜カレー",
		category: "インド",
		tags: "ベジタリアン, カレー",
		createdAt: "2024-01-10",
		difficulty: "簡単",
		cookingTime: "30分",
	},
	{
		id: "4",
		name: "ビーフタコス",
		category: "メキシカン",
		tags: "牛肉, タコス",
		createdAt: "2024-01-25",
		difficulty: "普通",
		cookingTime: "25分",
	},
	{
		id: "5",
		name: "サーモンとアスパラガス",
		category: "シーフード",
		tags: "サーモン, ヘルシー",
		createdAt: "2024-01-18",
		difficulty: "難しい",
		cookingTime: "35分",
	},
];

export default function RecipeListPage() {
	const [searchText, setSearchText] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState("全て");
	const [selectedDifficulty, setSelectedDifficulty] = React.useState("全て");
	const [sortBy, setSortBy] = React.useState("name");

	// フィルター選択肢を取得
	const categories = [
		"全て",
		...new Set(recipes.map((recipe) => recipe.category)),
	];
	const difficulties = [
		"全て",
		...new Set(recipes.map((recipe) => recipe.difficulty)),
	];
	const sortOptions = [
		{ value: "name", label: "レシピ名順" },
		{ value: "createdAt", label: "作成日順" },
		{ value: "cookingTime", label: "調理時間順" },
		{ value: "category", label: "カテゴリ順" },
	];

	// すべてのフィルターをリセット
	const clearAllFilters = () => {
		setSearchText("");
		setSelectedCategory("全て");
		setSelectedDifficulty("全て");
		setSortBy("name");
	};

	// フィルターが設定されているかチェック
	const hasActiveFilters =
		searchText ||
		selectedCategory !== "全て" ||
		selectedDifficulty !== "全て" ||
		sortBy !== "name";

	// Selectコンポーネント共通のスタイル
	const selectIconStyle = {
		"& .MuiSelect-icon": {
			color: "primary.main",
		},
		"&:hover .MuiSelect-icon": {
			color: "primary.dark",
		},
		"&.Mui-focused .MuiSelect-icon": {
			color: "primary.dark",
		},
	};

	// 絞り込み・ソート処理
	const filteredRecipes = React.useMemo(() => {
		const filtered = recipes.filter((recipe) => {
			const matchesCategory =
				selectedCategory === "全て" || recipe.category === selectedCategory;
			const matchesDifficulty =
				selectedDifficulty === "全て" ||
				recipe.difficulty === selectedDifficulty;
			const matchesSearch =
				searchText === "" ||
				recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
				recipe.tags.toLowerCase().includes(searchText.toLowerCase());
			return matchesCategory && matchesDifficulty && matchesSearch;
		});

		// ソート処理
		return filtered.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "createdAt":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					); // 新しい順
				case "cookingTime":
					return (
						Number.parseInt(a.cookingTime, 10) -
						Number.parseInt(b.cookingTime, 10)
					); // 短い順
				case "category":
					return a.category.localeCompare(b.category);
				default:
					return 0;
			}
		});
	}, [searchText, selectedCategory, selectedDifficulty, sortBy]);

	return (
		<Box>
			{/* ページタイトル */}
			<Typography variant="h4" fontWeight={700} mb={3}>
				レシピ一覧
			</Typography>

			{/* 絞り込み機能と新規作成ボタン */}
			<Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 1 }}>
				<Box
					display="flex"
					alignItems={{ xs: "flex-start", sm: "center" }}
					justifyContent="space-between"
					flexDirection={{ xs: "column", sm: "row" }}
					gap={2}
					mb={2}
				>
					<Typography variant="h6" fontWeight={600}>
						絞り込み
					</Typography>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						alignItems={{ xs: "stretch", sm: "center" }}
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						{hasActiveFilters && (
							<Button
								onClick={clearAllFilters}
								variant="outlined"
								size="small"
								startIcon={<ClearIcon />}
								sx={{
									borderRadius: 2,
									px: 2,
									py: 0.5,
									fontSize: "0.8rem",
									fontWeight: 500,
									borderColor: "warning.main",
									color: "warning.main",
									"&:hover": {
										borderColor: "warning.dark",
										bgcolor: "warning.light",
										color: "warning.dark",
									},
									alignSelf: { xs: "center", sm: "auto" },
								}}
							>
								絞り込みをクリア
							</Button>
						)}
						<Button
							component={Link}
							href="/recipes/new"
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							sx={{
								borderRadius: 2,
								px: 2.5,
								py: 1,
								fontSize: "0.9rem",
								fontWeight: 600,
								boxShadow: 2,
								"&:hover": {
									boxShadow: 4,
									transform: "translateY(-1px)",
								},
								transition: "all 0.2s ease-in-out",
							}}
						>
							新しいレシピを追加
						</Button>
					</Stack>
				</Box>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
					<TextField
						label="レシピ名・タグで検索"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						size="small"
						sx={{ minWidth: 250 }}
						placeholder="例: パスタ、ヘルシー"
					/>
					<FormControl size="small" sx={{ minWidth: 150 }}>
						<InputLabel>カテゴリ</InputLabel>
						<Select
							value={selectedCategory}
							label="カテゴリ"
							onChange={(e) => setSelectedCategory(e.target.value)}
							sx={selectIconStyle}
						>
							{categories.map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel>難易度</InputLabel>
						<Select
							value={selectedDifficulty}
							label="難易度"
							onChange={(e) => setSelectedDifficulty(e.target.value)}
							sx={selectIconStyle}
						>
							{difficulties.map((difficulty) => (
								<MenuItem key={difficulty} value={difficulty}>
									{difficulty}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl size="small" sx={{ minWidth: 150 }}>
						<InputLabel>並び順</InputLabel>
						<Select
							value={sortBy}
							label="並び順"
							onChange={(e) => setSortBy(e.target.value)}
							sx={selectIconStyle}
						>
							{sortOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>

				{/* 絞り込み結果の表示 */}
				<Box>
					<Typography variant="body2" color="text.secondary" mb={1}>
						{filteredRecipes.length}件のレシピが見つかりました
					</Typography>
					{hasActiveFilters && (
						<Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
							{searchText && (
								<Chip
									label={`検索: ${searchText}`}
									size="small"
									onDelete={() => setSearchText("")}
									color="primary"
									variant="filled"
									sx={{
										bgcolor: "primary.main",
										color: "white",
										"& .MuiChip-deleteIcon": {
											color: "white",
											"&:hover": {
												color: "grey.200",
											},
										},
									}}
								/>
							)}
							{selectedCategory !== "全て" && (
								<Chip
									label={`カテゴリ: ${selectedCategory}`}
									size="small"
									onDelete={() => setSelectedCategory("全て")}
									variant="filled"
									sx={{
										bgcolor: "#008080",
										color: "white",
										"& .MuiChip-deleteIcon": {
											color: "white",
											"&:hover": {
												color: "grey.200",
											},
										},
									}}
								/>
							)}
							{selectedDifficulty !== "全て" && (
								<Chip
									label={`難易度: ${selectedDifficulty}`}
									size="small"
									onDelete={() => setSelectedDifficulty("全て")}
									color="info"
									variant="filled"
									sx={{
										bgcolor: "info.main",
										color: "white",
										"& .MuiChip-deleteIcon": {
											color: "white",
											"&:hover": {
												color: "grey.200",
											},
										},
									}}
								/>
							)}
							{sortBy !== "name" && (
								<Chip
									label={`並び順: ${sortOptions.find((opt) => opt.value === sortBy)?.label || sortBy}`}
									size="small"
									onDelete={() => setSortBy("name")}
									color="warning"
									variant="filled"
									sx={{
										bgcolor: "warning.main",
										color: "white",
										"& .MuiChip-deleteIcon": {
											color: "white",
											"&:hover": {
												color: "grey.200",
											},
										},
									}}
								/>
							)}
						</Stack>
					)}
				</Box>
			</Paper>
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow sx={{ bgcolor: "grey.100" }}>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								レシピ名
							</TableCell>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								カテゴリ
							</TableCell>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								難易度
							</TableCell>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								調理時間
							</TableCell>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								タグ
							</TableCell>
							<TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
								編集
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRecipes.length > 0 ? (
							filteredRecipes.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:hover": {
											bgcolor: "action.hover",
											cursor: "pointer",
										},
									}}
								>
									<TableCell>
										<Link
											href={`/recipes/${row.id}`}
											style={{ textDecoration: "none" }}
										>
											<Typography
												component="span"
												sx={{
													color: "primary.main",
													fontWeight: 600,
													cursor: "pointer",
													"&:hover": {
														textDecoration: "underline",
														color: "primary.dark",
													},
												}}
											>
												{row.name}
											</Typography>
										</Link>
									</TableCell>
									<TableCell>{row.category}</TableCell>
									<TableCell>
										<Chip
											label={row.difficulty}
											size="small"
											color={
												row.difficulty === "簡単"
													? "success"
													: row.difficulty === "普通"
														? "info"
														: "warning"
											}
											variant="outlined"
										/>
									</TableCell>
									<TableCell>{row.cookingTime}</TableCell>
									<TableCell>{row.tags}</TableCell>
									<TableCell>
										<Link
											href={`/recipes/${row.id}/edit`}
											style={{ textDecoration: "none" }}
										>
											<Button
												variant="outlined"
												size="small"
												sx={{
													borderRadius: 2,
													color: "text.secondary",
													borderColor: "grey.300",
													"&:hover": {
														borderColor: "primary.main",
														color: "primary.main",
													},
												}}
											>
												編集
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} align="center" sx={{ py: 4 }}>
									<Typography color="text.secondary">
										条件に一致するレシピが見つかりませんでした
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
