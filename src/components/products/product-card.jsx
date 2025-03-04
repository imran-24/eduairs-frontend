import { Trash } from "lucide-react";
import FavoriteButton from "./favorite-button";
import { useAuth } from "../../../hooks/use-auth";

const ProductCard = ({ product, handleDelete }) => {
  const { user } = useAuth();

  return (
    <div key={product.id} className='border rounded-lg shadow relative'>
      <div className='group'>
        {product.image ? (
          <img
            src={product.image}
            alt='product image'
            className='rounded-t-lg aspect-[12/11] object-cover object-center'
          />
        ) : (
          <div className='rounded-t-lg flex items-center justify-center aspect-[12/11] object-cover object-center'>
            <p className='text-4xl lg:text-3xl font-light text-gray-200'>
              No Image{" "}
            </p>
          </div>
        )}
        {user?.id === product.user?.id && (
          <button
            onClick={(e) => handleDelete(e, product.id)}
            className='rounded-full opacity-0 group-hover:opacity-100 absolute top-2 right-2 z-20'
          >
            <Trash className='size-6 p-1 text-white' />
          </button>
        )}
      </div>
      <div className='p-2 space-y-1 hover:bg-neutral-100 transition-colors '>
        <div className='flex products-center justify-between '>
          <h3 className='font-semibold capitalize'>{product.title}</h3>
          <p className='text-xs border rounded-lg p-1 bg-neutral-200'>
            {product.category}
          </p>
        </div>
        <p className='text-gray-600 text-sm truncate'>{product.description}</p>
        <div className='flex products-center justify-between'>
          <div className='flex items-center space-x-2'>
            <p
              className={`font-medium font-mono ${
                product.discount > 0 && "line-through"
              }`}
            >
              ${product.price}
            </p>
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
