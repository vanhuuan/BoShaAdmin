import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = '#89D5C9'; // #f44336

export default function PageNotFound() {
    let navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: primary,
        margin: '10rem 5rem',
        padding: '2rem',
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        Không tìm thấy trang bạn đang yêu cầu
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Trang chủ</Button>
    </Box>
  );
}