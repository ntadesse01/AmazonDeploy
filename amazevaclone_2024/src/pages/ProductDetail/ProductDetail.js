import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Components/Product/ProductCard';
import { productUrl } from "../../Api/endPoints";

function Loader() {
  // Define your Loader component here
  return <div>Loading...</div>;
}

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({}); 

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  console.log(product);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard 
        product={product} 
        flex={true} 
        renderDesc = {true}
        renderAdd = {true}
        /> )}
    </LayOut>
  );
}

export default ProductDetail;