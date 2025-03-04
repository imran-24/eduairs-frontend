import React, { useEffect, useState } from "react";
import Spiner from "../components/spiner";
;
import { useAuth } from "../../hooks/use-auth";
import Profile from "../components/profile";
import { getAllProductsByUser } from "../../actions/get-all-products-by-user";

const DashboardPage = () => {
  const {user, role} = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url = "/products") => {
    setLoading(true);
    try {
      const response = await getAllProductsByUser(url);
      console.log(response);
      setData(response); // Extract `data` array
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
      <Profile user={user} role={role} products={data.data.data} />
    </div>
  );
};

export default DashboardPage;
