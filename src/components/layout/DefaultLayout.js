import { Box, CssBaseline, Grid, Toolbar } from '@mui/material'
import React from 'react'
import Header from './header/Header'
import Sidebar from './sideBar/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", background: '#F9F9FB' }}>
      <CssBaseline />
      <Header/>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar></Toolbar>
        {children}
      </Box>
    </Box>
  )
}

export default DefaultLayout