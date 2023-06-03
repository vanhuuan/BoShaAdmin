import React, { useState } from "react";
import { Typography, Grid, Button, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';
import { Navigator } from "react-router-dom";
import { NotificationManager } from 'react-notifications';

const BookInfo = (props) => {
    const book = props.book.bookDetail
    console.log("book info:", book)
    const share = () => {
        NotificationManager.success(book.name, 'Đã sao chép', 1000);
        navigator.clipboard.writeText(`/Book/${book.id}`);
    }

    const renderState = (param) => {
        switch (param) {
            case 'Block':
                return 'Bị chặn';
            case 'Unfinish':
                return 'Chưa hoàn thành';
            case 'Finish':
                return 'Hoàn thành';
            default:
                return 'Tạm hoãn';
        }
    }

    return (
        <>
            <Typography style={{ marginBottom: `0.5em` }}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tác giả: </span>
                <span>{book.authorName}</span>
            </Typography>
            <Typography style={{ marginBottom: `0.5em` }}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Giá tiền: </span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(book.price)} </span>
            </Typography>
            <Typography style={{ marginBottom: `0.5em` }}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tình trạng: </span>
                <span>{ renderState(book.state) }</span>
            </Typography>
        </>
    );
}

export default BookInfo;