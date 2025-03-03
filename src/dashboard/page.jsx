import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../actions/get-all-products";
import { Link } from "@inertiajs/react";
import Spiner from "../components/spiner";
import ProductList from "../components/products/product-list";
import Header from "../components/header";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url = "/product") => {
    setLoading(true);
    try {
      const response = await getAllProducts(url);
      setData(response.data.data); // Extract `data` array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spiner />;

  return (
    <div className='space-y-2'>
      <Header title={"All Products"} />
      <ProductList products={data} />
      {/* Pagination */}
      {/* {pagination?.links && (
        <div className='flex space-x-2 mt-4'>
          {pagination.links.map((link, index) => (
            <Link
              key={index}
              preserveScroll
              href={link.url || ""}
              className={`px-3 py-2 text-sm rounded-lg text-gray-600 ${
                link.active ? "bg-gray-200" : ""
              } ${!link.url ? "!text-gray-300 cursor-not-allowed" : ""}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
              onClick={(e) => {
                if (!link.url) e.preventDefault();
                else fetchData(link.url); // Fetch data for new page
              }}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default DashboardPage;
