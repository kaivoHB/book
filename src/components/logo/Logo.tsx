import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// import bixso from '../../../public/logo/bixso.jpeg'
// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <img style={{borderRadius: '50%'}} src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/387137289_122125665332033075_4833314601378122701_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHV2noxVlC2SsA749vEiOmAaCSsfLq5_s9oJKx8urn-z9CGMRkq6XLrmMDtrje2Cv2N4PcJRT7WbaGSIV31yDQw&_nc_ohc=dnbtZPLqFd8AX8Dnt25&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfBwUh4_uCsZUiDBVdh0hcs6FQhKa170rl8YE1b8pvtiSA&oe=65407B94' alt="" />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
