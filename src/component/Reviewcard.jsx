import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
  Avatar,
  useTheme,
  Collapse,
  Button
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useResponsive from '../component/Meadiaquiry';

const Reviewcard = ({
  rating = 4.5,
  name = 'Jane Doe',
  description = '',
  date = 'Aug 6, 2025',
  avatarUrl = '',
}) => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Character limit before collapse
  const maxLength = 150;
  const isLong = description.length > maxLength;
  const previewText = description.slice(0, maxLength) + '...';

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card
      sx={{
        maxWidth: isMobile ? '100%' : 700,
        mx: 'auto',
        my: 2,
        p: 1,
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'start' }}>
        {/* Top Row: Rating + Menu Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            sx={{
              color: '#FFD700',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            aria-label={`Rating: ${rating} stars`}
          />
          <IconButton size="small" aria-label="More options">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        {/* Reviewer Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{ width: 36, height: 36, mr: 1 }}
          />
          <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight={600}>
            {name}
          </Typography>
        </Box>

        {/* Review Text */}
        <Typography variant="body2" color="text.secondary">
          {!isLong ? (
            description
          ) : (
            <>
              <Collapse in={expanded} collapsedSize={70}>
                {expanded ? description : previewText}
              </Collapse>
              <Button
                onClick={handleToggle}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  mt: 1,
                  padding: 0,
                  color: theme.palette.primary.main,
                }}
              >
                {expanded ? 'Read less' : 'Read more'}
              </Button>
            </>
          )}
        </Typography>

        {/* Date */}
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', pt: 2, display: 'block' }}
        >
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Reviewcard;
