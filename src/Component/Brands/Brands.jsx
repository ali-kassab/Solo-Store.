import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link } from 'react-router-dom';

export default function Brands() {

  const [brands, setbrands] = useState(null);

  async function getallbrands() {

    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setbrands(data.data)
      console.log(data.data);

    }
    catch (err) {
      console.log(err);
    };


  }
  useEffect(() => {
    getallbrands()
    return () => {

    };
  }, []);


  return <>

    {brands ?
      <div className='container'>
        <div className="row">
          <div className="col-md-3">
            <div className='text-info item mt-5'>
              <h2>OUR BRANDS</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, quasi?.</p>
            </div>
          </div>
          {brands.map((brand, ind) => {
            return <div key={ind} className="col-md-3">
              <Link to={`/brandDetails/${brand._id}`}>

                <div className='item text-center'>
                  <img className='w-100' src={brand.image} alt={brand.name} />
                  <h5>{brand.name}</h5>
                </div>

              </Link>


            </div>

          })}


        </div>
      </div>

      : <Loadingscreen />}

  </>
}
