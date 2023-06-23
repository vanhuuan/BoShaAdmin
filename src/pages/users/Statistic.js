import { Box, Card, Grid, TextField, Typography, styled, TableContainer, Paper, TableHead, TableBody, TableRow, Table, IconButton, CircularProgress, TablePagination, LinearProgress, FormHelperText, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Income from "../../components/charts/income";
import { useState } from "react";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { BarChart, CalendarMonth, Person } from "@mui/icons-material";
import abbrNum from "../../services/numberHelper";
import { useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { statisticServce } from "../../services/statistic.services";
import SearchIcon from '@mui/icons-material/Search';
import { CardSummary, CardBookSummary } from "../../components/charts/CardSumary";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    {
        id: 'name',
        label: 'Tên truyện',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'View',
        label: 'Lượt xem',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Revenue',
        label: 'Doanh thu (VND)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Star',
        label: 'Đánh giá',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'NumOfReview',
        label: 'Số đánh giá',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'NumOfChapter',
        label: 'Số tập',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

const vn_en_lowercase = {
    name: "vn_en_lowercase",
    months: [
        ["january", "Jan"],
        ["february", "Feb"],
        ["march", "Mar"],
        ["april", "Apr"],
        ["may", "May"],
        ["june", "June"],
        ["july", "July"],
        ["august", "Aug"],
        ["september", "Sep"],
        ["october", "Oct"],
        ["november", "Nov"],
        ["december", "Dec"],
    ],
    weekDays: [
        ["saturday", "T7"],
        ["sunday", "CN"],
        ["monday", "T2"],
        ["tuesday", "T3"],
        ["wednesday", "T4"],
        ["thursday", "T5"],
        ["friday", "T6"],
    ],
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    meridiems: [
        ["AM", "sáng"],
        ["PM", "chiều"],
    ],
};

const defaultCardData = {
    "revenue": 220000,
    "afterRevenue": 176000,
    "bestSeller": {
        "id": "643657ba8e27bd8b11654e81",
        "name": "Mình yêu nhau nhé",
        "authorName": "An Văn",
        "authorId": "6429794a900ceafd4f064648",
        "cover": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643657ba8e27bd8b11654e81%2Fcover.png?alt=media&token=92e913c1-c2a3-4429-9233-b3ce1d179c7e",
        "preview": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643657ba8e27bd8b11654e81%2Fpreview.html?alt=media&token=8e4aa532-547f-46f4-a178-0995bc7ebbab",
        "price": 20000,
        "numOfReview": 0,
        "numOfStar": 0,
        "numOfChapter": 26,
        "publishDate": "2023-04-12T07:03:22.214Z",
        "updateDate": "2023-05-09T07:09:38.922Z",
        "category": [
            "Manga"
        ]
    },
    "mostView": {
        "id": "643657cf8e27bd8b11654f08",
        "name": "truyện is the bét",
        "authorName": "An Văn",
        "authorId": "6429794a900ceafd4f064648",
        "cover": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/DefaultCover.png?alt=media&token=8c3ccc1d-1316-46e6-9184-d2d0d2f012bd",
        "preview": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/DefaultPreview.html?alt=media&token=6ffed812-dcf5-423c-96e3-776c1dfcfffc",
        "price": 3,
        "numOfReview": 0,
        "numOfStar": 0,
        "numOfChapter": 26,
        "publishDate": "2023-04-12T07:03:43.62Z",
        "updateDate": "2023-04-12T07:03:43.682Z",
        "category": [
            "643656638e27bd8b116546ca"
        ]
    }
}

export default function UserStatistic(props) {
    const [chartData, setChartData] = useState()
    const [showMore, setShowMore] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [values, setValues] = useState([
        new DateObject().subtract(7, "days"),
        new DateObject()
    ])

    const onChangeDateValue = (value) => {
        if (value.length == 2) {
            setValues(value)
        }
    }

    let navigate = useNavigate()

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    useEffect(() => {
        var dateObj = new Date();
        loadStatisticCard()
        loadChartData(sortChart)
    }, [values])

    const [isLoadingCard, setIsLoadingCard] = useState(true)
    const [cardData, setCardData] = useState(defaultCardData)
    const loadStatisticCard = async () => {
        setIsLoadingCard(true)
        statisticServce.getStatisticCard(values[0].format("MM/DD/YYYY"), values[1].format("MM/DD/YYYY"), props.id).then((rs) => {
            console.log(rs)
            setCardData(rs.data)
            setIsLoadingCard(false)
        })

    }

    const [isLoadingChart, setIsLoadingChart] = useState(true)
    const [sortChart, setSortChart] = useState("View")
    const loadChartData = async (sort) => {
        setIsLoadingChart(true)
        statisticServce.getStatisticChart(values[0].format("MM/DD/YYYY"), values[1].format("MM/DD/YYYY"), sort, props.id)
            .then((rs) => {
                setChartData(rs.data)
                setIsLoadingChart(false)
            })
    }

    const [isLoadingStatisticData, setIsLoadingStatisticData] = useState(true)
    const [statistcData, setStatisticData] = useState({
        "total": 0,
        "pageIndex": 0,
        "pageSize": 10,
        "data": []
    })
    const [sortBy, setSortBy] = useState("View")
    const [sortType, setSortType] = useState("Desc")
    const [statisticDatas, setStatisticDatas] = useState([])
    const loadStatictisData = () => {
        setIsLoadingStatisticData(true)
        statisticServce.getStatisticData(values[0].format("MM/DD/YYYY"), values[1].format("MM/DD/YYYY"), page, rowsPerPage, sortBy, sortType, props.id)
            .then((rs) => {
                setStatisticData(rs.data)
                setStatisticDatas(rs.data.data)
                setIsLoadingStatisticData(false)
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setIsLoadingStatisticData(true)
        statisticServce.getStatisticData(values[0].format("MM/DD/YYYY"), values[1].format("MM/DD/YYYY"), newPage, rowsPerPage, sortBy, sortType, props.id)
            .then((rs) => {
                console.log(newPage, rs.data)
                setStatisticData(rs.data)
                setStatisticDatas(rs.data.data)
                setIsLoadingStatisticData(false)
            })
    };

    return (
        <Box margin={`2em 0`} >
            <Grid container spacing={3}>
                <Grid xs={12}>
                    <div className="container">
                        <Grid container spacing={3}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div style={{ display: "flex" }}>
                                    <Typography>Khoảng thời gian thống kê từ </Typography>
                                    <DatePicker
                                        value={values}
                                        onChange={onChangeDateValue}
                                        range
                                        rangeHover
                                        dateSeparator=" đến "
                                        style={{ width: '110%', margin: "0 0.5em" }}
                                        minDate="2022/1/1"
                                        maxDate={new DateObject()}
                                        locale={vn_en_lowercase}
                                    />
                                    <CalendarMonth style={{ margin: "0 1em" }} />
                                </div>
                            </Grid>
                            {isLoadingCard === false ? <>
                                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                    <CardSummary
                                        title="Tổng thu nhập từ bán truyện"
                                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(cardData.revenue)}
                                        footer={<div>  </div>}
                                    />
                                </Grid>
                                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                    <CardSummary
                                        title="Thu nhập thực tế của người dùng "
                                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(cardData.afterRevenue)}
                                        footer={<div> 80% Tổng thu nhập từ bán truyện  </div>}
                                    />
                                </Grid>

                                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                    {cardData.bestSeller ?
                                        <CardBookSummary
                                            title="Truyện có doanh thu cao nhất"
                                            value={cardData.bestSeller.name}
                                            footer={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                .format(cardData.bestSeller.price)}
                                            img={cardData.bestSeller.cover}
                                        />
                                        :
                                        <CardSummary
                                            title="Trong khoảng thời gian này bạn chưa bán được truyện nào"
                                            value=""
                                            footer={<div></div>}
                                        />
                                    }
                                </Grid>
                                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                    {cardData.mostView ?
                                        <CardBookSummary
                                            title="Truyện có lượt xem nhiều nhất"
                                            value={cardData.mostView.name}
                                            footer={`${abbrNum(cardData.mostView.price)} lượt xem`}
                                            img={cardData.mostView.cover}
                                        />
                                        :
                                        <CardSummary
                                            title="Trong khoảng thời gian này bạn chưa ai xem truyện của bạn cả"
                                            value=""
                                            footer={<div></div>}
                                        />
                                    }
                                </Grid> </>
                                : <LinearProgress variant="primary" />}
                            {isLoadingChart === false ?
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Xắp sếp theo top 10</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-jhelper"
                                            value={sortChart}
                                            label="Xắp sếp theo top 10"
                                            onChange={(e) => {
                                                setSortChart(e.target.value);
                                                loadChartData(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={"View"}>Lượt xem</MenuItem>
                                            <MenuItem value={"Revenue"}>Doanh thu</MenuItem>
                                            <MenuItem value={"Star"}>Đánh giá</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Income chartsData={chartData} title={`Thống kê ${sortChart}`} label={`${sortChart}`}></Income>
                                </Grid>
                                : <LinearProgress variant="primary" />}
                            {showMore ?
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Xắp sếp theo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={sortBy}
                                            label="Xắp sếp theo"
                                            onChange={(e) => {
                                                setSortBy(e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"Star"}>Đánh giá</MenuItem>
                                            <MenuItem value={"Review"}>Số đánh giá</MenuItem>
                                            <MenuItem value={"Revenue"}>Doanh thu</MenuItem>
                                            <MenuItem value={"View"}>Lượt xem</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Xắp sếp</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={sortType}
                                            label="Xắp sếp"
                                            onChange={(e) => {
                                                setSortType(e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"Asc"}>Tăng dần</MenuItem>
                                            <MenuItem value={"Desc"}>Giảm dần</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton aria-label="find" size="large" onClick={(e) => { loadStatictisData() }} sx={{ marginTop: "0.5em" }}>
                                        <SearchIcon sx={{ width: "1em", height: "1em" }} />
                                    </IconButton>
                                    {isLoadingStatisticData === false ?
                                        <TableContainer component={Paper}>
                                            <Table sx={{}} aria-label="customized table" stickyHeader >
                                                <TableHead>
                                                    <TableRow>
                                                        {columns.map((column) => (
                                                            <StyledTableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
                                                            >
                                                                {column.label}
                                                            </StyledTableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {statisticDatas.map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell align="left">{row.name.toLocaleString('vi-VN')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.numOfView.toLocaleString('vi-VN')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.revenue.toLocaleString('vi-VN')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.star.toLocaleString('vi-VN')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.numOfReview.toLocaleString('vi-VN')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.numOfChapter.toLocaleString('vi-VN')}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        : <LinearProgress />}
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20]}
                                        component="div"
                                        count={statistcData.total}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                                : <></>}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center" }}>
                                <IconButton onClick={(e) => {
                                    loadStatictisData()
                                    setShowMore(!showMore)
                                }
                                }>
                                    <Typography variant="h7" textAlign={'center'} style={{ textAlign: "center" }} sx={{ fontWeight: 'bold' }} width={'100%'} >
                                        {showMore ? "Ẩn bớt" : "Xem thống kê chi tiết"}
                                    </Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}