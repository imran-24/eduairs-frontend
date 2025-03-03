import React from "react";
import ProductForm from "./components/product-form";
import axios from "axios";
import { apiUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();

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
      .post(
        `${apiUrl}/products`,
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
      .then((response) => {
        console.log("Success:", response.data)
        navigate('/products');
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=''>
      <div>
        <h2 className='text-lg'>Create Product</h2>
        <p>Add a new product to your product list</p>
      </div>
      <div>
        <ProductForm onSubmit={handleProductSubmit} />
      </div>
    </div>
  );
};

export default CreateProductPage;
