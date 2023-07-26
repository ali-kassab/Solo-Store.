import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function Onlinepayment({ userdata }) {



   

    const { CardId } = useContext(CartContext);

    async function cridetorder() {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CardId}`, {
                "shippingAddress": {
                    "details": document.querySelector('#details').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value,
                }
            }, { params: { 'url': 'http://localhost:3001' }, headers: { 'token': localStorage.getItem('token') } }
            )


            console.log(data);
            if (data.status == 'success') {
                window.open(data.session.url)
            }
            // nav('/allorders');
        }
        catch (err) {
            console.log('err from cridet', err);
        }
    }


    const formik = useFormik({

        initialValues: {
            details: '',
            phone: '',
            city: '',

        },
        onSubmit: function () {
            cridetorder()

        },


    })

    return <>

        {CardId && userdata ? <div className='container w-50 text-center'>
            <form onSubmit={formik.handleSubmit} >
                <label className='mt-3 text-dark' htmlFor="details">Details</label>
                <input name='details' value={formik.values.details} type="text" onChange={formik.handleChange} id='details' className='form-control my-2' />

                <label className='mt-3 text-dark' htmlFor="phone">Phone</label>
                <input name='phone' value={formik.values.phone} type="text" id='phone' onChange={formik.handleChange} className='form-control my-2' />

                <label className='mt-3 text-dark' htmlFor="city">City</label>
                <input name='city' value={formik.values.city} type="text" id='city' onChange={formik.handleChange} className='form-control my-2' />

                <button type='submit ' className='btn btn-danger text-light my-2 '>confirm credit</button>


            </form>
        </div> : <Loadingscreen />}


    </>

}
