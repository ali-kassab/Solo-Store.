import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MySlider from '../Slider/Slider';
import { CartContext } from '../../Context/CartContext';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import 'animate.css';

export default function NextPage() {
    const { addtocart } = useContext(CartContext);
    const [products, setproducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch data for the next page
    async function nextpage() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
                params: { 'page': '2' }
            });
            setproducts(data.data);
            setIsLoading(false);
        }
        catch (error) {
            // Handle error if data fetching fails
            let errorproducts = document.querySelector('.errorproducts');
            errorproducts.style.display = 'block';
            console.log("error", error);
        }
    }

    // Fetch data for the next page on component mount
    useEffect(() => {
        nextpage();
        return () => { };
    }, []);

    return (
        <>
            {/* Display loading screen while data is being fetched */}
            {isLoading ? <Loadingscreen /> : (
                <>
                    {/* Error message to display if data fetching fails */}
                    <div style={{ 'display': "none" }} className="bg-opacity-50 container bg-danger errorproducts text-center my-auto">
                        <h2>please reload the page</h2>
                    </div>

                    {/* Render products if data is available */}
                    {products ? (
                        <>
                            <MySlider />
                            <div className="container Home">
                                <div className="row mt-3">
                                    {/* Dropdown for sorting options */}
                                    <div className='sortBy my-3 '>
                                        <div className="dropend">
                                            <Link className="btn sortbylink dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort by
                                            </Link>
                                            <ul className="dropdown-menu rounded-2">
                                                <li><Link className="dropdown-item" to="/sort-by-heighest-price">Heighest price <i className="fa-solid fa-arrow-up me-1 "></i></Link></li>
                                                <li><Link className="dropdown-item" to="/sort-by-lowest-price">Lowest price <i className="fa-solid fa-arrow-down me-1"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Success message displayed when item is added to cart */}
                                    <div style={{ 'zIndex': '9999', 'display': 'none' }} className='text-center addedSuccess alert alert-info position-fixed bottom-0 left-0'>added success</div>
                                    {/* Render product items */}
                                    {products.map((product, ind) => {
                                        return (
                                            <div key={ind} className="col-md-3">
                                                <div className='item position-relative animate__animated animate__fadeInTopRight'>
                                                    <div className="upperHome">
                                                        <Link to={`/ProductDetails/${product.id}`}>
                                                            <div className="position-relative items text-center">
                                                                <div className='homedivImg'>
                                                                    <img className='w-100 rounded-2' src={product.imageCover} alt={product.category.name} />
                                                                </div>
                                                                <div><h5>{product.title.slice(0, product.title.indexOf(" ", 15))}</h5></div>
                                                                <div><h6 className='text-warning'>{product.category.name}</h6></div>
                                                                <div><h5 className='text-primary '>
                                                                    {product.priceAfterDiscount ? (
                                                                        <>
                                                                            <span className='text-decoration-line-through productPrice'>{product.price}</span>
                                                                            <span className='me-1'>{product.priceAfterDiscount}</span>EGP
                                                                        </>
                                                                    ) : (
                                                                        <span>{product.price} EGP</span>
                                                                    )}
                                                                </h5></div>
                                                                <div className='position-absolute top-0 end-0 p-1 score'>{product.ratingsAverage}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className='lower text-center mb-5'>
                                                        <button id={`addedSuccess${ind}`} onClick={() => addtocart(product.id, ind)} className='btn btn-success'>add to cart</button>
                                                        <button style={{ 'display': 'none' }} id={`removeSuccess${ind}`} className='btn btn-danger ms-2'>-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='coverfixed'></div>
                        </>
                    ) : null}
                </>
            )}
        </>
    );
}
