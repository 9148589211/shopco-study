import React from 'react';
import { Box, Container } from '@mui/material';

import versace from '../assets/versace.png';
import zara from '../assets/zara.png';
import gucci from '../assets/gucci.png';
import prada from '../assets/prada.png';
import calvinklein from '../assets/calvinklein.png';

const BrandsBadge = () => {
  const brandLogos = [versace, zara, gucci, prada, calvinklein];

  return (
    <Box
      sx={{
        bgcolor: '#000',
        py: { xs: 2, sm: 2.5 },
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          {brandLogos.map((logo, index) => (
            <Box
              key={index}
              component="img"
              src={logo}
              alt={`Brand ${index}`}
              sx={{
                height: { xs: 28, sm: 36, md: 42 },
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                maxWidth: { xs: '70px', sm: '90px', md: '100px' },
                mx: { xs: 1, sm: 2 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BrandsBadge;






