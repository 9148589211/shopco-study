import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ShopDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuEl, setSubmenuEl] = useState(null);

  const isMobile = useMediaQuery('(max-width:500px)');
  const isMenuOpen = Boolean(anchorEl);
  const isSubmenuOpen = Boolean(submenuEl);

  const handleMainClick = (e) => setAnchorEl(e.currentTarget);
  const handleMainClose = () => {
    setAnchorEl(null);
    setSubmenuEl(null);
  };

  const handleSubToggle = (e) => {
    if (isMobile) {
      setSubmenuEl(submenuEl ? null : e.currentTarget);
    } else {
      setSubmenuEl(e.currentTarget);
    }
  };

  return (
    <>
      <Button
        onClick={handleMainClick}
        color="inherit"
        endIcon={<ExpandMoreIcon />}
        sx={{ textTransform: 'none' }}
      >
        Shop
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMainClose}
        MenuListProps={{ onMouseLeave: isMobile ? undefined : handleMainClose }}
      >
        <MenuItem
          onClick={handleSubToggle}
          onMouseEnter={!isMobile ? handleSubToggle : undefined}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Men's <ChevronRightIcon fontSize="small" />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={submenuEl}
        open={isSubmenuOpen}
        onClose={handleMainClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{ onMouseLeave: isMobile ? undefined : handleMainClose }}
      >
        {['T-Shirts', 'Shirts', 'Pants', 'Shoes', 'Accessories'].map((item) => (
          <MenuItem key={item} onClick={handleMainClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ShopDropdown;