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
    name: "Pasta Carbonara",
    category: "Italian",
    tags: ["Pasta", "Creamy"],
    description: "A classic Italian pasta dish with creamy sauce.",
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Pancetta",
      "Parmesan cheese",
      "Black pepper",
    ],
    steps: [
      "Boil pasta.",
      "Cook pancetta.",
      "Mix eggs and cheese.",
      "Combine all and serve.",
    ],
  },
  {
    id: "2",
    name: "Chicken Stir-Fry",
    category: "Asian",
    tags: ["Chicken", "Stir-Fry"],
    description: "Quick and healthy chicken stir-fry.",
    ingredients: [
      "Chicken breast",
      "Vegetables",
      "Soy sauce",
      "Garlic",
      "Ginger",
    ],
    steps: [
      "Slice chicken and veggies.",
      "Stir-fry chicken.",
      "Add veggies and sauce.",
      "Serve hot.",
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
  const [ingredients, setIngredients] = React.useState(recipe.ingredients.join("\n"));
  const [steps, setSteps] = React.useState(recipe.steps.join("\n"));

  return (
    <Box maxWidth={600} mx="auto">
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Edit Recipe
        </Typography>
        <Stack spacing={2}>
          <TextField label="Title" value={name} onChange={e => setName(e.target.value)} fullWidth />
          <TextField label="Category" value={category} onChange={e => setCategory(e.target.value)} fullWidth />
          <TextField label="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} fullWidth />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline minRows={2} />
          <TextField label="Ingredients (one per line)" value={ingredients} onChange={e => setIngredients(e.target.value)} fullWidth multiline minRows={3} />
          <TextField label="Steps (one per line)" value={steps} onChange={e => setSteps(e.target.value)} fullWidth multiline minRows={3} />
          <Button variant="contained" color="primary" sx={{ borderRadius: 2, mt: 2 }}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
} 