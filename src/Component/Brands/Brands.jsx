import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link } from 'react-router-dom';

export default function Brands() {
  // State to store brands data
  const [brands, setBrands] = useState(null);

  // Function to fetch all brands data from the API
  async function getAllBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch all brands data when the component mounts
  useEffect(() => {
    getAllBrands();
    return () => {
    };
  }, []);


  return (
    <>
      {/* Conditional rendering based on brands data */}
      {brands ? (
        <div className='container'>
          <div className="row">
            <div className="col-md-3">
              <div className='text-info item mt-5'>
                <h2>OUR BRANDS</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, quasi?.</p>
              </div>
            </div>
            {/* Mapping through brands array to display each brand */}
            {brands.map((brand, ind) => (
              <div key={ind} className="col-md-3">
                <Link to={`/brandDetails/${brand._id}`}>
                  <div className='item text-center'>
                    <img className='w-100' src={brand.image} alt={brand.name} />
                    <h5>{brand.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loadingscreen />
      )}
    </>
  );
}
