import React, { useState } from 'react'
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

export default function BookComment() {


    return (
        <>
            <Container sx={{ my: 5 }}>
                <Box
                    gap={3}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                >
                    <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
                        <Stack spacing={2} sx={{ p: 3 }}>
                            <Skeleton variant="text" sx={{ width: 0.5 }} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row">
                                <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                                <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                                <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                        </Stack>
                            <Skeleton variant="text" sx={{ width: 40 }} />
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

