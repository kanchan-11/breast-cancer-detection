import React from 'react'
import {CardHeader,Avatar,Button} from '@mui/material';
import {red} from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
            avatar={
                <Avatar sx={{bgcolor:red[500]}} aria-label="recipe">
                    R
                </Avatar>
            }
            action={
                <Button size="small">Follow</Button>
            }
            title="user name"
            subheader="April 07, 2024"/>
    </div>
  )
}

export default PopularUserCard