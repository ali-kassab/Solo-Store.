import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import $ from "jquery";

export default function Prodetails() {

    let { addtocart, removeitems } = useContext(CartContext);

    const [details, setdetails] = useState([]);
    const { id } = useParams();
    // console.log(id);
    async function getDetails() {

        try {

            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

            // console.log(data.data);

            setdetails(data.data)

        }
        catch (err) {
            console.log(err);
        }


    }
    useEffect(() => {
        getDetails()
        return () => {

        };
    }, []);
    // console.log(details);



    // let btnAdd = document.querySelector('.btnAdd')
    // let addRemove = document.querySelector('.btnRemove')
    // let divSuccess = document.querySelector('.divSuccess')
    function afterclick(id) {
        addtocart(id)
        // $('.divSuccess').fadeIn(1000, function () {
        //     setTimeout(() => {
        //         $('.divSuccess').fadeOut(1000)
        //     }, 2000);
        // })
        // $(".btnRemove").toggleClass()
        // addRemove.style.display = 'block'
        // btnAdd.style.display = 'none'

    }

    function afterRemove(id) {
        removeitems(id)
        // btnAdd.style.display = 'block'
        // addRemove.style.display = 'none'
    }

    return <>

        <div className="container">
            <div className="row">
                {details ? <>
                    <div className="col-3">
                        <div className="item">
                            <img className='w-100' src={details.imageCover} alt={details.name} />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="item">
                            <h2>Title:{details.title}</h2>
                            <p> Description:{details.description}</p>
                            <h5>Price:{details.price}</h5>
                            <h6>Quantity:{details.quantity}</h6>
                            <h6>id:{details.id}</h6>



                            <button onClick={function () { afterclick(details.id) }} className='btn  text-center btnAdd btn-success w-100'>add to cart + </button>
                            <button onClick={function () { afterRemove(details.id) }}  className=' my-3 text-center btn btnRemove btn-danger w-100'>remove from cart - </button>

                            <div style={{ 'display': 'none' }} className='alert text-center alert-success divSuccess w-100 '> product added </div>
                            <div style={{ 'display': 'none' }} className='alert text-center alert-info ay7aga w-100 '> ay7aga </div>



                        </div>
                    </div>

                </> : <Loadingscreen />}
            </div>

        </div>
    </>
}
