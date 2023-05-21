import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import abbrNum from '../../services/numberHelper';
import { statisticServce } from '../../services/statistic.services';
import { Box, CircularProgress, Typography } from '@mui/material';

function DashBoard() {

    const [revenueList, setRevenueList] = useState([])
    const [listMonth, setListMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const c = {
        series: [{
            name: `Tháng`,
            data: revenueList
        },],
        options: {
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
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

    useEffect(() => {
        statisticServce.getStatisticYear(2023, "").then((rs) => {
            console.log(rs.data)
            if(rs.data){
                rs.data.forEach(element => {
                    setRevenueList(old=> [...old, element.value]);
                });
                
            }
            setIsLoading(false)
        })
    } ,[])

    return (
        <Box display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey', padding: "2em" }}>
            <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Doanh thu của hệ thống</Typography>
            {
                isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
                    <ReactApexChart options={c.options} series={c.series} type="line" height={"150%"} />
            }
        </Box>
    )
}

export default DashBoard