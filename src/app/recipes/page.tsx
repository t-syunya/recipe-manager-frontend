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
import Link from "next/link";

const recipes = [
	{
		id: "1",
		name: "カルボナーラ",
		category: "イタリアン",
		tags: "パスタ, クリーミー",
	},
	{
		id: "2",
		name: "チキン炒め",
		category: "中華",
		tags: "鶏肉, 炒め物",
	},
	{
		id: "3",
		name: "野菜カレー",
		category: "インド",
		tags: "ベジタリアン, カレー",
	},
	{
		id: "4",
		name: "ビーフタコス",
		category: "メキシカン",
		tags: "牛肉, タコス",
	},
	{
		id: "5",
		name: "サーモンとアスパラガス",
		category: "シーフード",
		tags: "サーモン, ヘルシー",
	},
];

export default function RecipeListPage() {
	return (
		<Box>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				mb={3}
			>
				<Typography variant="h4" fontWeight={700}>
					レシピ一覧
				</Typography>
				<Button
					component={Link}
					href="/recipes/new"
					variant="contained"
					color="primary"
					sx={{ borderRadius: 2 }}
				>
					新しいレシピ
				</Button>
			</Box>
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>レシピ名</TableCell>
							<TableCell>カテゴリ</TableCell>
							<TableCell>タグ</TableCell>
							<TableCell>操作</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{recipes.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.category}</TableCell>
								<TableCell>{row.tags}</TableCell>
								<TableCell>
									<Button
										component={Link}
										href={`/recipes/${row.id}`}
										variant="outlined"
										size="small"
										sx={{ borderRadius: 2 }}
									>
										詳細
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
