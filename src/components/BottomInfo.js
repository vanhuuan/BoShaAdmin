import React from "react";
import { Grid } from "@mui/material";

const intToString = num => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};

const BottomInfo = (props) => {
    const book = props.book.bookDetail
    const date1 = new Date(book.updateDate);

    const moment = require('moment');
    let localeData = moment.updateLocale('vi', {
        relativeTime: {
            future: "%s",
            past: "%s giây trước",
            s: function (number, withoutSuffix, key, isFuture) {
                return '00:' + (number < 10 ? '0' : '')
                    + number + ' giây trước';
            },
            m: "01 phút trước",
            mm: function (number, withoutSuffix, key, isFuture) {
                return (number < 10 ? '0' : '')
                    + number + ' phút trước';
            },
            h: "một giờ trước",
            hh: "%d giờ trước",
            d: "một ngày trước",
            dd: "%d ngày trước",
            M: "một tháng trước",
            MM: "%d tháng trước",
            y: "một năm trước",
            yy: "%d năm trước"
        }
    });
    let a = moment().from(date1);
    console.log("The relative time is :", a);

    return (
        <Grid container>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>{a}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Số tập</div>
                    <div><b>{book.numOfChapter}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Đánh giá</div>
                    <div><b>{book.numOfReview}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Lượt xem</div>
                    <div><b>{intToString(book.numOfView)}</b></div>
                </div>
            </Grid>
        </Grid>
    );
}

export default BottomInfo;