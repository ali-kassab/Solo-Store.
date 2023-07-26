import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import '../Branddetails/Brand.css'



export default function Branddetails() {


    const { id } = useParams()
    const [details, setdetails] = useState(null);

    async function getdata() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
                params: { 'brand': `${id}` }
            })

            console.log(data.data)
            setdetails(data.data)
        }

        catch (err) {
            // console.log(err);
        };

    }
    useEffect(() => {
        getdata()
        return () => {

        };
    }, []);
    return <> {details ?
        <div className='container brandpage'>
            <div className="row">


                {details.length == 0 ? <h2>No products avalable</h2> : details.map((data) => {
                    return <div className="col-md-4 col-lg-3 col-sm-6">

                        <Link to={`/ProductDetails/${data.id}`}>


                            <div className="position-relative mt-2 items text-center ">
                                <img className='w-100 rounded-2' src={data.imageCover} alt={data.category.name} />
                                <h5 className='my-3'>{data.title.slice(0, data.title.indexOf(" ", 15))}</h5>
                                <h6 className='text-warning'>{data.category.name}</h6>
                                <h5 className='text-primary '> {data.priceAfterDiscount ? <>
                                    <span className='text-decoration-line-through text-dark me-3'>{data.price}</span>
                                    <span className='me-1'>{data.priceAfterDiscount}</span>EGP

                                </> : <span>{data.price} EGP</span>}
                                </h5>
                                <div className='position-absolute top-0 end-0 p-1 bg-info'>{data.ratingsAverage}</div>
                            </div>

                        </Link>
                    </div>
                })}


            </div>
        </div>

        : <Loadingscreen />}
    </>
}
