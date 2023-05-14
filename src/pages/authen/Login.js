import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box, Button, TextField, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { authService } from '../../services/auth.services';
import { useNavigate } from "react-router-dom"
import { NotificationManager } from 'react-notifications';

const Login = () => {
  let navigate = useNavigate()
  const cleintId = "156185449724-pillmeqb703h7ops42o9n80bh9agkckd.apps.googleusercontent.com"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [notifyText, setNotifyText] = useState('')

  const validate = (key, values) => {
    const EMAIL_FORMAT = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const PASSWORD_FORMAT = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/
    if (key === 'email' && !EMAIL_FORMAT.test(values)) {
      setNotifyText('Email không hợp lệ')
      return true
    }
    if (key === 'password' && !PASSWORD_FORMAT.test(values)) {
      setNotifyText('Mật khẩu phải có ít nhất 10 ký tự, có ký tự chữ, ký tự số và ký tự đặc biệt')
      return true
    }
    return false
  }


  async function handleLogin() {
    let account = {
      userName: email,
      password: password
    }
    if (!email || !password) {
      setNotifyText('Hãy nhập đầy đủ thông tin')
      return
    }
    if (validate('email', email)) {
      return
    }
    if (validate('password', password)) {
      return
    }
    try {
      const login = await authService.login(account);
      if (login.data) {
        // check role
        var role = localStorage.getItem("Roles")
        console.log("Login data: ", login.data)
        if (role.includes("Admin")) {
          localStorage.setItem("UserId", login.data.id)
          localStorage.setItem("AccessToken", login.data.accessToken)
          localStorage.setItem("RefreshToken", login.data.refreshToken)
          localStorage.setItem("Name", login.data.name)
          localStorage.setItem("Roles", login.data.roles)
          navigate("/")
        } else {
          localStorage.clear()
          navigate("/login")
        }
      } else {
        NotificationManager.error("Đăng nhập không thành công", "Tên đăng nhập hoặc mật khẩu không đúng!", 2000)
        setNotifyText('Tên đăng nhập hoặc mật khẩu không đúng!')
      }
    } catch (error) {
      NotificationManager.error("Đăng nhập không thành công", "Tên đăng nhập hoặc mật khẩu không đúng!", 2000)
      console.log(error.response.data)
    }
  }

  async function handleLoginGoogle(rs) {
    let account = {
      tokenId: rs.credential,
    }
    try {
      const login = await authService.loginGoogle(account);
      if (login.data) {
        console.log("Login data: ", login.data)
        localStorage.setItem("UserId", login.data.id)
        localStorage.setItem("AccessToken", login.data.accessToken)
        localStorage.setItem("RefreshToken", login.data.refreshToken)
        localStorage.setItem("Name", login.data.name)
        localStorage.setItem("Roles", login.data.roles)
        localStorage.setItem("Ava", login.data.photo)
        navigate("/")
      } else {
        NotificationManager.error("Đăng nhập không thành công", "Email chưa đăng ký!", 2000)
        setNotifyText('Email chưa đăng ký!')
      }
    } catch (error) {
      NotificationManager.error("Đăng nhập không thành công", "Sai tài khoản hoặc mật khẩu", 2000)
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <form>
        <Box display="flex"
          flexDirection={"column"}
          maxWidth={350}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          backgroundColor='white'
          boxShadow={'0px 0px 10px #7D7D7E'}>

          <Typography variant='h5' padding={1}>ĐĂNG NHẬP</Typography>
          <TextField
            fullWidth
            size='small' margin="normal" type={'email'} variant='outlined' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#89D5C9" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            fullWidth
            size='small' margin="normal" type={'password'} variant='outlined' placeholder='Mật khẩu'
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon sx={{ color: "#89D5C9" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <Button sx={{ marginTop: 2, borderRadius: 5, backgroundColor: "#89D5C9", fontSize: 16, fontStyle: "bold" }} variant="contained" onClick={handleLogin} >ĐĂNG NHẬP</Button>
          <a style={{ marginTop: 10, fontSize: 13, fontStyle: "bold" }} href="/forgotPassword">Quên mật khẩu?</a>
          <Divider >Hoặc</Divider>
          <GoogleOAuthProvider clientId={cleintId}>
            <GoogleLogin
              clientId={cleintId}
              buttonText="Đăng nhập với google"
              onSuccess={(rs) => { handleLoginGoogle(rs) }}
              onFailure={(rs) => { console.log('Failed') }}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </GoogleOAuthProvider>
          <Typography sx={{ marginTop: 2, fontSize: 13, fontStyle: "bold" }} >Nếu bạn chưa có tài khoản, hãy <a style={{ marginTop: 2, fontSize: 13, fontStyle: "bold" }} href="/signUp"> đăng ký</a></Typography>
          {notifyText.length > 0 ?
            <Typography color='error'>{notifyText}</Typography>
            : <></>}

        </Box>
      </form>
    </div >
  )
}

export default Login
