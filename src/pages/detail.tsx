import React, { useState, useEffect } from 'react'
// axios
import axios from 'axios';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Button, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack, Rating, Skeleton } from '@mui/material';
// Component
import BookComment from 'src/sections/book/BookComment';
import BookReview from 'src/sections/book/BookReview';
// layouts
import MainLayout from '../layouts/main';
// import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------

Detail.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

interface Data {
    title: string;
    image_url: string;
    author: string;
    description: string;
    price: string;
}

export default function Detail(props:any) {

    const TABS = [
        {
            value: 'reviews',
            label: 'Reviews',
            component:  <BookReview />,
        },
        {
            value: 'comment',
            label: 'Comment',
            component: <BookComment />,
        },
    ];

    const router = useRouter();
    const id = router.query.id;

    const [data, setData] = useState<Data | null>(null);
    const [currentTab, setCurrentTab] = useState('reviews');


    useEffect(() => {
        axios.get(`https://vuquanghuydev.pythonanywhere.com/api/book/${id}/`)
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
                {
                    data ?
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2, md: 4}}>
                            <Box sx={{width: {xs: '100%', md: '50%'}}}>
                                <img src={ data.image_url } alt={data.title} style={{ width:'100%', maxHeight: '550px', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{width: {xs: '100%', md: '50%'}}}>
                                <Typography variant='h4' sx={{ mb: 1, mt: 3}}>
                                    {data ? data.title : ''}
                                </Typography>

                                <Typography sx={{ mb: 3, mt: 3}}>
                                    {data ? data.author : ''}
                                </Typography>

                                <Rating value={4} sx={{ mb: 3, mt: 0}} readOnly />

                                <Typography sx={{ color: 'text.secondary' }}>{data ? data.description : ''}</Typography>

                                <Button variant="outlined" sx={{ mt: '30px', height: '50px' }}>{data ? `${( Number(data.price) / 1 )} VND` : 'Đang cập nhật'}</Button>
                            </Box>
                        </Stack>
                    :
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2, md: 4}}>
                            <Box>
                                <Skeleton variant="rectangular" style={{ width:'450px', height: '550px' }} />
                            </Box>
                            <Box>
                                <Typography variant="h4"> <Skeleton width={300}/> </Typography>

                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </Box>
                        </Stack>
                }

                    <Card sx={{ mt: '40px' }}>
                        <Tabs
                            value={currentTab}
                            onChange={(event, newValue) => setCurrentTab(newValue)}
                            sx={{ px: 3, bgcolor: 'background.neutral' }}
                        >
                            {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} label={tab.label} />
                            ))}
                        </Tabs>

                        <Divider />

                        {TABS.map(
                            (tab) =>
                            tab.value === currentTab && (
                                <Box
                                key={tab.value}
                                sx={{
                                    ...(currentTab === 'description' && {
                                    p: 3,
                                    }),
                                }}
                                >
                                {tab.component}
                                </Box>
                            )
                        )}
                        </Card>
            </Container>
        </>
    )
}