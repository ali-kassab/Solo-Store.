import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home';
import Regester from './Component/Regester/Regester';
import Brands from './Component/Brands/Brands';
import Login from './Component/Login/Login';
import SortByHeightest from './Component/SortBy/SortByHeightest';
import SortByLowest from './Component/SortBy/SortByLowest';
import Prodetails from './Component/Prodetails/Prodetails';
import Branddetails from './Component/Branddetails/Branddetails';
import jwtDecode from 'jwt-decode';
import Profile from './Component/Profile/Profile';
import CartContextProvider from './Context/CartContext';
import Cart from './Component/Cart/Cart';
import Allorders from './Component/allOrders/Allorders';
import Paymentcash from './Component/Payment/Paymentcash';
import Onlinepayment from './Component/Payment/Onlinepayment';
import NextPage from './Component/NextPage/NextPage';

// Main component for the application
export default function App() {
  window.scroll({ top: 0 })
  const [userdata, setuserdata] = useState(null);

  // Function to get user data from token
  function GetuserData() {
    let userData = jwtDecode(localStorage.getItem('token'))
    setuserdata(userData)
  }

  // Protected route component to restrict access to certain routes
  function ProtectedRoute({ children }) {                              
    if (localStorage.getItem('token') === null) {
      return <Navigate to='/Login' />
    } else {
      return <>{children}</>
    }
  }

  // Function to clear user data from local storage
  function Clearuserdata() {
    localStorage.removeItem('token')
    setuserdata(null)
  }

  // useEffect to fetch user data on component mount
  useEffect(function () {
    if (localStorage.getItem('token') != null && userdata === null) {
      GetuserData()
    }
  }, []);

  // Router configuration
  const router = createBrowserRouter([
    {
      path: "", element: <CartContextProvider><Layout Clearuserdata={Clearuserdata} userdata={userdata} /></CartContextProvider>, children: [
        { path: '', element: <CartContextProvider> <Home /> </CartContextProvider> },
        { path: 'home', element: <CartContextProvider> <Home /> </CartContextProvider> },
        { path: 'nextpage', element: <CartContextProvider> <NextPage /> </CartContextProvider> },
        { path: 'profile', element: <ProtectedRoute> <Profile userdata={userdata} /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'paymentcash', element: <ProtectedRoute><CartContextProvider><Paymentcash userdata={userdata} /></CartContextProvider></ProtectedRoute> },
        { path: 'onlinepayment', element: <ProtectedRoute><CartContextProvider><Onlinepayment userdata={userdata} /></CartContextProvider></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><CartContextProvider><Cart /></CartContextProvider></ProtectedRoute> },
        { path: 'login', element: <Login GetuserData={GetuserData} /> },
        { path: 'brandDetails/:id', element: <ProtectedRoute><Branddetails /></ProtectedRoute> },
        { path: 'ProductDetails/:id', element: <ProtectedRoute><CartContextProvider><Prodetails /></CartContextProvider></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><CartContextProvider><Allorders userdata={userdata} /> </CartContextProvider></ProtectedRoute> },
        { path: 'regester', element: <Regester /> },
        { path: 'sort-by-heighest-price', element: <ProtectedRoute><SortByHeightest /></ProtectedRoute> },
        { path: 'sort-by-lowest-price', element: <ProtectedRoute><SortByLowest /></ProtectedRoute> },
        {
          path: '*', element: <div className='text-center'>
            <img alt='img' src={require('../src/images/pasted image 0.png')}></img>
          </div>
        },
      ]
    }])

  return <>
    <RouterProvider router={router} />
  </>
}
