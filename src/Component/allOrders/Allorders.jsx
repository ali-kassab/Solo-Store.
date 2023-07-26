import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Loadingscreen from '../Loadingscreen/Loadingscreen';

export default function Allorders({ userdata }) {

    const [allorders, setallorders] = useState(['']);
    async function getallorders() {

        try {

            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userdata.id}`)
            console.log(data);
            setallorders(data)
        } catch (err) {
            console.log("err from all orders", err);
        }

    }

    useEffect(() => {
        getallorders()
        return () => {

        };

    }, []);
    return <>
        {allorders ? <div className="container">
            <div className="row">





                {allorders.map((pro, ind) => {
                    return <div key={ind} className="col-3">

                        <div className='border border-3'>
                            <div className='container'>
                                <div className="row">
                                    {pro.cartItems.map((item, index) => {
                                        return <div key={index} className="col-sm-6">
                                            <div className='item'>

                                                <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                                                <h5>title: {item.product.title.slice(0, 15)}</h5>
                                                <h4>count: {item.count}</h4>
                                                <h4>price: {item.price}</h4>
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                            <div className='bg-primary  rounded-2 p-3'>
                                <h5>price:{pro.totalOrderPrice}</h5>
                                <h5>order type:{pro.paymentMethodType}</h5>
                                <p>this order was deleverd to({pro.shippingAddress.details}) in ({pro.shippingAddress.city}) for this number({pro.shippingAddress.phone})</p>
                            </div>
                        </div>

                    </div>
                })}

            </div>
        </div>
            : <Loadingscreen />}







    </>
}
