import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
} from "@mui/material";

const ProductCard = ({
  product,
  imageFit = "cover",
  onClick,
  showButton = true,
}) => {
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 5,
        },
        cursor: onClick ? "pointer" : "default",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f9f9f9",
          aspectRatio: "3 / 4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: imageFit,
            width: "100%",
            height: "100%",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/300x400/EEE/333?text=${encodeURIComponent(
              product.name
            )}`;
          }}
        />
      </Box>

      <CardContent sx={{ px: 2, py: 2.5 }}>
        <Typography variant="h6" fontWeight="600" mb={1}>
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={product.rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" ml={1}>
            {product.rating}/5
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>

          {product.oldPrice && (
            <>
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                ${product.oldPrice.toFixed(2)}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#FF3333",
                  color: "#fff",
                  borderRadius: 1,
                  px: 1,
                  py: 0.2,
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                -{discountPercentage}%
              </Box>
            </>
          )}
        </Box>

        {showButton && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            View Product
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
