import React from 'react'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../../../css/header.css'

import { NavLink } from 'react-router-dom';
import { LunchDining, Info, ListAlt, Discount, AutoGraph, Person, Store, AdminPanelSettings, AirplaneTicket, GifBox, BarChart, Category, Book } from '@mui/icons-material';
import { Toolbar } from '@mui/material';

const Sidebar = () => {
  const iconColor = '#89D5C9'
  let activeStyle = {
    background: '#89D5C9',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 8,
    width: '100%',
  }

  return (

    <Drawer
      sx={{
        width: '20vw',
        height: 'fill',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: '20vw', boxSizing: 'border-box' },
      }}
      variant="permanent"
    >
      <Toolbar />
      <List component={'nav'} sx={{ marginTop: "3em"}}>
        <ListItemButton component={NavLink} to='/dashboard'>
          <ListItemIcon>
            <BarChart sx={{ color: iconColor }} />
          </ListItemIcon>
          <NavLink exact="true" to="/dashboard" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Dashboard</NavLink>
        </ListItemButton>
        <ListItemButton component={NavLink} to='/users'>
          <ListItemIcon>
            <Person sx={{ color: iconColor }} />
          </ListItemIcon>
          <NavLink exact="true" to="/users" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>User</NavLink>
        </ListItemButton>
        <ListItemButton component={NavLink} to='/books'>
          <ListItemIcon>
            <Book sx={{ color: iconColor }} />
          </ListItemIcon>
          <NavLink exact="true" to="/books" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Truyện</NavLink>
        </ListItemButton>
        <ListItemButton component={NavLink} to='/admins'>
          <ListItemIcon>
            <AdminPanelSettings sx={{ color: iconColor }} />
          </ListItemIcon>
          <NavLink exact="true" to="/admins" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Admin</NavLink>
        </ListItemButton>
        <ListItemButton component={NavLink} to='/categories'>
          <ListItemIcon>
            <Category sx={{ color: iconColor }} />
          </ListItemIcon>
          <NavLink exact="true" to="/categories" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Thể loại</NavLink>
        </ListItemButton>
      </List>
    </Drawer>

  )
}

export default Sidebar
