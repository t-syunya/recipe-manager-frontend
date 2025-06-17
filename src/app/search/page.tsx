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

const sampleResults = [
	{ id: "1", name: "Pasta Carbonara", category: "Italian" },
	{ id: "2", name: "Chicken Stir-Fry", category: "Asian" },
];

export default function SearchPage() {
	const [keyword, setKeyword] = React.useState("");
	const [results, setResults] = React.useState(sampleResults);

	const handleSearch = () => {
		// 仮: 検索ロジックは未実装
		setResults(
			sampleResults.filter((r) =>
				r.name.toLowerCase().includes(keyword.toLowerCase()),
			),
		);
	};

	return (
		<Box>
			<Typography variant="h4" fontWeight={700} mb={3}>
				Search & Register
			</Typography>
			<Stack direction="row" spacing={2} mb={2}>
				<TextField
					label="Keyword"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					size="small"
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSearch}
					sx={{ borderRadius: 2 }}
				>
					Search
				</Button>
				<Button
					component={Link}
					href="/recipes/new"
					variant="outlined"
					color="primary"
					sx={{ borderRadius: 2 }}
				>
					New Recipe
				</Button>
			</Stack>
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Recipe</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.category}</TableCell>
								<TableCell>
									<Button
										component={Link}
										href={`/recipes/${row.id}`}
										variant="outlined"
										size="small"
										sx={{ borderRadius: 2 }}
									>
										View
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
