import React, { useState } from 'react'
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import { authService } from '../../services/auth.services';
import { NavLink, useNavigate } from "react-router-dom"
import { createSearchParams, useSearchParams } from "react-router-dom";
const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const email =  searchParams.get("email");
  const token =  searchParams.get("token");
  const [ok, setOk] = useState(false)
  let navigate = useNavigate()
  console.log(token);
  async function handleChangePass(){
    if (ok) {
      let acc = {
        Email: email, 
        Password: password, 
        Token: token
      }
      await authService.renewPass(acc);
      navigate("/logIn")
    }
  }

  const setConfirmPassword = (pass) => {
    if(password === pass){
      setOk(true)
    }else{
      setOk(false)
    }
    setConfirmPass(pass)
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
        <Typography variant='h5'>Thay đổi mật khẩu </Typography>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>
        <TextField
          fullWidth
          margin="normal" type={'password'}
          variant='outlined' placeholder='Nhập mật khẩu mới'
          onChange={(e) => { setPassword(e.target.value); setConfirmPass("") }}
        ></TextField>
        <TextField
          fullWidth
          margin="normal" type={'password'}
          variant='outlined' placeholder='Xác nhận mật khẩu'
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPass != password}
          helperText={confirmPass != password?'Không trùng với mật khẩu hiện tại':''}
        ></TextField>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>

        <Button
          onClick={handleChangePass}
          sx={{
            borderRadius: 1,
            backgroundColor: "#89D5C9",
            fontSize: 16,
            fontStyle: "bold"
          }}
          variant="contained" >
          Đổi mật khẩu
        </Button>
      </Box>
    </div>
  )
}

export default ChangePassword
