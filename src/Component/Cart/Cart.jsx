import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link } from 'react-router-dom';
import '../Cart/Cart.css'
import 'animate.css';


export default function Cart() {
  const { condition, updateitems, numberofcartItems, cartproducts, totalCartPrice, removeitems } = useContext(CartContext);

  // const [countnumber, setcountnumber] = useState();

  const [paymentpop, setpaymentpop] = useState(false);






  // function plus() {

  //   console.log('hellloooo');
  // }
  // function remove() {

  // }


  // useEffect(() => {
  //   plus()

  //   remove()
  //   return () => {

  //   };
  // }, [countnumber]);

  return <>


    {cartproducts ? <>

      <section>
        <div className="container position-relative">

          <div className='parentpayment'>
          <div className='row'>
          <div className='parttwopay  col-lg-5 col-md-6 col-sm-12 '>
              <div className='bigDivcart'>
                <div className='divPriceItem animate__animated animate__fadeInLeft'>
                  <div className='h2div'><h2>totlaPrice:<span className='d-inline-block text-dark'> <span className='animate__animated  animate__heartBeat animate__delay-2s'>{totalCartPrice}</span></span> </h2></div>
                  <div className='h2div'><h2> numberOfItems:<span className='d-inline-block text-dark'> <span className='animate__animated  animate__heartBeat animate__delay-2s'>{numberofcartItems}</span></span></h2></div>

                </div>
                <div className='cartprice animate__animated animate__fadeInLeft'>
                  <img src={require('../../images/Shopping Cart (HD) (1).png')} alt="" />
                </div>
              </div>
            </div>
            <div className='partonePay col-lg-7 col-md-6 col-sm-12 position-relative  '>
              <div className='animate__animated animate__fadeInRight'>
                <button onClick={() => { setpaymentpop(true) }} className='paynow animate__animated animate__swing animate__animated'><p>pay from here</p></button>
              </div>
              <div className='cartofpay animate__animated animate__fadeInRight'><img src={require('../../images/cart7777.com.png')} alt="" />
              </div>

              <div className='popup '>
                <div className={paymentpop ? 'card motion' : 'card'}   >
                  <div className="card-body animate__animated animate__fadeInLeft">
                    <h5 className="card-title">pay now</h5>
                    <Link to={'/paymentcash'}><button className='btn '>payment cash</button></Link>
                    <Link to={'/onlinepayment'}><button className='btn'>payment cridet </button></Link>
                  </div>
                  <img className='w-50' src={require('../../images/Holding ID Card.png')} alt="" />

                </div>
              </div>

            </div>

          </div>
          </div>

          <div className="row">


            {cartproducts.map(function (pro, ind) {


              return <> <div key={ind} className="col-md-4 col-lg-3 col-sm-6 bigitem">
                <div className="itemCart">
                  <div className='homedivImg'><img className='w-100' src={pro.product.imageCover} alt={pro.product.title} /></div>
                  <div className='downitem'>
                    <h3>name: {pro.product.title.slice(0, 10)}</h3>
                    <h3>price:{pro.price}</h3>
                    <h3>count:{pro.count}</h3>

                    <div className='inputDiv'>
                      <button onClick={function (e) { condition(pro.product._id, pro.count + 1) }} className='btn  mt-1 mx-1'>+</button>
                      <input onChange={(e) => { condition(pro.product._id, e.target.value) }} className='form-control cartinputnumber' placeholder='count' value={pro.count} />
                      <button onClick={function (e) { condition(pro.product._id, pro.count - 1) }} className='btn  mt-1 mx-1'>-</button>
                    </div>



                    <div><button onClick={function () { removeitems(pro.product._id) }} className='btn btn-danger'>remove item </button>
                    </div>
                  </div>

                </div>
              </div>

              </>
            })}



          </div>


        </div>
      </section>
    </> : <Loadingscreen />}
  </>
}
