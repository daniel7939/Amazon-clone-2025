import React, { useState, useEffect } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);  // null instead of {}
  const [loading, setLoading] = useState(true);  // loading state
  const [error, setError] = useState(null);      // error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // ✅ dependency added

  return (
    <LayOut>
      {loading && <p>Loading product...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product && <ProductCard Product={product} />}
    </LayOut>
  );
}

export default ProductDetail;
