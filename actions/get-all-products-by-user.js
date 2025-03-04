import axios from "axios";
import { apiUrl } from "../utils";

export const getAllProductsByUser = async (page) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${apiUrl}/products?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data; // Return user data properly
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null; // Return null or handle error appropriately
  }
};
