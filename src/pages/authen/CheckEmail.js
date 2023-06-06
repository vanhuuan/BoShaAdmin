import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { authService } from '../../services/auth.services';
import { NavLink, useNavigate } from "react-router-dom"
import { Mail } from '@mui/icons-material';
import { NotificationManager } from 'react-notifications';
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  let navigate = useNavigate()
  const [check, setCheck] = useState(false)

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSendEmail = () => {
    if(isValidEmail(Mail)){
      authService.forgetPass(email);
      alert("Vui lòng kiểm tra Email đã đăng ký để có hướng dẫn tiếp theo");
    }else{
      NotificationManager.error("Sai định dạng Email", "Sai định dạng", 2000)
    }
  }
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box
        component={Paper}
        maxWidth={500}
        minWidth={400}
        display="flex"
        flexDirection='column'
        sx={{ margin: 'auto', background: 'white', padding: 3 }}>
        <Typography variant='h5'>Tìm tài khoản của bạn </Typography>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>
        <Typography>Vui lòng nhập email để tìm kiếm tài khoản của bạn</Typography>
        <TextField
          fullWidth
          margin="normal" type={'email'}
          variant='outlined' placeholder='Email'
          onChange={(e) => { 
            if(!isValidEmail(e.target.value)){
              setCheck(true)
            }else{
              setCheck(false)
            }
            setEmail(e.target.value)} 
          }
          error = {check}
        ></TextField>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>

        <Button
          onClick={handleSendEmail}
          sx={{
            borderRadius: 1,
            backgroundColor: "#89D5C9",
            fontSize: 16,
            fontStyle: "bold"
          }}
          variant="contained" >
          Tìm kiếm
        </Button>
      </Box>
    </div>

  )
}

export default ForgotPassword
