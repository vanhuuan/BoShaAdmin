import { useNavigate } from "react-router-dom";
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { categoriseService } from "../../services/categories.services";
import theme from "../../theme";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";

const blue = '#4F709C'
const orange = '#FF8357'

const Categories = () => {
    const navigate = useNavigate()

    const onEditClick = async (e, row) => {
        setChoseId(row.id)
        e.stopPropagation();
        setOpen(true)
    };

    const onDeleteClick = async (e, row) => {
        e.stopPropagation();
        if (window.confirm(`Bạn có chắc muốn xóa thể loại ${row.name}`)) {
            await categoriseService.deleteCategory(row.id)
            fetchData()
        }
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 100, sortable: false, align:"center", headerAlign: 'center' },
        { field: 'name', headerName: 'Tên', width: 300, sortable: false },
        { field: 'description', headerName: 'Miêu tả', width: 500, sortable: false },
        {
            field: 'Chỉnh sửa',
            headerName: 'Chỉnh sửa',
            description: 'Chỉnh sửa thể loại',
            sortable: false,
            width: 150,
            align:"center",
            headerAlign: 'center',
            renderCell: (params) => {
                return <IconButton sx={{ color: blue }}
                    onClick={(e) => onEditClick(e, params.row)}
                    variant="contained">
                    <EditIcon></EditIcon>
                </IconButton>
            }
        },
        {
            field: 'Xóa',
            headerName: 'Xóa',
            description: 'Xóa thể loại',
            sortable: false,
            width: 150,
            align:"center",
            renderCell: (params) => {
                return <IconButton sx={{ color: orange }}
                    onClick={(e) => onDeleteClick(e, params.row)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            }
        }
    ];

    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [queryString, setQueryString] = useState("All")
    const [open, setOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [choseId, setChoseId] = useState("0")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = "";
        if (queryString == null || queryString == "") {
            setQueryString("All");
        }
        if (queryString) {
            response = await categoriseService.getPagingCategories(pageState.page - 1, pageState.pageSize, queryString)
            console.log(response)
            if (response.data) {
                const json = response.data
                setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
            }
        } else {
            alert("Query string cannot be null or empty")
            return;
        }
        if (response.data) {
            const json = response.data
            console.log(json)
            setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
        }
    }

    useEffect(() => {
        fetchData()
    }, [pageState.page, pageState.pageSize])

    const handleSave = (data) => {
        console.log(data)
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
        setAddOpen(false)
    }

    const OnAddCategory = () => {
        setAddOpen(true)
    }
    return (
        <div>
            <EditCategory
                id={choseId}
                isOpen={open}
                handleSave={handleSave}
                handleClose={handleClose} />
            <AddCategory
                isOpen={addOpen}
                handleClose={handleClose} />
            <Box>
                <Button variant="contained" size="large"
                    onClick={OnAddCategory}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: 'fit-content',
                        marginBottom: 2,
                        alignSelf: 'end'
                    }}
                >Thêm Thể loại</Button>
                <Paper
                    component="form"
                    className="search-container"
                    sx={{ display: 'flex', marginBottom: "0.5em", padding: "0.5em", justifyContent: "space-between" }}
                >
                    <Box>
                        <TextField
                            placeholder="Tìm kiếm tên thể loại"
                            inputProps={{ 'aria-label': 'Text To Search' }}
                            value={queryString}
                            onChange={e => { setQueryString(e.target.value) }}
                            variant='outlined'
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={fetchData}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </Paper>
            </Box>
            <Box>
                <div className='table-container'>
                    <DataGrid
                        autoHeight
                        rows={pageState.data}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        rowsPerPageOptions={[10, 30, 50, 70, 100]}
                        pagination
                        page={pageState.page - 1}
                        pageSize={pageState.pageSize}
                        paginationMode="server"
                        onPageChange={(newPage) => {
                            setPageState(old => ({ ...old, page: newPage + 1 }))
                        }}
                        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                        columns={columns}
                    />
                </div>
            </Box>
        </div >
    );
}

export default Categories