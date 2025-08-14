import { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Breadcrumbs,
  Link,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";

const sizes = [
  "XX-small", "X-small", "Small", "Medium",
  "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large",
];

const colors = [
  "Green", "Red", "Yellow", "Orange",
  "SkyBlue", "Blue", "Purple", "Pink", "White", "Black",
];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];
function Sidebar({ onFilter }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showFilters, setShowFilters] = useState(!isMobile);

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const toggleItem = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const applyFilters = () => {
    onFilter({
      price: priceRange,
      sizes: selectedSizes,
      colors: selectedColors,
      dressStyles: selectedStyles,
    });
  };
  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize: 14, mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Typography color="text.primary" fontWeight={500} fontSize={14}>Casual</Typography>
      </Breadcrumbs>

      {/* Filter Box */}
      <Box
        sx={{
          width: "100%",
          minHeight: isMobile ? "auto" : "1220px",
          maxHeight: isMobile ? "40vh" : "none",
          overflowY: isMobile ? "auto" : "visible",
          padding: 2,
          border: "1px solid #eee",
          borderRadius: 4,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography fontWeight="bold">Filters</Typography>
          <TuneIcon fontSize="small" onClick={toggleFilters} sx={{ cursor: "pointer" }} />
        </Box>

        <Divider sx={{ mb: 1 }} />

        {showFilters && (
          <>
            {/* Price Filter */}
            <Accordion defaultExpanded elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box px={1}>
                  <Slider
                    value={priceRange}
                    onChange={(e, newVal) => setPriceRange(newVal)}
                    min={0}
                    max={500}
                    valueLabelDisplay="auto"
                    sx={{
                      color: "black",
                      height: 4,
                      "& .MuiSlider-thumb": {
                        width: 20, height: 20,
                        backgroundColor: "black",
                        border: "2px solid white",
                      },
                      "& .MuiSlider-track": { backgroundColor: "black" },
                      "& .MuiSlider-rail": { backgroundColor: "#e0e0e0" },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">${priceRange[0]}</Typography>
                    <Typography variant="body2">${priceRange[1]}</Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Color Filter */}
            <Typography fontWeight="bold" sx={{ mt: 3, mb: 1 }}>Colors</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {colors.map((color) => (
                <Box
                  key={color}
                  onClick={() => toggleItem(color, selectedColors, setSelectedColors)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "1px solid #999",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: selectedColors.includes(color) ? "2px solid grey" : "none",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  {selectedColors.includes(color) && (
                    <CheckIcon
                      sx={{
                        color: color.toLowerCase() === "black" ? "white" : "black",
                        fontSize: 18,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Size Filter */}
            <Typography fontWeight="bold" sx={{ mt: 3, mb: 1 }}>Size</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => toggleItem(size, selectedSizes, setSelectedSizes)}
                  variant={selectedSizes.includes(size) ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    minWidth: "auto",
                    padding: "6px 16px",
                    backgroundColor: selectedSizes.includes(size) ? "black" : "#f0f0f0",
                    color: selectedSizes.includes(size) ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor: selectedSizes.includes(size) ? "#333" : "#ddd",
                    },
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Dress Styles */}
            <Accordion elevation={0} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">Dress Style</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List disablePadding>
                  {dressStyles.map((style) => (
                    <ListItemButton
                      key={style}
                      onClick={() => toggleItem(style, selectedStyles, setSelectedStyles)}
                      selected={selectedStyles.includes(style)}
                      sx={{
                        pl: 1, pr: 1,
                        justifyContent: "space-between",
                        borderRadius: 1,
                        mb: 0.5,
                      }}
                    >
                      <ListItemText primary={style} />
                      <ChevronRightIcon />
                    </ListItemButton>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Apply Button */}
            <Button
              variant="contained"
              onClick={applyFilters}
              sx={{
                mt: 2,
                borderRadius: 62,
                pt: 1, pb: 1, px: 3,
                width: "100%",
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
              }}
            >
              Apply Filter
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;
