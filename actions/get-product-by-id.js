import axios from "axios";
import { apiUrl } from "../utils";

export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${apiUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user data properly
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null; // Return null or handle error appropriately
  }
};
