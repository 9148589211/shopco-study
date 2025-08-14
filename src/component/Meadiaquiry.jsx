import { useMediaQuery } from '@mui/material';

const useResponsive = () => {
  const isMobile = useMediaQuery('(max-width:500px)');
  const isTablet = useMediaQuery('(min-width:501px) and (max-width:768px)');
  const isLaptop = useMediaQuery('(min-width:769px) and (max-width:1200px)');
  const isDesktop = useMediaQuery('(min-width:1201px)');

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useResponsive;
