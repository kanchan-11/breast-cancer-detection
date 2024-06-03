import { Card, CardHeader, Avatar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import React from 'react';

const UserCard = ({ user }) => {
    return (
        <Card className='w-full mb-2' variant="outlined" sx={{ backgroundColor: '#f3f4f6' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" avatar="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg">
                        {/* {user.firstName[0]} */}
                    </Avatar>
                }
                title={<Typography variant="h6" className="font-bold">
                    {user?.firstName + " " + user?.lastName}
                </Typography>}
                subheader={<>
                    <div className="mb-2">
                        <span className="font-semibold">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-semibold">Gender:</span> {user.gender}
                    </div>

                </>}
            />
        </Card>

    );
};

export default UserCard;