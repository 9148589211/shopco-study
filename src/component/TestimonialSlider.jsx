import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
  Collapse
} from '@mui/material';
import { ArrowBack, ArrowForward, CheckCircle, ExpandMore, ExpandLess } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  {
    name: 'Sarah M.',
    verified: true,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    name: 'Alex K.',
    verified: true,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    name: 'James L.',
    verified: true,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    avatar: 'https://i.pravatar.cc/100?img=3'
  },
  {
    name: 'Lisa W.',
    verified: true,
    text: "Shop.co is my go-to fashion destination now! The quality, affordability, and variety are unmatched.",
    avatar: 'https://i.pravatar.cc/100?img=4'
  }
];

const TestimonialSlider = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const cardsPerPage = isXs ? 1 : isMd ? 2 : 3;
  const [startIndex, setStartIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - cardsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + cardsPerPage, testimonials.length - cardsPerPage)
    );
  };

  const toggleExpand = (index) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, sm: 6 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
          position: 'relative',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.6rem', sm: '2.25rem' },
            textAlign: 'center',
            letterSpacing: '-0.5px',
            textTransform: 'uppercase'
          }}
        >
          OUR HAPPY CUSTOMERS
        </Typography>
        <Box sx={{ position: { xs: 'static', sm: 'absolute' }, right: { sm: 0 } }}>
          <IconButton onClick={handlePrev} aria-label="previous">
            <ArrowBack />
          </IconButton>
          <IconButton onClick={handleNext} aria-label="next">
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={3} justifyContent="center">
        {testimonials
          .slice(startIndex, startIndex + cardsPerPage)
          .map((testimonial, index) => {
            const globalIndex = startIndex + index;
            const isExpanded = globalIndex === expandedIndex;

            return (
              <Grid item key={globalIndex} xs={12} sm={6} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    maxWidth: 360,
                    mx: 'auto',
                    borderRadius: 3,
                    boxShadow: '0px 0px 0px 1px #E4E7EC',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    px: 2.5,
                    py: 2,
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          fontSize="small"
                          sx={{
                            color: '#FEC84B',
                            fontSize: '20px',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.2)' }
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 36, height: 36, mr: 1 }} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                        }}
                      >
                        {testimonial.name}
                        {testimonial.verified && (
                          <CheckCircle sx={{ color: '#12B76A', fontSize: '16px', ml: 1 }} />
                        )}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#667085',
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        lineHeight: 1.6,
                      }}
                    >
                      “{isExpanded ? testimonial.text : testimonial.text.slice(0, 120)}{testimonial.text.length > 120 && !isExpanded ? '...' : ''}”
                    </Typography>

                    {testimonial.text.length > 120 && (
                      <Box sx={{ mt: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => toggleExpand(globalIndex)}
                        >
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default TestimonialSlider;
