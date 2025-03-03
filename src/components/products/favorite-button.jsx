import { Heart } from "lucide-react";
import React, { useState } from "react";

const FavoriteButton = ({ product }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  });

  const toggleFavorite = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteProducts") || "[]"
    );
    const isAlreadyFavorite = storedFavorites.some(
      (fav) => fav.id === product.id
    );

    let updatedFavorites;
    if (isAlreadyFavorite) {
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...storedFavorites, product];
    }

    // Update localStorage
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));

    // Update state
    setFavorites(updatedFavorites);
  };
  
  return (
    <div>
      <button
        onClick={(e) => toggleFavorite(e, product)}
        className='flex products-center space-x-1'
      >
        <Heart
          className={`size-5 text-white transition-colors ease-in-out ${
            favorites?.some((fav) => fav.id === product.id)
              ? "fill-rose-500"
              : "fill-neutral-300"
          }`}
        />
      </button>
    </div>
  );
};

export default FavoriteButton;
