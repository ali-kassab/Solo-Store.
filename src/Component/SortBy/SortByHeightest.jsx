import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loadingscreen from '../Loadingscreen/Loadingscreen';
import { Link } from 'react-router-dom';

// Component to display products sorted by highest price
export default function SortByHeightest() {

  const [products, setproducts] = useState(null);

  // Function to fetch products sorted by highest price
  async function getallproducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
        params: { 'sort': '-price' }
      })
      setproducts(data.data);
    }
    catch (error) {
      let errorproducts = document.querySelector('.errorproducts');
      { errorproducts.style.display = 'block' }
      console.log("error", error);
    }
  }

  useEffect(() => {
    getallproducts()
    return () => { };
  }, []);

  return <>
    {products ? <div className="container">
      <div className="row">
        <div className='sortBy text-center'>
          <div className="dropdown">
            <Link className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              filter by price
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/sort-by-heighest-price">Heighest price</Link></li>
              <li><Link className="dropdown-item" to="/sort-by-lowest-price">Lowest price</Link></li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        {products.map((product, ind) => {
          return <div key={ind} className="col-md-3">
            <div className="position-relative mt-2 items text-center ">
              <img className='w-100 rounded-2' src={product.imageCover} alt={product.category.name} />
              <h5 className='my-3'>{product.title.slice(0, product.title.indexOf(" ", 15))}</h5>
              <h6 className='text-warning'>{product.category.name}</h6>
              <h5 className='text-primary '> {product.priceAfterDiscount ? <>
                <span className='text-decoration-line-through text-dark me-3'>{product.price}</span>
                <span className='me-1'>{product.priceAfterDiscount}</span>EGP
              </> : <span>{product.price} EGP</span>}
              </h5>
              <div className='position-absolute top-0 end-0 p-1 bg-info'>{product.ratingsAverage}</div>
            </div>
          </div>
        })}
      </div>
    </div> : <Loadingscreen />
    }
  </>
}
