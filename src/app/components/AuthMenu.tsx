"use client";
import { signOut, useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Settings from "@mui/icons-material/Settings";
import HelpOutline from "@mui/icons-material/HelpOutline";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import Link from "next/link";

export default function AuthMenu() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session) return null;

  return (
    <>
      <IconButton onClick={handleMenu} sx={{ ml: 2 }} size="large">
        <Avatar src={session.user?.image || undefined} alt={session.user?.name || "G"} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
        <MenuItem component={Link} href="/settings" onClick={handleClose}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          <ListItemText>設定</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/help" onClick={handleClose}>
          <ListItemIcon><HelpOutline fontSize="small" /></ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { signOut(); handleClose(); }}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          <ListItemText>サインアウト</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
} 