import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Box, Typography, Button, IconButton, LinearProgress } from '@mui/material'
import ListChapter from "../../components/ListChapter";
import BookInfo from "../../components/BookInfo";
import BottomInfo from "../../components/BottomInfo";
import BookCategories from "../../components/book/BookCategories";
import { userBookService } from "../../services/userBook.services";
import ReviewList from "../../components/Review";
import { firebaseService } from "../../services/firebase.services";
import { Lock, LockOpen, StarBorderOutlined } from "@mui/icons-material";
import ForumIcon from '@mui/icons-material/Forum';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';
import { NotificationManager } from 'react-notifications';
import BlockBook from "../../components/prompt/BlockBook";
import UnBlockBook from "../../components/prompt/UnblockBook";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState({
        "id": "643656a08e27bd8b1165478b",
        "name": "Overlord",
        "authorName": "An Văn",
        "authorId": "00",
        "cover": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793",
        "preview": "",
        "numOfReview": 0,
        "numOfStar": 0,
        "numOfChapter": 0,
        "publishDate": "2023-04-12T06:58:40.676Z",
        "updateDate": "2023-04-12T06:58:40.742Z",
        "category": [],
        "price": 1000,
        "state": "Unfinish"
    })
    const [status, setStatus] = useState({
        "buyed": true,
        "liked": false,
        "canEdit": false
    })
    const [preview, setPreivew] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [showMore, setShowMore] = useState(false);
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const share = () => {
        NotificationManager.success(book.name, 'Đã sao chép', 1000);
        var host = window.location.host;
        navigator.clipboard.writeText(`${host}/Book/${book.id}`);
    }

    const setPreviewText = (data) => {
        setPreivew(data)
        setIsLoading(false)
    }

    const fetchData = () => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            (rs) => {
                firebaseService.gerPreview(id, setPreviewText)
                setBook(rs.data)
            }
        ).catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [id])


    const handleClose = () => {
        setOpen(false)
        fetchData()
    }

    const handleBlockBook = (e) => {
        setOpen(true)
    }

    return (
        <div>
            <Box>
                {isLoading === false ? <>
                    {book.state !== "Block" ?
                        <BlockBook
                            isOpen={open}
                            book={book}
                            handleClose={handleClose} /> :
                        <UnBlockBook
                            isOpen={open}
                            book={book}
                            handleClose={handleClose} />}
                </>
                    : <></>}
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading === false ?
                            <div>
                                <div className='container' style={{ display: "block" }}>
                                    <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='h5'>{book.name} </Typography>
                                        <IconButton onClick={handleBlockBook}>
                                            {book.state === "Block" ?
                                                <LockOpen color="primary"> Mở khóa truyện</LockOpen> :
                                                <Lock color="error"> Khóa truyện</Lock>
                                            }
                                        </IconButton>
                                    </div>
                                    <div className='container-body'>
                                        <Grid container spacing={2}>
                                            <Grid item md={3} sm={12}>
                                                <Box mt={2} textAlign="left">
                                                    <img src={book.cover} alt='Cover' width="100%" />
                                                </Box>
                                            </Grid>
                                            <Grid item md={9} sm={12} width="100%">
                                                <div style={{ marginTop: 2 + 'em' }}>
                                                    <Typography variant='h4'>{book.name} </Typography>
                                                </div>
                                                <BookCategories categories={{ cate: book.category }} />
                                                <div style={{ margin: `1em 0` }}>
                                                    <BookInfo book={{ bookDetail: book }}></BookInfo>
                                                </div>
                                                <Grid container>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <div><StarBorderOutlined style={{ color: "#faaf00" }} /></div>
                                                            <div><b>{book.numOfReview !== 0 ? book.numOfStar / (book.numOfReview) : book.numOfStar / (book.numOfReview + 1)}</b></div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <a href="#chapter-list">
                                                                <div><FormatListBulletedIcon /></div>
                                                                <div><b>Mục lục</b></div>
                                                            </a>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <a href="#review">
                                                                <div><ForumIcon /></div>
                                                                <div><b>Đánh giá</b></div>
                                                            </a>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item' onClick={share}>
                                                            <div><ShareIcon /></div>
                                                            <div><b>Chia sẻ</b></div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='container-bottom'>
                                        <BottomInfo book={{ bookDetail: book }}></BottomInfo>
                                    </div>
                                    <div className='container-bottom'>
                                        {showMore ?
                                            <div style={{ padding: "1em" }} dangerouslySetInnerHTML={{ __html: `${preview.substring(0, 250)}}` }}></div>
                                            : <div style={{ padding: "1em" }} dangerouslySetInnerHTML={{ __html: preview }}></div>
                                        }
                                        {preview.length < 250 ? <></> :
                                            <button className="btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Ít hơn" : "Mở rộng"}</button>
                                        }
                                    </div>
                                </div>

                                <div id='chapter-list' className='container' style={{ display: "block" }}>
                                    <div className='container-header' style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6'> Danh sách tập </Typography>
                                    </div>
                                    <div className='container-body'>
                                        <ListChapter book={{ id: id, canEdit: status.canEdit, canBuyed: status.buyed }}></ListChapter>
                                    </div>
                                </div>
                                <div id='review'>
                                    <ReviewList book={{ bookId: id }}></ReviewList>
                                </div>
                            </div> : <LinearProgress />
                        }
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}