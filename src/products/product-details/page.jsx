import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../actions/get-product-by-id";
import Header from "../../components/header";
import Spiner from "../../components/spiner";
import ProductBody from "./components/product-body";
import FavoriteButton from "../../components/products/favorite-button";
import { ProductButton } from "../components/product-button";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    setLoading(true);
    if (!id) return;
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchData(id);
  }, [id]);

  if (loading) return <Spiner />;

  if (!product) return;
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Header title={"Product Details"} />
          <FavoriteButton product={product} />
        </div>
        <ProductButton url={`/products/edit/${id}`} title={"Edit Product"} />
      </div>
      <div className='max-w-7xl w-full mx-auto'>
        <ProductBody product={product} />
      </div>
    </div>
  );
};
export default ProductDetailPage;
