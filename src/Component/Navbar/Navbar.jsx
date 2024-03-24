import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { CartContext } from './../../Context/CartContext';

export default function Navbar({ userdata, Clearuserdata }) {
  const { numberofcartItems } = useContext(CartContext);

  return (
    <>
      <nav className={'navbar navbar-expand-lg bg-body-tertiary'}>
        <div className="container ">
          <Link to='/home'>
            <h2 className='logo'>Store</h2>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={"nav-link animate__animated animate__fadeInLeft animate__delay-2s active textUnderLine"} aria-current="page" to="/home">Home <i className="fa-solid fa-house"></i></Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link animate__animated animate__fadeInLeft animate__delay-1s"} to="/brands">Brands <i className="fa-solid fa-bag-shopping"></i></Link>
              </li>
              {userdata && (
                <li className="nav-item">
                  <Link className={"nav-link animate__animated animate__fadeInLeft"} to="/cart">
                    Cart <i className="fa-solid fa-cart-shopping">
                      <span className='numberofitem animate__delay-2s animate__animated animate__jello'>{numberofcartItems}</span>
                    </i>
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userdata ? (
                <>
                  <li className="nav-item">
                    <Link className={"nav-link animate__fadeInRight animate__animated animate__delay-1s"} to="/profile">Profile <i className="fa-regular fa-user"></i></Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={Clearuserdata} className={'nav-link animate__fadeInRight animate__animated '} to="/login">Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className={"nav-link active animate__fadeInRight animate__animated"} aria-current="page" to="/login">Login <i className="fa-solid fa-right-to-bracket"></i></Link>
                  </li>
                  <li className="nav-item">
                    <Link className={"nav-link animate__fadeInRight animate__animated"} to="/Regester">Register <i className="fa-regular fa-address-card"></i></Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
