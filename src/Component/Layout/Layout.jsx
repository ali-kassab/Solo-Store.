import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import '../Layout/Layout.css'

export default function Layout({ userdata, Clearuserdata }) {
    return <>
        {/* Navbar component */}
        <Navbar Clearuserdata={Clearuserdata} userdata={userdata} />

        {/* Outlet for rendering child components */}
        <div className='oulet'>
            <Outlet />

            {/* Footer */}
            <div className="footer py-5 ">
                <div className='container'>
                    <div className='d-flex mb-2 justify-content-between align-items-center'>
                        {/* Email input */}
                        <input placeholder='E-mail...' className='form-control me-2 w-75' type="text" />

                        {/* Button to share app link */}
                        <button className='form-control bg-success text-white w-25'>share app link</button>
                    </div>
                    <div className='border-top lastfooter py-4 border-bottom border-2 border-dark d-flex align-items-center '>
                        {/* Payment partners */}
                        <div className="right d-flex align-items-center">
                            <h6 className='me-3'>payment parteners </h6>
                            <i className=" text-primary fa-brands fa-paypal"></i>
                            <i className=" text-primary fa-brands fa-amazon"></i>
                            <i className=" text-primary fa-brands fa-cc-mastercard"></i>
                        </div>

                        {/* App download buttons */}
                        <div className='leftfooter d-flex ms-auto align-items-center'>
                            <h6>Get Delivers From Fresh Card</h6>
                            <button className='btn btn-dark mx-2 text-white'><i class="fa-brands me-2 fa-app-store"></i> Avilable on App Store</button>
                            <button className='btn btn-dark  text-white'><i class="fa-brands me-2 fa-google-play"></i>Get it from Google PLay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
