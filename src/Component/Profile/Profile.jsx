import React, { useContext } from 'react'
import '../Profile/Profile.css'
import { CartContext } from '../../Context/CartContext';
import 'animate.css';
export default function Profile({ userdata }) {
  console.log(userdata);
  const { numberofcartItems } = useContext(CartContext)
  return <>


    <div className='container profile'>
      <div className="profileitem">

        <h2 className='text-center welcome animate__animated animate__wobble'> welcome <span className='animate__animated animate__heartBeat animate__delay-1s'>{userdata?.name}</span> </h2>
        <div className='row cartProfile'>
          <div className="col-md-6 yourcart animate__animated animate__bounceInLeft">
            <h4> you have <span className='animate__animated animate__heartBeat animate__delay-1s'>{numberofcartItems}</span> items in your cart</h4>
          </div>

          <div className="col-md-6 animate__animated animate__bounceInRight">
            <img className='w-100' src={require('../../images/pngwing.com.png')} alt="cart" />
          </div>
        </div>

        <hr />
        <div className='row thanks'>
          <div className="col-md-5 animate__animated animate__bounceInLeft"><p>we hope you are happy with the experience with solo , and reecommend solo store to friends. <hr /> thanks <span className='animate__animated animate__heartBeat animate__delay-1s'>{userdata?.name}</span></p>
          </div>
          <div className="col-md-7 animate__animated animate__bounceInRight"> <img className='w-100' src={require('../../images/shoppingg.com.png')} alt="shopping" /></div>
        </div>

      </div>
    </div>

  </>
}
