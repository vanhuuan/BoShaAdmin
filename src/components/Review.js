import React, { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";

import { Avatar, Grid, Paper } from "@mui/material";
import { commentService } from "../services/comment.services";
import { StarBorderOutlined } from "@mui/icons-material";

const moment = require('moment');
moment.updateLocale('vi', {
    relativeTime: {
        future: "%s",
        past: "%s giây trước",
        s: function (number, withoutSuffix, key, isFuture) {
            return '00:' + (number < 10 ? '0' : '')
                + number + ' giây trước';
        },
        m: "01:00 minutes",
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

const imgLink =
    "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/341263434_237177232146883_4137101451342149163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oVBrUKg6yQAAX8WzY_X&_nc_ht=scontent.fdad1-2.fna&oh=00_AfBi2or8ZeYBWoubGayzCsvCNN5xr_CldVenzY8DGaB3jw&oe=6440F313";

const comments = [
    {
        "id": "645117b7b226be32c08b5dd6",
        "userName": "An Văn",
        "userAva": "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=38ZuJXyK0vQAX9RYvLL&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCXNr9EbTsX8oP2I05PTXF9MNHOdExve243Cw2gK5-XkA&oe=64327F57",
        "text": "hay lắm",
        "like": 0,
        "star": 5,
        "creatDate": "2023-05-02T14:01:27.582Z"
    }
]
function ReviewList(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(10);
    const [commentsList, setCommentsList] = useState(comments);

    const id = props.book.bookId
    const handleChange = (e, p) => {
        setPage(p);
    };

    useEffect(() => {
        setIsLoading(true)
        var rs = commentService.getReviewCommentBook(id, page, 10).then((rs) => {
            console.log(rs)
            setCommentsList(rs.data.data)
            setTotal(rs.data.count)
            setIsLoading(false)
        }).catch((err) => { console.log(err)})
    }, [page])

    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Đánh giá</h1>
            {isLoading === false ? <>
                {commentsList.map((item, index) => (
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item>
                                <Avatar alt={item.userName} src={item.userAva} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{item.userName}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {item.text}
                                </p>
                                <div className="comment-bottom">
                                    <span className="comment-icon">
                                        <StarBorderOutlined className="icon-star" />
                                        <span>{item.star}</span>
                                    </span>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        {
                                            moment().from(new Date(item.creatDate))
                                        }
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}

                <Pagination count={total /10 + 1} page={page+1} sx={{ marginTop: '2em' }} onChange={handleChange} />
            </> :
                <CircularProgress></CircularProgress>
            }
        </div>
    );
}

export default ReviewList
