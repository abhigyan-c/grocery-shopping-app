import React from 'react'
import logo from './dd7bd804bd1df5cf4f4628420c8898a4.jpg';
import {BsCart2} from "react-icons/bs";
import {HiOutlineBars3} from "react-icons/hi2";
import {Box,Drawer,ListItem,ListItemButton,ListItemIcon,ListItemText,} from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from"@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Navbar = () => {

    const [openMenu,setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon/>
        },
        {
            text: "About",
            icon: <InfoIcon/>
        },
        {
            text: "login",
            icon: <AccountCircleIcon/>
        },
        {
            text: "Shopping cart",
            icon: <ShoppingCartIcon/>
        }
    ]
  return (
    <nav>
        <div className='nav-logo-container'>
            <img src={logo} alt="logo" />
        </div>
        
        <div className='navbar-links-container'>
            <a href="" className='navicon'>Home</a>
            <a href="" className='navicon'>About</a>
            <a href="" className='navicon'>Login</a>
            <a href="" className='navicon'><BsCart2 className='navbar-cart-icon'/></a>
        </div>
    </nav>
    )
}

export default Navbar
