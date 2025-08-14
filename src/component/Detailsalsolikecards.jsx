import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../component/Meadiaquiry';

function Detailsalsolikecards({ name, image, rating, price, originalprice, discount }) {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: isMobile ? 250 : 300,
        margin: isMobile ? 0.5 : 1,
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 4,
        }
      }}
    >
      <CardMedia
        component="img"
        alt={name}
        height={isMobile ? "200" : "250"}
        image={image}
      />
      <CardContent sx={{ textAlign: 'start' }}>
        <Typography gutterBottom variant={isMobile ? "h6" : "h5"}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} precision={0.5} readOnly sx={{ color: '#FFD700' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
            {rating}/5
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography variant="h6" fontWeight="bold">${price}</Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              color: 'grey.600',
              textDecoration: 'line-through'
            }}
          >
            ${originalprice}
          </Typography>
          <Typography variant="body2" sx={{ color: 'red', ml: 1 }}>
            -{discount}%
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-start', px: 2, pb: 2 }}>
        <Button variant="outlined" size="small" onClick={(e) => {
          e.stopPropagation(); // Prevent card navigation
          alert('Added to Cart!');
        }}>
          Add to Cart
        </Button>
        <Button variant="text" size="small" onClick={(e) => {
          e.stopPropagation(); // Prevent card navigation
          navigate(`/product/${name.replace(/\s+/g, '-').toLowerCase()}`);
        }}>
          View Product
        </Button>
      </CardActions>
    </Card>
  );
}

export default Detailsalsolikecards;
