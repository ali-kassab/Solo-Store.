import React from 'react'
import '../Loadingscreen/Loadingscreen.css'

export default function Loadingscreen() {
    return <>

        {/* <div className="container d-flex vh-100 justify-content-center bg-opacity-50 align-items-center bg-primary ">
            <span className='fa-solid fa-spinner fa-spin fa-7x'></span>
        </div> */}
        <div className='d-flex loadingback justify-content-center bg-opacity-50 align-items-center'>
        <div class=" loader"></div>
        </div>
    </>
}
