import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from '@mui/material';

import HeroSection from './HeroSection';
import BrandsBadge from './BrandsBadge';
import ProductSection from './ProductSection';
import DressStyleSection from './DressStyleSection';
import TestimonialSlider from './TestimonialSlider';

// 🎨 Custom MUI Theme
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#6C7275' },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#6C7275',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
        },
      },
    },
  },
});

const Homepage = () => {
  const navigate = useNavigate();

  const handleProductsClick = (product) => {
    navigate('/product-detail', { state: { product } });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        {/* Hero & Brand Section */}
        <HeroSection />
        <BrandsBadge />

        {/* Product & Testimonial Sections */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            px: { xs: 2, sm: 3, md: 6 },
            py: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <ProductSection
            title="NEW ARRIVALS"
            categoryFilter="New Arrivals"
            onProductClick={handleProductsClick}
          />
          <ProductSection
            title="TOP SELLING"
            categoryFilter="Top Selling"
            onProductClick={handleProductsClick}
          />
          <DressStyleSection />
          <TestimonialSlider />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Homepage;
