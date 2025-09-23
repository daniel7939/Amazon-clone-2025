import React, { useEffect, useState } from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import classes from './Result.module.css'
import { productUrl } from '../../Api/endPoints'  
import ProductCard from '../../components/Product/ProductCard'
function Result() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    // Only fetch for valid categories
    const validCategories = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing"
    ];
    if (validCategories.includes(categoryName)) {
      axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.log(err));
    } else {
      setResults([]);
    }
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        <div>
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                Product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Result
