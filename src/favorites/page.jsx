import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import ProductList from '../components/products/product-list';
// import { useAuth } from '../../hooks/use-auth';

const FavoritesPage = () => {
  // const {user} = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    setFavoriteProducts(JSON.parse(localStorage.getItem("favoriteProducts") || "[]"));
  }, []);


  return (
    <div className='space-y-4'>
      <Header title={"Favorite Products"} />
      <ProductList products={favoriteProducts} />
    </div>
  )
}

export default FavoritesPage
