import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function HelpPage() {
  return (
    <Box maxWidth={600} mx="auto">
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Help
        </Typography>
        <Typography variant="body1" mb={2}>
          よくある質問やアプリの使い方はこちらをご覧ください。
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Q. レシピを追加するには？" secondary="→ サイドバーの『New Recipe』または『Search & Register』から追加できます。" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Q. レシピの編集・削除は？" secondary="→ 各レシピ詳細ページから編集できます。削除機能は今後追加予定です。" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Q. ショッピングリストの使い方は？" secondary="→ 必要な材料を追加・削除できます。" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
} 