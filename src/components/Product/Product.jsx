import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
function Product() {
    const [products, setproducts] = useState()
    useEffect(() => {
       axios.get('https://fakestoreapi.com/products')
       .then((res) => setproducts(res.data)).catch((err) => 
        console.log(err))
    }, [])
  return (
<section className={classes.productsection}>
    {products && products.map((singleproduct) => (
        <ProductCard renderAdd={true} Product={singleproduct} key={singleproduct.id} />
    ))}
</section>  )
}

export default Product