import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link } from 'react-router-dom';
import '../Cart/Cart.css';
import 'animate.css';

export default function Cart() {
  // Context for managing cart items
  const { condition, numberofcartItems, isLoading, cartproducts, totalCartPrice, removeitems } = useContext(CartContext);

  // State for controlling payment popup
  const [paymentpop, setPaymentPop] = useState(false);

  return (
    <>
      {/* Conditional rendering based on whether cart products are available */}
      {isLoading ? (
        <Loadingscreen />
      ) : (
        <section>
          <div className="container position-relative">
            <div >
              <div className='row d-flex justify-content-between'>
                {/* Section for displaying cart summary */}
                <div className='col-lg-6 col-md-6 col-sm-12 '>
                  <div className='bigDivcart'>
                    <div className=' animate__animated animate__fadeInLeft'>
                      <div>
                        <h2>Total Price:
                          <span className='d-inline-block text-dark animate__animated animate__heartBeat animate__delay-2s'>
                            {totalCartPrice}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <h2>Number of Items:
                          <span className='d-inline-block text-dark animate__animated animate__heartBeat animate__delay-2s'>
                            {numberofcartItems}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Section for initiating payment */}
                <div className='col-lg-6 col-md-6 col-sm-12 position-relative '>
                  <div className='animate__animated animate__fadeInRight'>
                    <button onClick={() => { setPaymentPop(true) }} className='paynow animate__animated animate__swing animate__animated'>
                      <p>Pay from here <i class="fa-solid fa-dollar-sign "></i> </p>
                    </button>
                  </div>

                  {/* Payment popup */}
                  <div className='popup'>
                    <div className={paymentpop ? 'card motion' : 'card'}>
                      <div className="card-body animate__animated animate__fadeInLeft">
                        <h5 className="card-title">Pay Now</h5>
                        <Link to={'/paymentcash'}><button className='btn'>Payment Cash</button></Link>
                        <Link to={'/onlinepayment'}><button className='btn'>Payment Credit</button></Link>
                      </div>
                      <img className='w-50' src={require('../../images/Holding ID Card.png')} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section for displaying cart items */}
            <div className="row">
              {cartproducts.map((pro, ind) => (
                <div key={ind} className="col-md-4 col-lg-3 col-sm-6 bigitem">
                  <div className="itemCart">
                    <div className='homedivImg'><img className='w-100' src={pro.product.imageCover} alt={pro.product.title} /></div>
                    <div className='downitem'>
                      <h3>Name: {pro.product.title.slice(0, 10)}</h3>
                      <h3>Price: {pro.price}</h3>
                      <h3>Count: {pro.count}</h3>
                      <div className='inputDiv'>
                        <button onClick={() => { condition(pro.product._id, pro.count + 1) }} className='btn mt-1 mx-1'>+</button>
                        <input onChange={(e) => { condition(pro.product._id, e.target.value) }} className='form-control cartinputnumber' placeholder='Count' value={pro.count} />
                        <button onClick={() => { condition(pro.product._id, pro.count - 1) }} className='btn mt-1 mx-1'>-</button>
                      </div>
                      <div><button onClick={() => { removeitems(pro.product._id) }} className='btn btn-danger'>Remove Item</button></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
