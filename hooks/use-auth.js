import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../utils";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    
    const checkTokenValidation = () => {
      axios
        .get(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.data);
          setRole(response.data.role)
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("token"); // Remove invalid token
        })
        .finally(() => {
          setLoading(false);
        });
    };

    checkTokenValidation();

  }, []);

  return { user, isAuthenticated, loading, role };
};
