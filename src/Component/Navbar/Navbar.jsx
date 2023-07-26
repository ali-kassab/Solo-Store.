import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useState } from 'react'
import 'animate.css';
import { CartContext } from './../../Context/CartContext';
import { useEffect } from 'react';
export default function Navbar({ userdata, Clearuserdata }) {


  const { numberofcartItems } = useContext(CartContext);
  const [scrollColor, setscrollColor] = useState(false);
  // const [numberofitem, setnumberofitem] = useState(0);



  // useEffect(() => {
  //   setnumberofitem(numberofcartItems)
  //   return () => {

  //   };
  // }, [numberofcartItems]);
  function scrollchange() {
    if (window.scrollY >= '100') {
      setscrollColor(true)
    } else {
      setscrollColor(false)
    }
  }
  window.addEventListener('scroll', scrollchange)

  return <>

    <nav className={scrollColor ? 'navchangecolor  navbar navbar-expand-lg bg-body-tertiary' : 'navbar navbar-expand-lg bg-body-tertiary'}>
      <div className="container">
        <Link className={scrollColor ? ' navbar-brand d-lg-none d-block' : "navbar-brand d-lg-none d-block"} to="/home">
          <span className='s animate__animated animate__slideInDown'>s</span>
          <span className='o animate__animated animate__fadeInRightBig animate__delay-1s'>o</span>
          <span className='l animate__animated animate__fadeInRightBig animate__delay-2s'>l</span>
          <span className='o2 animate__animated animate__fadeInRightBig animate__delay-3s'>o</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav nav-right  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={scrollColor ? ' nav-link active animate__animated animate__fadeInLeft animate__delay-2s' : "nav-link animate__animated animate__fadeInLeft animate__delay-2s active textUnderLine"} aria-current="page" to="/home">Home <i class="fa-solid fa-house"></i></Link>
            </li>
            <li className="nav-item">
              <Link className={scrollColor ? ' nav-link text-color animate__animated animate__fadeInLeft animate__delay-1s' : "nav-link animate__animated animate__fadeInLeft animate__delay-1s"} to="/brands">Brands <i class="fa-solid fa-bag-shopping"></i></Link>
            </li>
            {userdata ? <li className="nav-item">
              <Link className={scrollColor ? ' nav-link animate__animated animate__fadeInLeft' : "nav-link animate__animated animate__fadeInLeft"} to="/cart">Cart <i class="fa-solid fa-cart-shopping"> <span className='numberofitem animate__delay-2s  animate__animated animate__jello'>{numberofcartItems}</span></i></Link>
            </li> : ''}

          </ul>

          <Link className={scrollColor ? ' navbar-brand d-lg-block d-none' : "navbar-brand d-lg-block d-none"} to="/home">
            <span className='s animate__animated animate__slideInDown'>s</span>
            <span className='o animate__animated animate__fadeInRightBig animate__delay-1s'>o</span>
            <span className='l animate__animated animate__fadeInRightBig animate__delay-2s'>l</span>
            <span className='o2 animate__animated animate__fadeInRightBig animate__delay-3s'>o</span>
          </Link>

          <ul className="navbar-nav nav-left ms-auto mb-2 mb-lg-0">


            {userdata ? <>



              <li className="nav-item">
                <Link className={scrollColor ? 'nav-link animate__fadeInRight animate__animated animate__delay-1s' : "nav-link animate__fadeInRight animate__animated animate__delay-1s "} to="/profile">profile <i class="fa-regular fa-user"></i></Link>
              </li>





              <li className="nav-item">
                <Link onClick={Clearuserdata} className={scrollColor ? " nav-link animate__fadeInRight animate__animated " : 'nav-link animate__fadeInRight animate__animated '} to="/login">Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></Link>
              </li>

            </> : <>




              <li className="nav-item">
                <Link className={scrollColor ? ' nav-link active animate__fadeInRight animate__animated' : "nav-link active animate__fadeInRight animate__animated"} aria-current="page" to="/login">Login  <i class="fa-solid fa-right-to-bracket"></i></Link>
              </li>
              <li className="nav-item">
                <Link className={scrollColor ? ' nav-link animate__fadeInRight animate__animated' : "nav-link animate__fadeInRight animate__animated"} to="/Regester">Regester <i class="fa-regular fa-address-card"></i></Link>
              </li></>}





          </ul>

        </div>
      </div>
    </nav>


  </>
}

