import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, LinearProgress, InputLabel, OutlinedInput, Divider, IconButton, Avatar, InputAdornment } from '@mui/material'
import { userService } from '../../services/userServices'
import { firebaseService } from '../../services/firebase.services'
import { ExpandLess, ExpandMore, PhoneAndroidOutlined, Person, Person2, EmailOutlined, Check } from '@mui/icons-material'
import { FormControl } from '@mui/material'
import UserStatistic from './Statistic'
import '../../css/userinfo.css'
const UserDetailInfo = () => {
    const [userInfo, setUserInfo] = useState({
        "id": "64524e67c851f42527dd44e0",
        "name": "fake",
        "email": "fake@gmail.com",
        "photo": "",
        "phone": "fake phone number",
        "roles": [
            "User"
        ],
        "accessToken": null,
        "refreshToken": null
    })
    const [avaState, setAvaState] = useState({
        preview: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05",
        src: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05"
    })
    const [ava, setAva] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [showMore, setShowMore] = useState(false)

    const getAva = (avaUrl) => {
        setAva(avaUrl)
    }

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        setIsLoading(true)
        console.log(data)
        userService.getUserInfoById(data.id).then((rs) => {
            console.log(rs.data)
            setUserInfo(rs.data)
            firebaseService.getAva(rs.data.id, getAva)
            setIsLoading(false)
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`} className="userInfo">
            <Grid container spacing={2}>
                <Grid sm="1" md="1" lg="1">

                </Grid>
                <Grid sm="10" md="10" lg="10">
                    {isLoading === false ?
                        <div className=".container-info" padding={"1em"}>
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                                <Typography sx={{ typography: { md: 'h5', sm: 'h10' } }}> <Person color="primary" />Thông tin tài khoản </Typography>
                            </div>
                            <div className='container-body' style={{ display: "flex", justifyContent: "center" }}>
                                {ava ?
                                    <Avatar alt={userInfo.name} src={ava} className="ava" sx={{ width: "5em", height: "5em" }} />
                                    :
                                    <Avatar alt={userInfo.name} className="ava" sx={{ width: "5em", height: "5em" }} >{userInfo.name[0]}</Avatar>
                                }
                            </div>
                            <div className='container-body' style={{ marginTop: "1em"}}>
                                <Grid container spacing={2}>
                                    <Grid md={4} xs="12"><Typography variant="h5" className="title" >Tên người dùng</Typography></Grid>
                                    <Grid md={6} xs="12">
                                        <FormControl className="formCt" fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><Person2 /></InputAdornment>}
                                                required
                                                disabled
                                                defaultValue={userInfo.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs="12"> <Divider className="devider-grid" variant="middle"></Divider> </Grid>
                                    <Grid md={4} xs="12"><Typography variant="h5" className="title" >Email</Typography></Grid>
                                    <Grid md={6} xs="12">
                                        <FormControl className="formCt" fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><EmailOutlined /></InputAdornment>}
                                                required
                                                disabled
                                                defaultValue={userInfo.email}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs="12"> <Divider className="devider-grid" variant="middle"></Divider> </Grid>
                                    <Grid md={4} xs="12"><Typography variant="h5" className="title" >Số điện thoại</Typography></Grid>
                                    <Grid md={6} xs="12">
                                        <FormControl className="formCt" fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><PhoneAndroidOutlined /></InputAdornment>}
                                                required
                                                disabled
                                                defaultValue={userInfo.phone}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid md={4} xs="12"><Typography variant="h5" className="title" >Là tác giả</Typography></Grid>
                                    <Grid md={6} xs="12">
                                        <FormControl className="formCt" fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><Check /></InputAdornment>}
                                                required
                                                disabled
                                                defaultValue={userInfo.isAuthor === true ? "Đã là tác giả" : "Chưa là tác giả"}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs="12"> <Divider className="devider-grid" variant="middle"></Divider> </Grid>
                                </Grid>
                            </div>
                            {userInfo.isAuthor === true ? <div>
                                <div style={{ display: "flex", justifyContent: "center", marginRight: "5em", marginBottom: "0.5em" }}>
                                    <IconButton sx={{ height: "2em" }} className="button-info" onClick={() => setShowMore(!showMore)} color="info">
                                        {showMore === false ? <> <ExpandMore /> Xem thống kê truyện của người dùng </>
                                            : <> <ExpandLess /> Ẩn bớt </>}

                                    </IconButton>
                                </div>
                                {showMore == true ?
                                    <> <UserStatistic id={userInfo.id}></UserStatistic> </>
                                    : <></>}
                            </div> : <></>}
                        </div>

                        : <LinearProgress />}
                </Grid>
                <Grid sm="1" md="1" lg="1">
                </Grid>
            </Grid>
        </Box >
    )
}

export default UserDetailInfo