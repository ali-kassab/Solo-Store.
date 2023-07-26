import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Slider/Slider.css'

export default function MySlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


    return <>

        <div className='slider'>
            <div className='intro'><h2 className='text-danger  text-center'> Fashion Central </h2>
            <p>Love it , Feel it , Enjoy it <img  src={require('./../../images/Protect.png')} alt="" /> </p>
            
            </div>
            <Slider {...settings}>
                <div>
                    <img  className='w-100'    src={require('../../images/SP_Offers_Block02MAR18.jpg')} alt="offer" />
                </div>
                <div>
                    <img  className='w-100'   src={require('../../images/SP_Offers_Block04MAR18.jpg')} alt="offer" />
                </div>
                <div>
                    <img  className='w-100'   src={require('../../images/SP_Offers_Block06MAR18.jpg')} alt="offer" />
                </div>
                <div>
                    <img  className='w-100'   src={require('../../images/SP_Offers_222Block10MAR18.jpg')} alt="offer" />
                </div>
                <div>
                    <img  className='w-100'   src={require('../../images/SP_Offers_Block08MAR18.jpg')} alt="offer" />
                </div>
               
            </Slider>
        </div>

    </>
}
