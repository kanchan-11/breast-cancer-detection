import React from 'react'
import navigationMenu from './SidebarNavigation'
import { Divider, Avatar, MenuItem, Menu, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import useLogout from '../../redux/auth/logout';

const Sidebar = () => {
  const navigate = useNavigate()
  const { auth } = useSelector(store => store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logout = useLogout()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const handleLogout = () =>{
    setAnchorEl(null);
    logout()
  }

  const handleNavigate = (item) => {
    switch (item.title) {
      case "Home":
        navigate('/')
        break;
      case "Others":
        navigate('/users')
        break;
      case "Patients":
        navigate('/patients')
        break;
      case "Profile":
        navigate(`/profile/${auth.user?.id}`)
        break;
      default:
        break;
    }
    
  }
  return (
    <div className='card h-screen flex flex-col justify-between py-5 bg-gray-800 dark:bg-white text-white'>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl'>Breast Cancer Detection</span>
        </div>
        <div className='space-y-8'>
          {navigationMenu.map((item) => <div onClick={() => handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center'>
            {item.icon}
            <p className='text-xl'>
              {item.title}
            </p>
          </div>)}
        </div>
      </div>
      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar src='https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' />
            <div>
              <p className='font-bold'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
              <p className='opacity-70'>@{auth.user?.firstName + auth.user?.lastName}</p>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => navigate(`/profile/${auth.user?.id}`)}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar