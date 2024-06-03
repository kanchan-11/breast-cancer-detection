import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navigationMenu = [
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Patients",
        icon:<AccountCircleIcon/>,
        path:"/patients"
    },
    {
        title:"Others",
        icon:<ListAltIcon/>,
        path:"/users"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    }
]

export default navigationMenu