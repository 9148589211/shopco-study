import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

import { useNavigate } from "react-router-dom";
import PromotionalBanner from "./PromotionalBanner";
import ShopDropdown from "./ShopDropdown";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <>
      {/* 🔝 Promotional Banner */}
      <PromotionalBanner />

      {/* 🧭 Navigation Bar */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          top: "40px",
          width: "100%",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 4, md: 6 },
            py: 1,
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: { xs: 1, sm: 2, md: 3 },
            overflowX: "auto",
          }}
        >
          {/* 🛍️ Logo */}
          <Typography
            onClick={() => navigate("/")}
            sx={{
              fontFamily: "Integral CF, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "18px", sm: "24px" },
              lineHeight: 1,
              whiteSpace: "nowrap",
              pr: 2,
              pl: 1,
              cursor: "pointer",
            }}
          >
            SHOP.CO
          </Typography>

          {/* 🧾 Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            <ShopDropdown />
            {["On Sale", "New Arrivals", "Brands"].map((text) => (
              <Typography
                key={text}
                variant="body2"
                sx={{
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  color: "text.primary",
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          {/* 🔄 Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 🔎 Search Bar */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f1f1f1",
                px: 3,
                height: "40px",
                borderRadius: "62px",
                minWidth: "300px",
                maxWidth: "700px",
                flexGrow: 1,
                mr: 2,
              }}
            >
              <SearchIcon sx={{ fontSize: 20, color: "gray" }} />
              <InputBase
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchSubmit}
                fullWidth
                sx={{ fontSize: "14px", ml: 1 }}
              />
            </Box>
          )}

          {/* 👤 User Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined sx={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <AccountCircleOutlined sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;





