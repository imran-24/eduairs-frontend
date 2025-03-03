import React from "react";
import Header from "../../../components/header";

const ProductBody = ({ product }) => {
  console.log(product);
  return (
    <div className='grid lg:grid-cols-2 gap-4 pb-4'>
      <img src={product?.image} alt='Product Image' className='aspect-auto  ' />
      <div className='space-y-2'>
        <Header title={product.title} description={product.description} />
        <div className='space-y-3'>
          <div>
            <p className="pb-1">Colors: </p>
            <div className='space-x-2 flex items-center'>
              {JSON.parse(product.color).map((color, index) => (
                <div key={index}>
                  <p className='capitalize text-black bg-slate-200 w-fit rounded-lg p-1'>
                    {color}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="pb-1">Sizes: </p>
            <div className='flex items-center space-x-2'>
              {JSON.parse(product.size).map((color, index) => (
                <div key={index}>
                  <p className='capitalize text-black bg-neutral-200 w-fit rounded-lg p-1'>
                    {color}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className='text-xl text-black'>${product.price - product.discount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBody;
