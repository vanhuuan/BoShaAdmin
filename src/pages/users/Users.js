import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { Label } from '@mui/icons-material';
import { userServices } from '../../services/users.services';

const blue = '#89D5C9'
const orange = '#FF8357'

const Users = () => {
    const token = localStorage.getItem("AccessToken")
    const navigate = useNavigate()

    const onUserOrderClick = (e, row) => {
        e.stopPropagation();
        navigate('/userOrder', { state: { id: row.userId } });
    };

    const onChangeStatusClick = async (e, row) => {
        e.stopPropagation();
        var token = localStorage.getItem("AccessToken")
        if (window.confirm(`Bạn có chắc muốn đổi trạng thái người dùng ${row.name}`)) {
            await userServices.changeUserState(row.userId)
            fetchData()
        }
    };

    const onDeleteClick = async (e, row) => {
        e.stopPropagation();
        var token = localStorage.getItem("AccessToken")
        if (window.confirm(`Bạn có chắc muốn xóa người dùng ${row.name}`)) {
            await userServices.deleteUsser(row.userId)
            fetchData()
        }
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 50, sortable: false },
        { field: 'name', headerName: 'Tên', width: 200, sortable: false },
        { field: 'email', headerName: 'Email', width: 200, sortable: false },
        { field: 'address', headerName: 'Địa chỉ', width: 200, sortable: false },
        {
            field: 'phoneNumber',
            headerName: 'Số điện thoại',
            width: 110,
            sortable: false,
        },
        { field: 'gender', headerName: 'Giới tính', width: 100, sortable: false },
        { field: 'status', headerName: 'Trạng thái', width: 120, sortable: false },
        {
            field: 'Đơn hàng',
            headerName: 'Đơn hàng',
            description: 'Xem danh sách đơn hàng.',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return <IconButton sx={{ color: blue }}
                    onClick={(e) => onUserOrderClick(e, params.row)}
                    variant="contained">
                    <VisibilityIcon></VisibilityIcon>
                </IconButton>
            }
        },
        {
            field: 'Action',
            headerName: 'Action',
            description: 'Xem danh sách đơn hàng.',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <div>
                        <span>
                            <IconButton sx={{ color: blue }}
                                onClick={(e) => onChangeStatusClick(e, params.row)}
                                variant="contained">
                                <NotInterestedIcon>
                                </NotInterestedIcon>
                            </IconButton>
                        </span>
                        <span>
                            <IconButton sx={{ color: orange }}
                                onClick={(e) => onDeleteClick(e, params.row)}
                                variant="contained">
                                <DeleteIcon>
                                </DeleteIcon>
                            </IconButton>
                        </span>
                    </div>)
            }
        },
    ];

    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [queryString, setQueryString] = useState("All")
    const [queryType, setQueryType] = useState("All")
    const [sortType, setSortType] = useState("Asc")
    const [sortBy, setSortBy] = useState("Name")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = "";
        if (queryString == null || queryString == "") {
            setQueryString("All");
        }
        if (queryType.toString() == "All") {
            response = await await userServices.getUserPaging(pageState.page, pageState.pageSize, queryType, "All", sortBy, sortType)
        } else if (queryString) {
            response = await await userServices.getUserPaging(pageState.page, pageState.pageSize, queryType, queryString, sortBy, sortType)
            if (response.data) {
                const json = response.data
                setPageState(old => ({ ...old, isLoading: false, data: json.cards, total: json.total }))
            }
        } else {
            alert("Query string cannot be null or empty")
            return;
        }
        if (response.data) {
            const json = response.data
            console.log(json)
            setPageState(old => ({ ...old, isLoading: false, data: json.users, total: json.total }))
        }
    }
    useEffect(() => {
        fetchData()
    }, [pageState.page, pageState.pageSize])
    return (
        <div>
            <Box>
                <Paper
                    component="form"
                    className="search-container"
                >
                    <Box>
                        <Typography sx={{ ml: 2, mb: 1 }}>Lọc theo: </Typography>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={queryType}
                            label="Search feld"
                            onChange={e => { setQueryType(e.target.value) }}
                            className='option'
                            size="small"
                        >
                            <MenuItem value={"All"}>Tất cả</MenuItem>
                            <MenuItem value={"Name"}>Tên</MenuItem>
                            <MenuItem value={"Email"}>Email</MenuItem>
                            <MenuItem value={"PhoneNumber"}>Số điện thoại</MenuItem>
                        </Select>
                        <TextField
                            placeholder="Text to search"
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
                    <Box>
                        <Typography sx={{ ml: 2, mb: 1 }}>Sắp xếp theo: </Typography>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={sortBy}
                            label="Sort field"
                            onChange={e => { setSortBy(e.target.value) }}
                            className='option'
                            size="small"
                        >
                            <MenuItem value={"Name"}>Tên</MenuItem>
                            <MenuItem value={"PhoneNumber"}>Số điện thoại</MenuItem>
                            <MenuItem value={"Email"}>Email</MenuItem>
                        </Select>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={sortType}
                            label="Sort type"
                            onChange={e => { setSortType(e.target.value); }}
                            className='option'
                            size="small"
                        >
                            <MenuItem value={"Asc"}>Tăng dần</MenuItem>
                            <MenuItem value={"Desc"}>Giảm dần</MenuItem>
                        </Select>
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

export default Users