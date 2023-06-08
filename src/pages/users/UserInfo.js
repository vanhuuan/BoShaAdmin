import { BarChart, EditLocation, EmailOutlined, Person, Person2, PhoneAndroidOutlined } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { userService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { firebaseService } from "../../services/firebase.services";
import "../../css/userinfo.css"

export default function UserInfo() {
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

    function onClose() {
        setAvaState({ preview: null })
    }

    function onCrop(preview) {
        setAvaState({ preview })
    }

    let navigate = useNavigate()

    const getAva = (avaUrl) => {
        setAva(avaUrl)
    }

    useEffect(() => {
        setIsLoading(true)
        userService.getUserInfoById(localStorage.getItem("UserId")).then((rs) => {
            console.log(rs.data)
            setUserInfo(rs.data)
            firebaseService.getAva(rs.data.id, getAva)
            setIsLoading(false)
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`} className="userInfo">
            <Grid container spacing={2}>
                <Grid sm="1" md="2" lg="3">

                </Grid>
                <Grid sm="10" md="8" lg="6">
                    {isLoading === false ?
                        <div className="container" style={{ display: "block"}} padding={"1em"}>
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ typography: { md: 'h5', sm: 'h10' } }}> <Person color="primary" />Thông tin tài khoản </Typography>
                            </div>
                            <div className='container-body' style={{ display: "flex", justifyContent: "center" }}>
                                {ava ?
                                    <Avatar alt={userInfo.name} src={ava} className="ava" sx={{ width: "5em", height: "5em" }} />
                                    :
                                    <Avatar alt={userInfo.name} className="ava" sx={{ width: "5em", height: "5em" }} >{userInfo.name[0]}</Avatar>
                                }
                            </div>
                            <div className='container-body'>
                                <Grid container spacing={2}>
                                    <Grid xs="12"> <Divider className="devider-grid" variant="middle"></Divider> </Grid>
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
                                    <Grid xs="12"> <Divider className="devider-grid" variant="middle"></Divider> </Grid>
                                </Grid>
                            </div>
                            <div style={{ display: "flex", justifyContent: "end", marginRight: "5em", marginBottom: "0.5em" }}>
                                <IconButton sx={{ width: "2em", height: "2em" }} className="button-info" onClick={() => navigate("/user/userEdit")} color="info">
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>

                        : <LinearProgress />}
                </Grid>
                <Grid  sm="1" md="2" lg="3">
                </Grid>
            </Grid>
        </Box >
    )
}