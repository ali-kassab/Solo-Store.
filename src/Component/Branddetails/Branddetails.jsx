import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import '../Branddetails/Brand.css';

export default function Branddetails() {
  // Get brand ID from URL parameters
  const { id } = useParams();

  // State to store brand details data
  const [details, setDetails] = useState(null);

  // Function to fetch product details for the specified brand
  async function getData() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
        params: { 'brand': `${id}` }
      });
      setDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch product details for the specified brand when the component mounts
  useEffect(() => {
    getData();
    return () => {
    };
  }, []);

  return (
    <>
      {/* Conditional rendering based on brand details data */}
      {details ? (
        <div className='container brandpage'>
          <div className="row">
            {/* Mapping through product details array to display each product */}
            {details.length === 0 ? (
              <h2>No products available</h2>
            ) : (
              details.map((data, index) => (
                <div key={index} className="col-md-4 col-lg-3 col-sm-6">
                  <Link to={`/ProductDetails/${data.id}`}>
                    <div className="position-relative mt-2 items text-center">
                      <img className='w-100 rounded-2' src={data.imageCover} alt={data.category.name} />
                      <h5 className='my-3'>{data.title.slice(0, data.title.indexOf(" ", 15))}</h5>
                      <h6 className='text-warning'>{data.category.name}</h6>
                      <h5 className='text-primary '>
                        {data.priceAfterDiscount ? (
                          <>
                            <span className='text-decoration-line-through text-dark me-3'>{data.price}</span>
                            <span className='me-1'>{data.priceAfterDiscount}</span>EGP
                          </>
                        ) : (
                          <span>{data.price} EGP</span>
                        )}
                      </h5>
                      <div className='position-absolute top-0 end-0 p-1 bg-info'>{data.ratingsAverage}</div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <Loadingscreen />
      )}
    </>
  );
}
