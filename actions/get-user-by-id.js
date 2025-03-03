import axios from "axios";
import { apiUrl } from "../utils";

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${apiUrl}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return user data properly
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null or handle error appropriately
  }
};
