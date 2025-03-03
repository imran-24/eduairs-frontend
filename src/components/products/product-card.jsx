import { Trash } from "lucide-react";
import FavoriteButton from "./favorite-button";

const ProductCard = ({ product, handleDelete }) => {
  
  return (
    <div key={product.id} className=' border rounded-lg shadow relative'>
      <div className="group">
        <img src={product.image} alt='product image' className='rounded-t-lg aspect-[12/11] object-cover object-center' />
        <button onClick={(e) => handleDelete(e, product.id)}  className="rounded-full opacity-0 group-hover:opacity-100 absolute top-2 right-2 z-20">
          <Trash className="size-6 p-1 text-white" />
        </button>
      </div>
      <div className='p-2 space-y-1 hover:bg-neutral-100 transition-colors '>
        <div className='flex products-center justify-between '>
          <h3 className='font-semibold capitalize'>{product.title}</h3>
          <p className='text-xs border rounded-lg p-1 bg-neutral-200'>
            {product.category}
          </p>
        </div>
        <p className='text-gray-600 text-sm'>{product.description}</p>
        <div className='flex products-center justify-between'>
          <div className="flex items-center space-x-2">
            <p className={`font-medium font-mono ${product.discount > 0 && "line-through"}`}>${product.price}</p>
            {product.discount > 0 && (
              <p className=' font-medium font-mono'>
                ${product.price - product.price * (product.discount / 100)}
              </p>
            )}
          </div>
          <FavoriteButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
