import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import $ from 'jquery'
export const CartContext = createContext()                     ///    1



export default function CartContextProvider({ children }) {
    const nav = useNavigate()

    const [numberofcartItems, setnumberofcartItems] = useState(0);
    const [cartproducts, setcartproducts] = useState(0);
    const [totalCartPrice, settotalCartPrice] = useState(0);
    const [CardId, setcardId] = useState([]);




    async function addtocart(proId) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    'productId': proId

                }, { headers: { 'token': localStorage.getItem('token') } }
            )
            console.log(data);

            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);

        } catch (error) {
            console.log('error from cart id', error);
        }
    }

    async function getcart() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: { 'token': localStorage.getItem('token') } })

            console.log('data from cart user', data);
            // console.log('data id cart', data.data._id);

            // setcartuser(data);
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
            setcardId(data.data._id);
        }
        catch (err) {


            if (err.response.status === 404) {

                $('.errormsg').fadeIn(500, function () {
                    setTimeout(function () {
                        $('.errormsg').fadeOut(500)
                        nav('/home')
                    }, 2000)
                })

            }
            console.log('err from get cart', err);
        }
    }

    useEffect(() => {
        getcart()
        return () => {

        };
    }, []);

    async function removeitems(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { 'token': localStorage.getItem('token') } })

            console.log('data from remove Items', data);

            // setcartuser(data);
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);

        }
        catch (err) {
            console.log('err from remove items', err);
        }
    }

    async function updateitems(id, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count },
                { headers: { 'token': localStorage.getItem('token') } })

            console.log('data from update Items', data);

            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);

        }
        catch (err) {


            console.log('err from update items', err);
        }
    }

    function condition(id, count) {

        if (count) {
            updateitems(id,count)
        }else{
            removeitems(id)
        }

    }




    return <CartContext.Provider value={{ condition,CardId, updateitems, addtocart, removeitems, numberofcartItems, cartproducts, totalCartPrice }}>
        <div style={{ 'display': 'none' }} className='alert alert-danger errormsg text-center text- '>please choose your orders</div>
        {children}

    </CartContext.Provider>
}
