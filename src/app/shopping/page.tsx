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

const initialItems = [
	{ name: "Spaghetti", quantity: "2 packs" },
	{ name: "Eggs", quantity: "6" },
	{ name: "Chicken breast", quantity: "500g" },
	{ name: "Soy sauce", quantity: "1 bottle" },
];

export default function ShoppingListPage() {
	const [items, setItems] = React.useState(initialItems);
	const [name, setName] = React.useState("");
	const [quantity, setQuantity] = React.useState("");

	const handleAdd = () => {
		if (!name.trim()) return;
		setItems([...items, { name, quantity }]);
		setName("");
		setQuantity("");
	};

	const handleDelete = (idx: number) => {
		setItems(items.filter((_, i) => i !== idx));
	};

	return (
		<Box>
			<Typography variant="h4" fontWeight={700} mb={3}>
				Shopping List
			</Typography>
			<Stack direction="row" spacing={2} mb={2}>
				<TextField
					label="Item"
					value={name}
					onChange={(e) => setName(e.target.value)}
					size="small"
				/>
				<TextField
					label="Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					size="small"
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAdd}
					sx={{ borderRadius: 2 }}
				>
					Add
				</Button>
			</Stack>
			<TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Item</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((row, idx) => (
							<TableRow key={`${row.name}-${row.quantity}-${idx}`}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.quantity}</TableCell>
								<TableCell>
									<Button
										variant="outlined"
										color="error"
										size="small"
										sx={{ borderRadius: 2 }}
										onClick={() => handleDelete(idx)}
									>
										Delete
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
