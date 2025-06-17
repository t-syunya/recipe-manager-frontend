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
		name: "Pasta Carbonara",
		category: "Italian",
		tags: "Pasta, Creamy",
	},
	{
		id: "2",
		name: "Chicken Stir-Fry",
		category: "Asian",
		tags: "Chicken, Stir-Fry",
	},
	{
		id: "3",
		name: "Vegetable Curry",
		category: "Indian",
		tags: "Vegetarian, Curry",
	},
	{
		id: "4",
		name: "Beef Tacos",
		category: "Mexican",
		tags: "Beef, Tacos",
	},
	{
		id: "5",
		name: "Salmon with Asparagus",
		category: "Seafood",
		tags: "Salmon, Healthy",
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
					My Recipes
				</Typography>
				<Button
					component={Link}
					href="/recipes/new"
					variant="contained"
					color="primary"
					sx={{ borderRadius: 2 }}
				>
					New Recipe
				</Button>
			</Box>
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Recipe</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Tags</TableCell>
							<TableCell>Actions</TableCell>
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
