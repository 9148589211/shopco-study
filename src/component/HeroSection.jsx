import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import modelImage from '../assets/model.png';
import bigStar from '../assets/bigstar.png';
import smallStar from '../assets/smallstar.png';

const stats = [
  { count: '200+', label: 'International Brands' },
  { count: '2,000+', label: 'High-Quality Products' },
  { count: '30,000+', label: 'Happy Customers' },
];

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 'auto', md: '663px' },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#f8f9fa',
        mt: { xs: 8, md: 12 },
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={modelImage}
        alt="Model"
        sx={{
          width: '100%',
          height: { xs: 'auto', md: '100%' },
          objectFit: 'cover',
        }}
      />

      {/* Floating Content */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '40px', md: '100px' },
          left: { xs: '20px', md: '100px' },
          zIndex: 10,
          color: '#000',
          maxWidth: { xs: '90%', md: '550px' },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Integral CF, sans-serif',
            fontWeight: 1000,
            fontSize: { xs: '30px', md: '50px' },
            lineHeight: { xs: '40px', md: '50px' },
            mb: { xs: 2, md: 3 },
          }}
        >
          FIND CLOTHES <br />
          THAT MATCHES <br />
          YOUR STYLE
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '13px', sm: '14px' },
            lineHeight: '24px',
            color: '#666',
            mb: { xs: 3, md: 4 },
          }}
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#000',
            color: '#fff',
            px: 5,
            py: 1,
            fontSize: '1rem',
            borderRadius: '50px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#333',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            },
          }}
        >
          Shop Now
        </Button>

        {/* Stats Section */}
        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 4 },
          }}
        >
          {stats.map((item, index) => (
            <Box key={index} sx={{ minWidth: '120px' }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, fontSize: { xs: '18px', sm: '20px' } }}
              >
                {item.count}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontSize: '13px' }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Decorative Stars */}
      <Box
        component="img"
        src={bigStar}
        alt="Big Star"
        sx={{
          position: 'absolute',
          top: { xs: '20px', md: '100px' },
          right: { xs: '10px', md: '60px' },
          width: { xs: '60px', md: '104px' },
        }}
      />
      <Box
        component="img"
        src={smallStar}
        alt="Small Star"
        sx={{
          position: 'absolute',
          top: { xs: '200px', md: '350px' },
          left: { xs: '60%', md: '750px' },
          width: { xs: '30px', md: '56px' },
        }}
      />
    </Box>
  );
};

export default HeroSection;
