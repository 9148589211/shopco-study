import React, { useState, useContext } from "react";
import Detailsalsolikecards from "./Detailsalsolikecards";
import Reviewcard from "./Reviewcard";
import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import { CartContext } from "../context/CartContext";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Box,
  Button,
  Rating,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { brown, indigo, teal } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSection from "./ProductSection";

function Detaisofproduct() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) setSize(newSize);
  };

  const handleProductsClick = (product) => {
    navigate("/product-detail", { state: { product } });
  };

  if (!product) return <p>No product selected</p>;

  return (
    <Box className="margin">
      {/* Product Display Section */}
      <Box className="d-flex flex-row ms-2 mt-5 Detaisofproduct-details">
        <Box className="d-flex flex-column Detaisofproduct-small-img">
          <img src={product.image} alt={product.name} />
          <img src="https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001.jpg" alt="alt1" />
          <img src="https://www.jiomart.com/images/product/original/rvgfb0b5qw/..." alt="alt2" />
        </Box>

        <Box className="Detaisofproduct-display-img">
          <img src={product.image} alt={product.name} />
        </Box>

        <Box className="d-flex flex-column ms-3 Detaisofproduct-details-options">
          <Typography variant="h4">{product.name}</Typography>
          <Box className="d-flex flex-row align-items-center">
            <Rating value={product.rating} precision={0.5} readOnly sx={{ color: "#FFD700" }} />
            <Typography className="ms-2">{product.rating}/5</Typography>
          </Box>

          <Box className="d-flex flex-row align-items-baseline">
            <Typography variant="h5" className="me-2">${product.price}</Typography>
            <Typography sx={{ color: "grey.500", textDecoration: "line-through", fontWeight: 500 }}>
              ${product.oldPrice}
            </Typography>
            <Typography className="p-1 ms-2 off">-40%</Typography>
          </Box>

          <Typography>{product.description}</Typography>

          <hr />

          <Typography>Select colors</Typography>
          <Box className="d-flex flex-row">
            {[brown[800], teal[900], indigo[900]].map((color, index) => (
              <Button key={index} variant="outlined" sx={{ backgroundColor: color, minWidth: 0, width: 48, height: 48, borderRadius: "50%", marginRight: 1 }}></Button>
            ))}
          </Box>

          <hr />

          <Typography>Choose Size</Typography>
          <ToggleButtonGroup
            value={size}
            exclusive
            onChange={handleSizeChange}
            sx={{ gap: 2, '& .MuiToggleButtonGroup-grouped': { borderRadius: '999px !important', border: 'none' } }}
          >
            {["Small", "Medium", "Large", "X-Large"].map((label) => (
              <ToggleButton
                key={label}
                value={label}
                sx={{
                  borderRadius: "999px",
                  px: 4,
                  py: 1,
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor: "#f0f0f0",
                  color: "#888",
                  '&.Mui-selected': { backgroundColor: "#000", color: "#fff" },
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <hr />

          <Box className="d-flex flex-row mt-3">
            <Box className="me-3">
              <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f3f3f3", borderRadius: "999px", px: 2 }}>
                <Button onClick={handleDecrement}>-</Button>
                <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                <Button onClick={handleIncrement}>+</Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={() => {
                if (!size) return alert("Please select a size");
                addToCart({ ...product, size, quantity });
                navigate("/cart");
              }}
              sx={{ backgroundColor: "#000", borderRadius: "999px", width: "500px", py: 1.5, textTransform: "none", fontWeight: 500 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box className="d-flex flex-column ms-2 mt-5 Detaisofproductreview">
        <Tabs variant="fullWidth" centered textColor="inherit">
          <Tab label="Product Details" />
          <Tab label="Rating & Reviews" />
          <Tab label="FAQs" />
        </Tabs>

        <Box className="d-flex flex-row mt-2 ms-4 justify-content-between">
          <Box className="d-flex align-items-center">
            <Typography variant="h5" className="me-2">All Reviews</Typography>
            <Typography>(451)</Typography>
          </Box>

          <Box className="d-flex flex-row align-items-baseline me-2">
            <TuneTwoToneIcon />
            <Dropdown>
              <Dropdown.Toggle className="rounded-pill px-4 py-2 bg-secondary ms-3 me-3 border-0">
                Latest
              </Dropdown.Toggle>
            </Dropdown>
            <Button variant="outlined" className="rounded-pill px-4 py-2 bg-dark text-white">
              Write a review
            </Button>
          </Box>
        </Box>

        <Box className="d-flex flex-row flex-wrap justify-content-around mt-4">
          {[...Array(6)].map((_, i) => (
            <Reviewcard
              key={i}
              rating={2}
              name={["Samantha D.", "Alex M.", "Ethan R.", "Olivia P.", "Liam K.", "Ava H."][i]}
              discription="This is a sample review."
              date={`Posted on August ${14 + i}, 2023`}
            />
          ))}
        </Box>

        <Box className="d-flex flex-row flex-wrap justify-content-center mt-3">
          <Button variant="outlined" className="rounded-pill px-4 py-2 border-secondary text-dark">
            Load more reviews
          </Button>
        </Box>
      </Box>

      {/* You Might Also Like */}
      <Box className="d-flex flex-column ms-4 mt-5 Detaisofproduct-similar-products">
        <ProductSection
          title="YOU MIGHT ALSO LIKE"
          categoryFilter="New Arrivals"
          onProductClick={handleProductsClick}
        />
      </Box>
    </Box>
  );
}

export default Detaisofproduct;