import React, { useState, useEffect } from 'react'
// next
import Link from 'next/link';
// axios
import axios from 'axios';
// @mui
import {
    Alert,
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Grid,
    Typography,
    TextField,
    Stack,
    Card,
    CardHeader,
    Table,
    Tooltip,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    IconButton,
    TableContainer,
    Modal,
    DialogProps,
    Skeleton
} from '@mui/material';
// component
import Image from '../../components/image';
import TextMaxLine from '../../components/text-max-line';

interface Data {
    id: string;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

export default function BookReview() {
    
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        axios.get('https://vuquanghuydev.pythonanywhere.com/api/book/')
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
            <Container sx={{ my: 5 }}>
                <Box gap={3} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)',lg: 'repeat(4, 1fr)', }} >
                
                {data ? data.slice(0,4).map((item) => (
                    <Card sx={{ '&:hover .add-cart-btn': { opacity: 1, }, }} >
                        <Box sx={{ position: 'relative', p: 1 }}>
                        <Image alt={item.title} src={item.image_url} ratio="1/1" sx={{ borderRadius: 1.5 }} />
                    </Box>

                    <Stack spacing={2.5} sx={{ p: 3 }}>
                        <Link href='/' style={{ textDecoration: 'none', color: 'black' }}>
                            <TextMaxLine line={1}>
                                {item.title}
                            </TextMaxLine>
                        </Link>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
                            <Box component="span">{item.price}</Box>
                        </Stack>
                        </Stack>
                    </Stack>
                    </Card>
                ))
                    
                    :
                    ''
                }
                

                </Box>
            </Container>
        </>
    )
}

