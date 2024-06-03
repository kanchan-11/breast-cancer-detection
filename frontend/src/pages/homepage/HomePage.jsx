import { Grid } from '@mui/material';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import MiddlePart from '../../components/middlePart/MiddlePart';
import Profile from '../profile/Profile';
import Sidebar from '../../components/sidebar/Sidebar';
import HomeRight from '../../components/homeRight/HomeRight';
import { useSelector } from "react-redux";
import Patients from '../../components/patient/Patients';
import PatientData from '../../components/patient/PatientData';
import Users from '../../components/users/Users';
import Home from './Home';

const HomePage = () => {
  const { auth } = useSelector(store => store);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={3} md={3} lg={3} xl={3} style={{ flex: '1' }}>
        <div className='sticky top-0'>
          <Sidebar />
        </div>
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={10} xl={10} style={{ flex: '1' }}>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/patients" element={<Patients />} />
          {/* <Route path="/patients/:id" element={<PatientData />} /> */}
        </Routes>
      </Grid>
    </Grid>
  );
}

export default HomePage;
