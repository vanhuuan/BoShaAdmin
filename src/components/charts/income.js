import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import abbrNum from '../../services/numberHelper';

export default function Income({ chartsData, title, label }) {
  const [isLoading, setLoading] = useState(false)
  const [lbText, setLbText] = useState(label)
  const [data, setData] = useState()
  const [revenueList, setRevenueList] = useState([65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 22, 22])
  const [listManga, setListManga] = useState(["truyện 1", "truyện 2", "truyện 3", "truyện 4dfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfsdfgdfgdsfgdfg", "truyện 5", "truyện 6", "truyện 7", "truyện 8", "truyện 9", "truyện 10", "truyện 11", "truyện 12"])
  const [labelText, setLabelText] = useState("Lượt xem")
  const [titleText, setTitleText] = useState('Lượt xem')
  useEffect(() => {
    console.log(chartsData)
    setLoading(true)
    if (chartsData) {
      let rs = []
      let lb = []
      chartsData.forEach(function addRevenue(i) {
        rs.push(i.value)
        lb.push(i.name)
      })
      setRevenueList(rs)
      setListManga(lb)
      setLoading(false)
    }
    switch(label.toString()){
      case "View": setLabelText("Lượt xem"); break;
      case "Revenue" : setLabelText("Doanh thu (VND)"); break;
      case "Star" : setLabelText("Đánh giá"); break;
      default: setLabelText("Lượt xem"); break;
    }

    switch(title){
      case "View": setTitleText("lượt xem"); break;
      case "Revenue" : setTitleText("doanh thu (VND)"); break;
      case "Star" : setTitleText("đánh giá"); break;
      default: setTitleText("lượt xem"); break;
    }
  }, [])

  const c = {
    series: [{
      name: `${label}`,
      data: revenueList
    },],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        labels: {
          rotate: -15,
          trim: false,
          hideOverlappingLabels: false
        },
        categories: listManga,
      },
      yaxis: {
        title: {
          text: `${labelText}`,
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
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
  }
  return (
    <Box display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey', padding: "2em" }}>
      <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Thống kê theo {titleText}</Typography>
      {
        isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
          <ReactApexChart options={c.options} series={c.series} type="bar" width={'100%'} height={"250%"} />
      }
    </Box>
  );
}