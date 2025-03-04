import React from "react";
import ProductCard from "./product-card";
import { Link } from "react-router-dom";

const ProductList = ({ products, onDelete }) => {

  if(!products.length) return; 
   
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {products.map((item, index) => (
        <Link key={index} to={`/products/${item.id}`}>
            <ProductCard product={item} key={index} handleDelete={onDelete}  />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
