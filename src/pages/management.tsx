import { paramCase } from 'change-case';
import React, { useState, useRef ,useEffect } from 'react';
// framer-motion
import { m } from 'framer-motion';
// axios
import axios from 'axios';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../components/table';
// layouts
import SimpleLayout from '../layouts/simple';
import MainLayout from '../layouts/main';
// import { parseJSON } from 'date-fns';
//toast
// import { toast } from 'wc-toast'

// ----------------------------------------------------------------------

Management.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

interface IBook {
  image_url: string;
  title: string;
  author: string;
  description: string;
  price: string;
  quantity_in_stock: number;
  publication_date: Date;
}

interface IBookUpdate {
  id: string;
  reviews: string[];
  history: string[];
  image_url: string;
  title: string;
  author: string;
  description: string;
  price: string;
  quantity_in_stock: number;
  publication_date: Date;
}

type RowDataType = {
  id: number;
  title: string;
  image: string;
  author: string;
};

const TABLE_HEAD = [
  { id: 'id', label: 'Id', align: 'left' },
  { id: 'image', label: 'Image', align: 'center' },
  { id: 'book', label: 'Book', align: 'center' },
  { id: 'author', label: 'Author', align: 'center' },
  { id: '' },
];

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  // boxShadow: 24,
  p: 4
};

