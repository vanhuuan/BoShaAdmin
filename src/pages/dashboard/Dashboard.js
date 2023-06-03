import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import abbrNum from '../../services/numberHelper';
import { statisticServce } from '../../services/statistic.services';
import { Box, CircularProgress, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { CardBookSummary, CardSummary } from '../../components/charts/CardSumary';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { CalendarMonth } from '@mui/icons-material';
import { vn_en_lowercase } from './Statistic';

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

function DashBoard() {

    const [revenueList, setRevenueList] = useState([])
    const [listMonth, setListMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const c = {
        series: [{
            name: `Tháng`,
            data: revenueList,
            type: 'line',
        }
        ],
        options: {
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
                curve: 'smooth',
            },
            markers: {
                size: 5,
            },
            xaxis: {
                title: {
                    text: `Tháng`,
                },
                categories: listMonth,
            },
            yaxis: {
                title: {
                    text: `Doanh thu`,
                    trim: false,
                    opposite: true
                },
                labels: {
                    formatter: function (value) {
                        return abbrNum(value);
                    }
                },
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#89D5C9',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return abbrNum(value);
                    }
                }
            },
        },
    }
    const [isLoading, setIsLoading] = useState(true)
    const [values, setValues] = useState([
        new DateObject().subtract(1, "months"),
        new DateObject()
    ])

    const onChangeDateValue = (value) => {
        if (value.length == 2) {
            setValues(value)
        }
    }


    useEffect(() => {
        statisticServce.getStatisticYear(2023, "").then((rs) => {
            console.log(rs.data)
            if (rs.data) {
                rs.data.forEach(element => {
                    setRevenueList(old => [...old, element.value]);
                });

            }
            setIsLoading(false)
        })
        loadStatisticCard()
    }, [values])

    const [isLoadingCard, setIsLoadingCard] = useState(true)
    const [cardData, setCardData] = useState(defaultCardData)
    const loadStatisticCard = async () => {
        setIsLoadingCard(true)
        statisticServce.getStatisticCard(values[0].format("MM/DD/YYYY"), values[1].format("MM/DD/YYYY"), "").then((rs) => {
            console.log(rs)
            setCardData(rs.data)
            setIsLoadingCard(false)
        }).catch((e) => {
            console.log(e)
        })

    }

    return (
        <Box display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey', padding: "2em" }}>
            <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Doanh thu của hệ thống</Typography>
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
            {
                isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
                    <ReactApexChart options={c.options} series={c.series} type="line" height={"70%"} />
            }
            <Divider variant="middle" sx={{ margin: "1em 0" }}></Divider>
            {isLoadingCard === false ? <Grid container spacing={3}>
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
                        title="Thu nhập thực tế của hệ thống"
                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(cardData.revenue - cardData.afterRevenue)}
                        footer={<div> 20% Tổng thu nhập từ bán truyện  </div>}
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
                            title="Trong khoảng thời gian này hệ thống chưa bán được truyện nào"
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
                </Grid>
            </Grid>
                : <LinearProgress />}
        </Box>
    )
}

export default DashBoard