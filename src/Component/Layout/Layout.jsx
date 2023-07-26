import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import '../Layout/Layout.css'

export default function Layout({ userdata, Clearuserdata }) {
    return <>

        <Navbar Clearuserdata={Clearuserdata} userdata={userdata} />
        <div className='oulet'>
            <Outlet />

            <div className="footer py-5 ">
                <div className='container'>
                    <h2>solo</h2>
                    <h6>Lorem ipsum dolor sit amet.</h6>
                    <div className='d-flex mb-2 justify-content-between align-items-center'>

                        <input placeholder='E-mail...' className='form-control me-2 w-75' type="text" />
                        <button className='form-control bg-success text-white w-25'>share app link</button>
                    </div>
                    <div className='border-top lastfooter py-4 border-bottom border-2 border-dark d-flex align-items-center '>
                        <div className="right d-flex align-items-center">
                            <h6 className='me-3'>payment parteners </h6>
                            <i className=" text-primary fa-brands fa-paypal"></i>
                            <i className=" text-primary fa-brands fa-amazon"></i>
                            <i className=" text-primary fa-brands fa-cc-mastercard"></i>
                        </div>
                        <div className='leftfooter d-flex ms-auto align-items-center'>
                            <h6>Get Delivers From Fresh Card</h6>
                            <button className='btn btn-dark mx-2 text-white'><i class="fa-brands me-2 fa-app-store"></i> Avilable on App Store</button>
                            <button className='btn btn-dark  text-white'><i class="fa-brands me-2 fa-google-play"></i>Get it from Google PLay</button>

                        </div>
                    </div>

                </div>


        
            </div></div>
    </>
}
