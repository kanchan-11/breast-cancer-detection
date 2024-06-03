import { Card, Grid } from '@mui/material'
import React from 'react'
import Login from './Login'
import Register from './Register'
import {Route, Routes} from "react-router-dom"


const Authentication = () => {
  return (
    <div>
      <Grid container>
        <Grid className='h-screen overflow-hidden' item xs={7}>
          <img className='h-full w-full' 
            src='https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg?w=740&t=st=1712238201~exp=1712238801~hmac=735a168d6085feaa1500c3a7c5b4ff01d924f91e0a544d8d376e8d36a397df46'/>
        </Grid>
        <Grid item xs={5}>
          <div className='px-20 flex flex-col justify-center h-full'>
            <Card className='card p-8'>
              <div className='flex flex-col items-center mb-5 space-y-1'>
                <h1 className='logo text-center'>Breast Cancer Detection</h1>
                <p className='text-center text-sm w-[70&]'>Small initiative to save people from the spread of cancer.</p>
              </div>
              <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>                
              </Routes>
            </Card>
          </div>
        </Grid>   
      </Grid>
    </div> 
  )
}

export default Authentication