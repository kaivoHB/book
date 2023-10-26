import { paramCase } from 'change-case';
import React, { useEffect, useState } from 'react'
// axios
import axios from 'axios';
// motion
import { m, useScroll } from 'framer-motion';
// next
import NextLink from 'next/link';
import Head from 'next/head';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Grid, Rating, Card, CardHeader, CardContent, CardActions } from '@mui/material';
// routes
import { PATH_BOOK, PATH_DASHBOARD, PATH_FIGMA_PREVIEW, PATH_FREE_VERSION, PATH_PAGE } from '../../routes/paths';
// @types
import { IBook } from '../../@types/book';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// theme
import { secondaryFont } from '../../theme/typography';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';

import TextMaxLine from '../../components/text-max-line';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

const StyledRoot = styled('div')(({ theme }) => ({
    ...bgGradient({
        color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
        imgUrl: '/assets/background/overlay_2.jpg',
    }),
    [theme.breakpoints.up('md')]: {
        width: '100%',
    },
}));

export default function BookPage() {

    const [hide, setHide] = useState(false);
    const themes = useTheme();
    // const [data, setData] = useState<BookData>(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://vuquanghuydev.pythonanywhere.com/api/book/')
        // axios.get('http://localhost:3333')
            .then((response) => {
                setData(response.data);            
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Book</title>
            </Head>

            <StyledRoot sx={{ ...(hide && { opacity: 0 }) }}>
                {/* <Box sx={{ pt: 6, pb: 1, my: 8, bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'), }}>
                    <Container>
                        <m.div variants={varFade().inUp}>
                            <Typography
                            variant="h2"
                            sx={{
                                mt: 0,
                                mb: 5,
                                ...textGradient(
                                `300deg, ${themes.palette.primary.main} 0%, ${themes.palette.warning.main} 100%`
                                ),
                            }}
                            >
                            Books
                            </Typography>
                        </m.div>
                    </Container>
                </Box> */}

                <Container component={MotionContainer} sx={{ height: 1, mt: 14, mb: 2, pb: 3 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md:12 }}>
                        {data.map(item => (
                            <Grid item xs={4} sm={4} md={4} key={item.id}>
                                <Card>
                                    <img src={item.image_url} style={{width: '100%', maxHeight: '200px', objectFit: 'cover'}}/>
                                    <CardHeader title={item.title} />
                                    <CardContent>
                                        <Link href={`/detail/?id=${item.id}`}>
                                            <TextMaxLine line={2}>
                                                {item.description}
                                            </TextMaxLine>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </StyledRoot>
        </>
    )
}