import React, { useState, useEffect } from 'react'
// axios
import axios from 'axios';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack, Rating } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

Detail.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

interface Data {
    title: string;
    image_url: string;
    author: string;
    description: string;
}

export default function Detail(props:any) {

    const router = useRouter();
    const id = router.query.id;

    const [data, setData] = useState<Data>(null);

    useEffect(() => {
        axios.get(`http://vuquanghuydev.pythonanywhere.com/api/book/${id}/`)
            .then((response) => {
                setData(response.data);            
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });    

    return (
        <>
            <Head>
                <title>Book detail</title>
            </Head>

            <Container maxWidth='md' sx={{ height: 1, mt: 4, mb: 2, pb: 3 }}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2, md: 4}}>
                    <Box>
                        <img src={ data ? data.image_url : ''} alt='' style={{ width:'450px', maxHeight: '550px', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                        <Typography variant='h4' sx={{ mb: 1, mt: 3}}>
                            {data.title}
                        </Typography>

                        <Rating name='read-only' value={4} readOnly ></Rating>

                        <Typography sx={{ color: 'text.secondary' }}>{data.description}</Typography>

                    </Box>
                </Stack>
            </Container>
        </>
    )
}