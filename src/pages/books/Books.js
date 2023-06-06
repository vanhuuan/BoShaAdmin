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
import { Check, CheckBox, CheckBoxOutlineBlank, Label, StarBorder, Unarchive } from '@mui/icons-material';
import { userService } from "../../services/userServices";
import { bookService } from "../../services/book.services";
import abbrNum from "../../services/numberHelper";

const blue = '#89D5C9'
const orange = '#FF8357'

const Books = () => {
    const token = localStorage.getItem("AccessToken")
    const navigate = useNavigate()

    const onBookClick = (e, row) => {
        e.stopPropagation();
        navigate('/book/' + row.id);
    };

    const onDeleteClick = async (e, row) => {
        e.stopPropagation();
        if (window.confirm(`Bạn có chắc muốn ẩn truyện ${row.name}`)) {
            await userService.deleteUsser(row.userId)
            fetchData()
        }
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 50, sortable: false },
        { field: 'name', headerName: 'Tên truyện', width: 300, sortable: false },
        { field: 'numOfChapter', headerName: 'Số chapter', width: 90, sortable: false },
        { field: 'numOfReview', headerName: 'Số lượt đánh giá', width: 90, sortable: false },
        {
            field: 'star', headerName: 'Đánh giá', width: 90, sortable: false,
            renderCell: (params) => {
                return <Typography>{params.row.numOfReview} <StarBorder /></Typography>
            }
        },
        { field: 'numOflike', headerName: 'Số lượt theo dõi', width: 90, sortable: false },
        { field: 'numOfView', headerName: 'Số lượt xem', width: 90, sortable: false },
        {
            field: 'state', headerName: 'Trạng thái', width: 150, sortable: false,
            renderCell: (params) => {
                switch(params.row.state){
                    case "Finish" : return <Typography>Đã hoàn thành</Typography>
                    case "Unfinish" : return <Typography>Chưa hoàn thành</Typography>
                    case "Susspend" : return <Typography>Tạm hoãn</Typography>
                    case "Block" : return <Typography>Đã chặn</Typography>
                    default : return <Typography>Lỗi trạng thái</Typography>
                }
            }
        },
        {
            field: 'price', headerName: 'Giá', width: 150, sortable: false,
            renderCell: (params) => {
                return <Typography>{abbrNum(params.row.price)}</Typography>
            }
        },
        {
            field: 'Chi tiết',
            headerName: 'Chi tiết',
            description: 'Xem danh thông tin chi tiết truyện',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return <IconButton sx={{ color: blue }}
                    onClick={(e) => onBookClick(e, params.row)}
                    variant="contained">
                    <VisibilityIcon></VisibilityIcon>
                </IconButton>
            }
        },
        {
            field: 'Ẩn truyện',
            headerName: 'Ẩn truyện',
            description: 'Ẩn truyện',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <div>
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
    const [sortBy, setSortBy] = useState("HotAll")
    const [includeAuthor, setIncludeAuthor] = useState(true)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(999999999)
    const [listCategories, setListCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [state, setState] = useState("All")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = "";
        if (queryString == null || queryString == "") {
            setQueryString("All");
        }
        if (queryType.toString() == "All") {
            response = await bookService.findBook(pageState.page, pageState.pageSize, "", categories, state, min, max, sortBy, sortType)
        } else if (queryString) {
            response = await bookService.findBook(pageState.page, pageState.pageSize, queryString, categories, state, min, max, sortBy, sortType)
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
            setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
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
                    sx={{ display: 'flex', marginBottom: "0.5em", padding: "0.5em", justifyContent: "space-between" }}
                >
                    <Box>
                        <Typography sx={{ ml: 2, mb: 1 }}>Tìm kiếm: </Typography>
                        <TextField
                            placeholder="Tên truyện"
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
                            id="sortBy"
                            value={sortBy}
                            onChange={e => { setSortBy(e.target.value) }}
                            className='option'
                            size="small"
                            sx={{ marginRight: "0.5em", minWidth: "15em" }}
                        >
                            <MenuItem value={"Newest"}>Cập nhật mới</MenuItem>
                            <MenuItem selected value={"HotAll"}>Xem nhiều nhất</MenuItem>
                            <MenuItem value={"HotDay"}>Xem nhiều nhất hôm nay</MenuItem>
                            <MenuItem value={"HotWeek"}>Xem nhiều nhất tuần</MenuItem>
                            <MenuItem value={"HotMonth"}>Xem nhiều nhất tháng</MenuItem>
                            <MenuItem value={"MostFollow"}>Theo dõi nhiều nhất</MenuItem>
                            <MenuItem value={"MostComment"}>Bình luận nhiều nhất</MenuItem>
                            <MenuItem value={"MostChapter"}>Số chapter nhiều</MenuItem>
                        </Select>
                        <Select
                            id="sortType"
                            value={sortType}
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

export default Books