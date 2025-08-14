import React, { useState } from 'react';
import { Box, Typography, Grid, Button, useTheme } from '@mui/material';
import mockProducts from '../data/mockData.jsx';
import ProductCard from './ProductCard.jsx';

const ProductSection = ({ title, categoryFilter, onProductClick }) => {
  const theme = useTheme();
  const initialDisplayCount = 4;

  const allProductsInCategory = mockProducts.filter(
    (product) => product.category === categoryFilter
  );

  const [displayAll, setDisplayAll] = useState(false);

  const productsToDisplay = displayAll
    ? allProductsInCategory
    : allProductsInCategory.slice(0, initialDisplayCount);

  const handleViewAllClick = () => {
    setDisplayAll(true);
  };

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3, md: 6 },
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mb: { xs: 4, sm: 6 },
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>

      {/* Product Grid */}
      <Box
        sx={{
          maxHeight: displayAll ? { md: 600 } : 'auto',
          overflowY: displayAll ? { md: 'auto' } : 'visible',
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {productsToDisplay.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
                showButton={false} // Optional: hide inner button
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* View All Button */}
      {!displayAll && allProductsInCategory.length > initialDisplayCount && (
        <Button
          variant="outlined"
          onClick={handleViewAllClick}
          sx={{
            mt: { xs: 4, sm: 6 },
            px: { xs: 3, sm: 4 },
            py: { xs: 1.2, sm: 1.5 },
            borderRadius: 2,
            textTransform: 'none',
            border: '2px solid',
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': {
              bgcolor: theme.palette.text.primary,
              color: theme.palette.background.default,
              borderColor: theme.palette.text.primary,
            },
          }}
        >
          View All
        </Button>
      )}
    </Box>
  );
};

export default ProductSection;


