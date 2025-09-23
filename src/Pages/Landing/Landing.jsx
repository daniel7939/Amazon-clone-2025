import React from 'react'
import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Catagory from "../../components/Catagory/Catagory";
import Product from '../../components/Product/Product';
import LayOut from '../../components/LayOut/LayOut';
function Landing() {
  return (
    <LayOut>
        
            <CarouselEffect/>
            <Catagory />
            <Product/>
        
    </LayOut>
  )
}

export default Landing