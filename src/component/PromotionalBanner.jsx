import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PromotionalBanner = ({ onSignUpClick }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        component="section"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 38,
          bgcolor: 'black',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          zIndex: (theme) => theme.zIndex.appBar + 2,
          gap: 2,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          Sign up and get 20% off your first order.
        </Typography>

        <Button
          variant="text"
          onClick={onSignUpClick}
          sx={{
            textDecoration: 'underline',
            color: 'white',
            minWidth: 'auto',
            p: 0,
            fontSize: 13,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          Sign Up Now
        </Button>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: 'white', ml: 'auto' }}
          aria-label="Close banner"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Slide>
  );
};

export default PromotionalBanner;
