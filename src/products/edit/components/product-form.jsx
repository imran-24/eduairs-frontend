import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../../../components/input";
import { X } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  price: z.number().positive("Price must be a positive number"),
  color: z.array(z.string()).nonempty("At least one color is required"),
  size: z.array(z.string()).nonempty("At least one size is required"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100%"),
    image: z.string().min(3, "Image must be string"), 
  });

const ProductForm = ({ onSubmit, product }) => {


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
      price: product?.price || 0,
      color: [],
      size: [],
      discount: product?.discount || 0,
      image: product?.image || "",
    },
  });


  // Watch for real-time updates
  const selectedColors = watch("color", []);
  const selectedSizes = watch("size", []);
  const image = watch("image");

  // const handleImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setImageBase64(reader.result); // Store Base64 for preview
  //       setValue("image", reader.result); // Store in form
  //     };
  //   }
  // };

  // Load color & size on the first render
  useEffect(() => {
    if (product?.color) {
      try {
        setValue("color", JSON.parse(product.color));
      } catch {
        setValue("color", []);
      }
    }
    if (product?.size) {
      try {
        setValue("size", JSON.parse(product.size));
      } catch {
        setValue("size", []);
      }
    }
  }, [product, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full mx-auto py-6 bg-white'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {/* Title */}
        <div>
          <Input
            type='text'
            id='title'
            label='Title'
            register={register}
            required
          />
          {errors.title && (
            <p className='text-red-500'>{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className='md:col-span-2'>
          <textarea
            {...register("description")}
            placeholder='Description'
            className='flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1 text-base shadow-sm focus:ring-1 focus-visible:outline-none focus:ring-black'
          />
          {errors.description && (
            <p className='text-red-500'>{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <Input
            type='text'
            id='category'
            label='Category'
            register={register}
            required
          />
          {errors.category && (
            <p className='text-red-500'>{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type='number'
            {...register("price", { valueAsNumber: true })}
            placeholder='Price'
            className='flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1'
          />
          {errors.price && (
            <p className='text-red-500'>{errors.price.message}</p>
          )}
        </div>

        {/* Color Selection */}
        <div className='space-y-1'>
          <input
            type='text'
            placeholder='Add color and press enter'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (e.target.value.trim()) {
                  setValue("color", [...selectedColors, e.target.value.trim()]);
                  e.target.value = "";
                }
              }
            }}
            className='flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1'
          />
          {errors.color && (
            <p className='text-red-500'>{errors.color.message}</p>
          )}

          {/* Display Selected Colors */}
          <div className='flex items-center gap-2 '>
            {selectedColors.map((color, index) => (
              <span
                key={index}
                className='p-1 capitalize text-xs bg-gray-200 rounded-lg flex items-center space-x-2'
              >
                {color}
                <button
                  type='button'
                  onClick={() =>
                    setValue(
                      "color",
                      selectedColors.filter((_, i) => i !== index)
                    )
                  }
                >
                  <X className='size-3 ml-2 text-rose-500' />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className='space-y-1'>
          <input
            type='text'
            placeholder='Add size and press enter'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (e.target.value.trim()) {
                  setValue("size", [...selectedSizes, e.target.value.trim()]);
                  e.target.value = "";
                }
              }
            }}
            className='flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1'
          />
          {errors.size && <p className='text-red-500'>{errors.size.message}</p>}

          {/* Display Selected Sizes */}
          <div className='flex items-center gap-2 '>
            {selectedSizes.map((size, index) => (
              <span
                key={index}
                className='p-1 capitalize text-xs bg-gray-200 rounded-lg flex items-center space-x-2'
              >
                {size}
                <button
                  type='button'
                  onClick={() =>
                    setValue(
                      "size",
                      selectedSizes.filter((_, i) => i !== index)
                    )
                  }
                >
                  <X className='size-3 ml-2 text-rose-500' />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div>
          <input
            type='number'
            {...register("discount", { valueAsNumber: true })}
            placeholder='Discount'
            className='flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1'
          />
          {errors.discount && (
            <p className='text-red-500'>{errors.discount.message}</p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div className='py-6'>
        {/* Preview */}
        {image && <img src={image} alt='Preview' className='h-40 mb-4' />}

        <Input
          type='text'
          id={"image"}
          label={"Image Url"}
          register={register}
          required
        />
        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
      </div>

      {/* Submit & Cancel Buttons */}
      <div className='flex space-x-4'>
        <button
          type='submit'
          className='border rounded-lg p-2 px-4 bg-black text-white hover:bg-gray-800 transition-colors'
        >
          Save Changes
        </button>
        <button
          type='button'
          onClick={() => {
            setValue("color", []);
            setValue("size", []);
          }}
          className='border rounded-lg p-2 px-4 bg-gray-200 text-black hover:bg-gray-300 transition-colors'
        >
          Clear Selections
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
