import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function Paymentcash({ userdata }) {



    const nav = useNavigate()

    const { CardId } = useContext(CartContext);

    async function CashOrder(shippingAddress) {

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CardId}`, {
                "shippingAddress": {
                    "details": document.querySelector('#details').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value,
                }
            }, {
                headers: { 'token': localStorage.getItem('token') }
            }
            )


            console.log('from cashOrder', data);
            nav('/allorders');

        }
        catch (err) {
            console.log('err from cash order ', err);
        }

    }


    const formik = useFormik({

        initialValues: {
            details: '',
            phone: '',
            city: '',

        },
        onSubmit:
            function () {
                CashOrder(CardId)

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

                <button name='confirm cash' type='submit' className='btn btn-danger text-light my-2 '>confirm cash</button>
         

            </form>
        </div> : <Loadingscreen />}


    </>
}
