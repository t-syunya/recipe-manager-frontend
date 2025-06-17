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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function RecipesSearchPage() {
	const [keyword, setKeyword] = React.useState("");
	const [results, setResults] = React.useState<any[]>([]);
	const [engine, setEngine] = React.useState<string>("");
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	const handleSearch = async () => {
		setLoading(true);
		setError("");
		setResults([]);
		setEngine("");
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`);
			if (!res.ok) throw new Error("検索に失敗しました");
			const data = await res.json();
			setEngine(data.engine);
			if (data.engine === "google") {
				setResults(
					(data.items || []).map((item: any) => ({
						title: item.title,
						url: item.link,
						description: item.snippet,
					})),
				);
			} else if (data.engine === "brave") {
				setResults(
					(data.web?.results || []).map((item: any) => ({
						title: item.title,
						url: item.url,
						description: item.description,
					})),
				);
			} else {
				setResults([]);
			}
		} catch (e: any) {
			setError(e.message || "エラーが発生しました");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box>
			<Typography variant="h4" fontWeight={700} mb={3}>
				レシピ検索・登録
			</Typography>
			<Stack direction="row" spacing={2} mb={2}>
				<TextField
					label="キーワード"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					size="small"
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSearch}
					sx={{ borderRadius: 2 }}
					disabled={loading || !keyword}
				>
					{loading ? "検索中..." : "Web検索"}
				</Button>
				<Button
					component={Link}
					href="/recipes/new"
					variant="outlined"
					color="primary"
					sx={{ borderRadius: 2 }}
				>
					手動で新規登録
				</Button>
			</Stack>
			{error && (
				<Typography color="error" mb={2}>
					{error}
				</Typography>
			)}
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>タイトル</TableCell>
							<TableCell>URL</TableCell>
							<TableCell>説明</TableCell>
							<TableCell>操作</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((row) => (
							<TableRow key={row.url}>
								<TableCell>{row.title}</TableCell>
								<TableCell>
									<a href={row.url} target="_blank" rel="noopener noreferrer">
										{row.url}
									</a>
								</TableCell>
								<TableCell>{row.description}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										size="small"
										color="success"
										sx={{ borderRadius: 2 }}
									>
										登録
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{results.length === 0 && !loading && !error && (
				<Typography color="text.secondary" align="center" mt={2}>
					検索結果がありません
				</Typography>
			)}
			{engine && (
				<Typography color="text.secondary" align="right" mt={1} fontSize={12}>
					Powered by {engine === "google" ? "Google" : "Brave"} Search
				</Typography>
			)}
		</Box>
	);
}
