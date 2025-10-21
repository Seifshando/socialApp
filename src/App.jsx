import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import Register from './components/register/register';
import Notfound from './components/Notfound/Notfound';
import Profile from './components/Profile/Profile';
import ContextProvider from './Hamada/Hamada'
import UserContextProvider from './Hamada/UserContext'
import PostContextProvider from './Hamada/PostContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Postdetails from './components/Postdetails/Postdetails';
import { Toaster } from 'react-hot-toast'
import Register from './components/Register/Register';


const query = new QueryClient()

const x = createBrowserRouter([
  {path:'', element: <Layout />, children: [
    {index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    {path:'profile', element: <ProtectedRoute><Profile /></ProtectedRoute>},
    {path:'postdetails/:id', element: <ProtectedRoute><Postdetails/></ProtectedRoute>},
    {path:'login', element: <Login />},
    {path:'register', element: <Register />},
    {path:'*', element: <Notfound />},
  ]},
])



function App() {

  return (
    <>
    
    <UserContextProvider>
      <PostContextProvider>
        <ContextProvider> 
          <QueryClientProvider client={query}>
            <RouterProvider router={x}></RouterProvider>     
            <Toaster /> 
          </QueryClientProvider>
        </ContextProvider>
      </PostContextProvider>
    </UserContextProvider>

    </>
  )
}

export default App
