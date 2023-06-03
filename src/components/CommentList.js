import React, { useEffect, useState, forwardRef } from "react";
import { CircularProgress, IconButton, Pagination, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material"
import { Avatar, Grid, Paper } from "@mui/material";

import "../css/CommentList.css";
import { commentService } from "../services/comment.services";

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

const comments = [
    {
        "id": "6450c849b226be32c08b5dd5",
        "userName": "An Văn",
        "userAva": "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=38ZuJXyK0vQAX9RYvLL&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCXNr9EbTsX8oP2I05PTXF9MNHOdExve243Cw2gK5-XkA&oe=64327F57",
        "text": "very good",
        "like": 0,
        "creatDate": "2023-05-02T08:22:33.893Z"
    }
]
const CommentList = forwardRef((props, ref) =>  {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(10);
    const [commentsList, setCommentsList] = useState(comments);

    const id = props.chap.chapId
    const handleChange = (e, p) => {
        setPage(p);
    };

    const fetchData = () => {
        setIsLoading(true)
        commentService.getChapterComment(id, page, 10).then((rs) => {
            console.log(rs.data)
            setCommentsList(rs.data.data)
            setTotal(rs.data.count)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [page])

    const onCommentDelete = (id) => {
        commentService.deleteComment(id).then((rs) => {
            fetchData()
        })
    }

    return (
        <div style={{ padding: 14 }} className="App" ref={ref}>
            <h1>Bình luận</h1>
            {isLoading === false ? <>
                {commentsList.map((item, index) => (
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item>
                                <Avatar alt={item.userName} src={item.userAva} />
                                <IconButton color="error" onClick={(e) => { onCommentDelete(item.id)}}> <Delete> </Delete></IconButton>
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{item.userName}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {item.text}
                                </p>
                                <div className="comment-bottom">
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
                <Pagination count={total /10 + 1} page={page + 1} sx={{ marginTop: '2em' }} onChange={handleChange} />
            </> :
                <CircularProgress></CircularProgress>
            }
        </div>
    );
});

export default CommentList
