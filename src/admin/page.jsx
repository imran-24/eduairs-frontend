import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../actions/get-all-products";
import Spiner from "../components/spiner";
import ProductList from "../components/products/product-list";
import Header from "../components/header";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(page);
      console.log(response);
      setData(response.data); // Extract `data` array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchNextPrevTasks = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get("page"));
  };

  const renderPaginationLinks = () => {
    return (
      <ul className='pagination flex items-center space-x-2'>
        {data.links?.map((link, index) => (
          <li key={index}>
            <a
              className={`px-3   py-1 border rounded-md transition-all duration-200 ${
                link.active
                  ? "bg-blue-600 text-white font-semibold border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-200 border-gray-300"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => fetchNextPrevTasks(link.url)}
            >
              {link.label.replace("&laquo;", "").replace("&raquo;", "")}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) return <Spiner />;

  return (
    <div className='space-y-2'>
      <Header title={"All Products"} />
      <ProductList products={data.data} />
      {/* Pagination */}
      <div className='py-6 text-lg  flex items-center justify-between text-gray-600'>
        <span>
          Showing {data.from} / <span className='text-blue-600'>{data.to}</span>{" "}
          of <span className='text-blue-600'>{data.total}</span> results.
        </span>
        <div>{renderPaginationLinks()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
