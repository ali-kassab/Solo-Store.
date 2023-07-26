import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link, Navigate } from 'react-router-dom';
import MySlider from '../Slider/Slider';
import { CartContext } from './../../Context/CartContext';
import $ from 'jquery'
import '../Home/Home.css'
import 'animate.css';
import NextPage from '../NextPage/NextPage';
import Swal from 'sweetalert2';
export default function Home() {


  const { addtocart, numberofcartItems } = useContext(CartContext);



  const [products, setproducts] = useState(null);


  // function afterclick(id, ind) {

  //   addtocart(id);
  //   $('.addedSuccess').fadeIn(1000, function () {
  //     setTimeout(() => {
  //       $('.addedSuccess').fadeOut(1000)
  //     }, 1000)
  //   })

  //   $(`#removeSuccess${ind}`).fadeIn(1000)

  // }

  async function getallproducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
        params: { 'page': '1' }
      })

      // console.log(data.data);
      setproducts(data.data);
    }
    catch (er) {
      let errorproducts = document.querySelector('.errorproducts');
      { errorproducts.style.display = 'block' }
      console.log("error", er);
    }

  }

//  function added(){
//   $('.addedsuc').fadeIn(500, function () {
//     setTimeout(() => {
//       $('.addedsuc').fadeOut(1000)
//     }, 500)
//   }

//   )
//  }

  useEffect(() => {
    getallproducts()
    return () => {

    };
  }, []);



  return <>


    <div style={{ 'display': "none" }} className="bg-opacity-50  container bg-danger errorproducts text-center my-auto  "><h2>please reload the page</h2></div>


    {products ? <>
      <MySlider />
      <div className="container Home">



        <div className="row mt-3">



          <div className='sortBy my-3 '>
            <div className="dropend">
              <Link className="btn sortbylink dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by <i class="fa-solid fa-filter"></i>
              </Link>

              <ul className="dropdown-menu rounded-2">
                <li><Link className="dropdown-item" to="/sort-by-heighest-price">Heighest price <i className="fa-solid fa-arrow-up me-1 "></i></Link></li>
                <li><Link className="dropdown-item" to="/sort-by-lowest-price">Lowest price <i className="fa-solid fa-arrow-down me-1"></i></Link></li>
              </ul>
            </div>
          </div>

          <div style={{ 'zIndex': '9999', 'display': 'none' }} className='text-center addedSuccess alert alert-info position-fixed bottom-0 left-0'>added success</div>
          {products.map((product, ind) => {
            return <div key={ind} className="col-md-4 col-lg-3 col-sm-6 my-4 ">
              <div className='item  itemBlog animate__animated animate__fadeInLeftBig animate__slower' >


                <div className="upperHome">
                  <Link to={`/ProductDetails/${product.id}`}>
                    <div className="position-relative  items text-center ">

                      <div className='homedivImg'><img className='w-100 rounded-2' src={product.imageCover} alt={product.category.name} /> </div>
                      <div> <h5 >{product.title.slice(0, product.title.indexOf(" ", 15))}</h5></div>
                      <div><h6 className='text-warning'>{product.category.name}</h6></div>
                      <div><h5 className='text-primary '> {product.priceAfterDiscount ? <>
                        <span className='text-decoration-line-through productPrice '>{product.price}</span>
                        <span className='me-1'>{product.priceAfterDiscount}</span>EGP

                      </> : <span>{product.price} EGP</span>}
                      </h5></div>
                      <div className='position-absolute top-0 end-0 p-1 score '>{product.ratingsAverage}</div>
                    </div>
                  </Link>
                </div>


                <div className='lower text-center mb-5'>
                <div className='addedsuc d-none mt-3 bg-danger'>added successfully</div>
                  {localStorage.getItem('token') ?

                    <>
                      <button id={`addedSuccess${ind}`} onClick={function () {
                        addtocart(product.id, ind)

                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'added successfully',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }} className={' btn addtocart d-none btn-success'} >add to cart</button>
                      <button style={{ 'display': 'none' }} id={`removeSuccess${ind}`} className='btn btn-danger ms-2'>-</button>

                      
                    </>

                    : ""}

                </div>
              </div>
            </div>

          })}

        </div>
      </div>
      <div className='nextpage'> <div className='mt-2 me-2 d-flex'><h6>next page</h6>     <i class="fa-solid ms-2 my-1 fa-arrow-right"></i></div>
        <button className='btn  page2'><Link className='text-light' to={'/NextPage'}> 2</Link></button>
      </div>
      <div className='coverfixed '
      ></div>
    </> : <Loadingscreen />
    }



  </>
}