export default function Management() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'calories',
  });

  // Tablet
  const [tableData, setTableData] = useState<RowDataType[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Comfirm
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openComfirm, setOpenComfirm] = useState(false);
  const handleOpenComfirm = (id: any) => {
    setSelectedRowId(id);
    setOpenComfirm(true);
  };
  const handleCloseComfirm = () => setOpenComfirm(false);

  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [autoCloseTimeout, setAutoCloseTimeout] = useState(null);

  // New modal
  const [openNewModal, setOpenNewModal] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const handleClickOpenNewModal = (scrollType: DialogProps['scroll']) => () => {
    setOpenNewModal(true);
    setScroll(scrollType);
  };
  const handleCloseNewModal = () => { setOpenNewModal(false) };
  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (openNewModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [openNewModal]);

  // Edit modal
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [scrollEidtModal, setScrollEditModal] = useState<DialogProps['scroll']>('paper');
  const handleClickEditModal = (scrollType: DialogProps['scroll'], row: any) => () => {
    setFormEdit(row);
    setOpenEditModal(true);
    setScrollEditModal(scrollType);
  };
  const handleCloseEditModal = () => { setOpenEditModal(false) };
  const descriptionElementRefEditModal = useRef<HTMLElement>(null);
  useEffect(() => {
    if (openEditModal) {
      const { current: descriptionElement } = descriptionElementRefEditModal;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [openEditModal]);

  // Form data
  const [formNew, setFormNew] = useState<IBook>({ image_url: '', title: '', author: '', description: '', price: '', quantity_in_stock: 0, publication_date: null})
  // const [formEdit, setFormEdit] = useState<IBookUpdate>({ id: null, reviews: [], history: [], image_url: '', title: '', author: '', description: '', price: '', quantity_in_stock: 0, publication_date: null})
  const [formEdit, setFormEdit] = useState<IBookUpdate | null>(null);
  // From new
  const handleNewSubmit = async () => {
    const { title, image_url, author, description, price, quantity_in_stock, publication_date, } = formNew;
    const publication_date_formatted = formatDate(publication_date);
    const quantity_in_stock_formatted = Number(quantity_in_stock);
    const data = { title, author, description, price, quantity_in_stock: quantity_in_stock_formatted, publication_date: publication_date_formatted, image_url };
    const body = {"title": data.title ,"author": data.author, "description": data.description, "price": data.price, "quantity_in_stock": data.quantity_in_stock, "publication_date": data.publication_date, "image_url": data.image_url}
    try {
      const response = await axios.post('https://vuquanghuydev.pythonanywhere.com/api/book/', body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchData();
      setFormNew({ image_url: '', title: '', author: '', description: '', price: '', quantity_in_stock: 0, publication_date: null })
    } catch (error) {
      console.error('Error posting book:', error);
    }    
  }
  // Form edit
  const handleEditSubmit = async () => {
    const { id, title, image_url, author, description, price, quantity_in_stock, publication_date } = formEdit;
    const publication_date_formatted = formatDate(publication_date);
    const quantity_in_stock_formatted = Number(quantity_in_stock);
    const review = [];
    const history = [];
    const data = { review, history, title, author, description, price, quantity_in_stock: quantity_in_stock_formatted, publication_date: publication_date_formatted, image_url };
    // const body = {"title": data.title ,"author": data.author, "description": data.description, "price": data.price, "quantity_in_stock": data.quantity_in_stock, "publication_date": data.publication_date, "image_url": data.image_url}
    try {
      const response = await axios.put(`https://vuquanghuydev.pythonanywhere.com/api/book/${id}/`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchData();
      setAlertMessage('Success');
      setShowAlert(true);
      setAutoCloseTimeout(setTimeout(() => {
        setShowAlert(false);
      }, 2000)); // Tự động đóng sau 2 giây
      setFormNew({ image_url: '', title: '', author: '', description: '', price: '', quantity_in_stock: 0, publication_date: null });
      handleCloseNewModal();
    } catch (error) {
      console.error('Error posting book:', error);
    }    

    // alert(id)
  }

  // Format date
  function formatDate(inputDate: Date) {
    const date = new Date(inputDate);
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Cộng thêm 1 vì tháng bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://vuquanghuydev.pythonanywhere.com/api/book/');
      setTableData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 34 : 54;

  const handleDelete = async () => {
    try {
      if (selectedRowId) {
        const response = await axios.delete(`https://vuquanghuydev.pythonanywhere.com/api/book/${selectedRowId}/`);
        setAlertMessage('Success');
        setShowAlert(true);
        fetchData();
        setSelectedRowId(null); // Đặt lại selectedRowId thành null sau khi xóa thành công.
        setAutoCloseTimeout(setTimeout(() => {
        setShowAlert(false);
      }, 2000)); // Tự động đóng sau 2 giây
      }
      setOpenComfirm(false); // Đóng modal sau khi xóa
    } catch (error) {
      setAlertMessage('Error when deleting: ', error.message); // Đặt nội dung thông báo lỗi
      setShowAlert(true); // Hiển thị thông báo lỗi
      }
  }

  return (
    <>
      <Head>
        <title> Management: Product List </title>
      </Head>

      {showAlert && (
        <Alert
          severity={alertMessage.includes('Error') ? 'error' : 'success'} // Xác định loại Alert dựa trên nội dung
          onClose={() => setShowAlert(false)} // Đóng Alert khi người dùng nhấn nút đóng
        >
          {alertMessage}
        </Alert>
      )}

      <Dialog open={openComfirm} onClose={handleCloseComfirm}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button  onClick={handleCloseComfirm}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color='error'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewModal} onClose={handleCloseNewModal}>
        <DialogTitle>New Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new book into the store
          </DialogContentText>
          <TextField fullWidth margin="dense" id="outlined-basic" name="image" label="Image" variant="outlined" value={formNew.image_url} onChange={ (e)=> setFormNew({...formNew, image_url: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="title" label="Title" variant="outlined" value={formNew.title} onChange={ (e)=> setFormNew({...formNew, title: e.target.value})} required />
          <DesktopDatePicker
            inputFormat="dd-MM-yyyy"
            label="Release"
            value={formNew.publication_date}
            minDate={new Date('1000-01-01')}
            onChange={ (newDate)=> setFormNew({...formNew, publication_date: newDate})}
            renderInput={(params) => <TextField fullWidth margin="dense" {...params} margin="normal" required />}
          />
          <TextField fullWidth margin="dense" id="outlined-basic" name="description" label="Description" multiline rows={4} maxRows={4} value={formNew.description} onChange={ (e)=> setFormNew({...formNew, description: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="author" label="Author" variant="outlined" value={formNew.author} onChange={ (e)=> setFormNew({...formNew, author: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="price" label="Price" variant="outlined" value={formNew.price} onChange={ (e)=> setFormNew({...formNew, price: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="stock" label="Stock" type='number' variant="outlined" value={formNew.quantity_in_stock} onChange={ (e)=> setFormNew({...formNew, quantity_in_stock: e.target.value})} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleNewSubmit} variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" id="outlined-basic" name="image" label="Image" variant="outlined" value={formEdit ? formEdit.image_url : ''} onChange={ (e)=> setFormEdit({ ...formEdit, image_url: e.target.value,}) } required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="title" label="Title" variant="outlined" value={formEdit ? formEdit.title : ''} onChange={ (e)=> setFormEdit({...formEdit, title: e.target.value})} required />
          <DesktopDatePicker
            inputFormat="dd-MM-yyyy"
            label="Release"
            value={formEdit ? formEdit.publication_date : ''}
            minDate={new Date('1100-01-01')}
            onChange={ (newDate)=> setFormEdit({...formEdit, publication_date: newDate})}
            renderInput={(params) => <TextField fullWidth margin="dense" {...params} margin="normal" required />}
          />
          <TextField fullWidth margin="dense" id="outlined-basic" name="description" label="Description" multiline rows={4} maxRows={4} value={formEdit ? formEdit.description : '' } onChange={ (e)=> setFormEdit({...formEdit, description: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="author" label="Author" variant="outlined" value={formEdit ? formEdit.author : '' } onChange={ (e)=> setFormEdit({...formEdit, author: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="price" label="Price" variant="outlined" value={formEdit ? formEdit.price : '' } onChange={ (e)=> setFormEdit({...formEdit, price: e.target.value})} required />
          <TextField fullWidth margin="dense" id="outlined-basic" name="stock" label="Stock" type='number' variant="outlined" value={formEdit ? formEdit.quantity_in_stock : '' } onChange={ (e)=> setFormEdit({...formEdit, quantity_in_stock: e.target.value})} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <Container sx={{ my: 5 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom={'20px'} >
          <Grid item xs={9}>
            {/* <Typography variant="h4">Book management</Typography> */}
          </Grid>
          <Grid item xs={3} textAlign="right">
            {/* <Button startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
              New book
            </Button> */}
            <Button startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpenNewModal('paper')} sx={{ mr: 2 }}>
            New book
            </Button>
          </Grid>
        </Grid>

        <Stack spacing={3}>
          <Card>
            {/* <SortingSelecting /> */}
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              {/* <TableSelectedAction
                dense={dense}
                // numSelected={selected.length}
                // rowCount={tableData.length}
                // onSelectAllRows={(checked) =>
                //   onSelectAllRows(
                //     checked,
                //     tableData.map((row) => row.id)
                //   )
                // }
                // action={
                //   <Tooltip title="Delete">
                //     <IconButton color="primary">
                //       <Iconify icon="eva:trash-2-outline" />
                //     </IconButton>
                //   </Tooltip>
                // }
              /> */}

              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    // onSelectAllRows={(checked) =>
                    //   onSelectAllRows(
                    //     checked,
                    //     tableData.map((row) => row.id)
                    //   )
                    // }
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          hover
                          key={row.id}
                          // onClick={() => onSelectRow(row.id)}
                          // selected={selected.includes(row.id)} // visited row
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox checked={selected.includes(row.id)} />
                          </TableCell> */}
                          <TableCell> {row.id} </TableCell>
                          <TableCell align="center">image</TableCell>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">{row.author}</TableCell>
                          <TableCell align="center">
                            <Button color="primary" onClick={handleClickEditModal('paper', row)} sx={{ mr: 2 }}>
                              <Iconify icon="eva:edit-outline" />
                            </Button>
                            <Button color="error" onClick={() => handleOpenComfirm(row.id)}>
                              <Iconify icon="ant-design:delete-outlined" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                    />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            {mounted && (
              <TablePaginationCustom
                count={dataFiltered.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                //
                dense={dense}
                onChangeDense={onChangeDense}
              />
            )}
          </Card>
        </Stack>
      </Container>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: RowDataType[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  return inputData;
}
