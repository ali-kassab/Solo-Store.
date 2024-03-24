import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'

// Context to manage the cart state
export const CartContext = createContext();

// Component to provide cart context to its children
export default function CartContextProvider({ children }) {
    const nav = useNavigate();

    const [numberofcartItems, setnumberofcartItems] = useState(0);
    const [cartproducts, setcartproducts] = useState(0);
    const [totalCartPrice, settotalCartPrice] = useState(0);
    const [CardId, setcardId] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // Function to add product to cart
    async function addtocart(proId) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    'productId': proId
                }, { headers: { 'token': localStorage.getItem('token') } }
            )
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
        } catch (error) {
            console.log('error from cart id', error);
        }
    }

    // Function to fetch cart details
    async function getcart() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { 'token': localStorage.getItem('token') } }
            )
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
            setcardId(data.data._id);
            setIsLoading(false);
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
        return () => { };
    }, []);

    // Function to remove items from cart
    async function removeitems(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { headers: { 'token': localStorage.getItem('token') } }
            )
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
        }
        catch (err) {
            console.log('err from remove items', err);
        }
    }

    // Function to update items in cart
    async function updateitems(id, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count },
                { headers: { 'token': localStorage.getItem('token') } }
            )
            setcartproducts(data.data.products);
            setnumberofcartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
        }
        catch (err) {
            console.log('err from update items', err);
        }
    }

    // Function to conditionally update or remove items from cart
    function condition(id, count) {
        if (count) {
            updateitems(id, count)
        } else {
            removeitems(id)
        }
    }

    return (
        <CartContext.Provider value={{ condition,isLoading, CardId, updateitems, addtocart, removeitems, numberofcartItems, cartproducts, totalCartPrice }}>
            {children}
        </CartContext.Provider>
    );
}
