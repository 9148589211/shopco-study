import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, useMediaQuery, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../component/ProductCard";
import Sidebar from "../component/Sidebar";
import productsData from "../data/mockData";

function ProductListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // ✅ Apply selected dress style filter from URL
  useEffect(() => {
    const selectedStyle = new URLSearchParams(location.search).get("style");
    if (selectedStyle) {
      const filtered = productsData.filter(
        (product) =>
          product.dressStyle.toLowerCase() === selectedStyle.toLowerCase()
      );
      setFilteredProducts(filtered);
      setPage(1);
    } else {
      setFilteredProducts(productsData);
    }
  }, [location.search]);

  // ✅ Apply filters from sidebar
  const handleFilter = ({ price, sizes, colors, dressStyles }) => {
    const filtered = productsData.filter((product) => {
      const inPrice =
        product.priceRange &&
        product.priceRange[0] <= price[1] &&
        product.priceRange[1] >= price[0];

      const inSize =
        !sizes?.length || sizes.some((s) => product.size.includes(s));

      const inColor =
        !colors?.length || colors.includes(product.color);

      const inStyle =
        !dressStyles?.length || dressStyles.includes(product.dressStyle);

      return inPrice && inSize && inColor && inStyle;
    });

    setFilteredProducts(filtered);
    setPage(1);
  };

  // ✅ Sort products based on dropdown selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.priceRange[0] - b.priceRange[0];
      case "Price: High to Low":
        return b.priceRange[1] - a.priceRange[1];
      case "Newest First":
        return new Date(b.date) - new Date(a.date); // Assuming `date` field
      default:
        return 0; // Most Popular or no sorting
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box mt={7}>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} px={isMobile ? 1 : 2}>
        {/* Sidebar */}
        <Box
          sx={{
            width: isMobile ? "100%" : isTablet ? 220 : 295,
            mr: isMobile ? 0 : 3,
            mb: isMobile ? 3 : 0,
          }}
        >
          <Sidebar onFilter={handleFilter} />
        </Box>

        {/* Main content */}
        <Box flexGrow={1}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={isMobile ? "column" : "row"}
            mb={2}
            gap={1}
          >
            <Typography variant="h6" fontWeight="bold">
              Product Listing
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">Sort by:</Typography>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  aria-label="Sort products"
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Newest First">Newest First</option>
                </select>
              </Box>
            </Box>
          </Box>

          {/* Product Grid */}
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={2}
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                height={isMobile ? 300 : isTablet ? 320 : 340}
                onClick={() =>
                  navigate("/product-detail", { state: { product } })
                }
              />
            ))}

            {/* Pagination Controls */}
            <Box
              gridColumn={{
                xs: "1 / span 2",
                sm: "1 / span 2",
                md: "1 / span 3",
              }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <IconButton
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                sx={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  color: "black",
                  width: 150,
                  height: 40,
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography>Previous</Typography>
              </IconButton>

              <Pagination
                count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                hidePrevButton
                hideNextButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "5px",
                    minWidth: 36,
                    fontWeight: "bold",
                  },
                }}
              />

              <IconButton
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                    )
                  )
                }
                disabled={page === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                sx={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  color: "black",
                  width: 150,
                  height: 40,
                }}
              >
                <Typography>Next</Typography>
                <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductListing;
