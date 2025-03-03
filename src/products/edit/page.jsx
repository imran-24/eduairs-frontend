import React, { useEffect, useState } from "react";
import ProductForm from "./components/product-form";
import axios from "axios";
import { apiUrl } from "../../../utils";
import { getProductById } from "../../../actions/get-product-by-id";
import { useParams } from "react-router-dom";
import Spiner from "../../components/spiner";

const EditProductPage = () => {
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
  const handleProductSubmit = (data) => {
    const {
      title,
      description,
      category,
      color,
      price,
      size,
      discount,
      image,
    } = data;

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !size.length ||
      !color.length ||
      !discount ||
      !image
    )
      alert("Some field missing!");

    console.log(data);

    axios
      .put(
        `${apiUrl}/products/${id}`,
        {
          ...data,
          color: JSON.stringify(data.color),
          size: JSON.stringify(data.size),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => console.log("Success:", response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=''>
      <div>
        <h2 className='text-lg'>Edit Product</h2>
        <p>Make changes to the product details</p>
      </div>
      <div>
        {product && <ProductForm product={product} onSubmit={handleProductSubmit} />}
      </div>
    </div>
  );
};

export default EditProductPage;
