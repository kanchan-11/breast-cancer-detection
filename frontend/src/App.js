import './App.css';
import Authentication from './pages/authentication/Authentication';
import HomePage from './pages/homepage/HomePage';
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from './redux/auth/auth.action';

function App() {
  const { auth } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfileAction(jwt))
  }, [jwt])
  return (

    <div className="">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        {/* <Route path="/*" element={<Authentication />} /> */}
      </Routes>

    </div>


  );
}

export default App;
