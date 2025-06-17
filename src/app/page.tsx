import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Typography variant="h3" fontWeight={700} mb={2}>
        Welcome to Recipe Manager
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={4}>
        管理・検索・登録が簡単なレシピアプリ
      </Typography>
      <Button
        component={Link}
        href="/recipes"
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 3, px: 4 }}
      >
        レシピ一覧へ
      </Button>
    </Box>
  );
}
