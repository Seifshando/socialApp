import React from 'react'
import style from './Layout.jsx'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (

  <>
    <Navbar />
      <div className="container my-12 ">
        <Outlet />      
      </div>
    <Footer />
  </>
  )
}
