import React, { useState } from "react";
import Avatar from "./avatar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils";

const Navbar = ({ user, role }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  const toggleMenu = () => setShow((prev) => !prev);

  const signout = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    axios
      .post(`${apiUrl}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("success", response);
        localStorage.removeItem("token");
        toggleMenu();
        window.location.assign("/login");
      })
      .catch((error) => {
        console.error("Something went wrong:", error);
      });
  };
  return (
    <div className='h-24  sticky top-0 flex flex-col  justify-center px-4 bg-white  text-black  w-full z-50 '>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-2xl font-mono'>EduAirs</h2>
        </div>
        {user && (
          <button onClick={toggleMenu}>
            <Avatar name={user.name} />
          </button>
        )}
        {show && (
          <div className='absolute top-14 right-4 bg-slate-50  min-w-52  aspect-[3:2] rounded-lg transition-all ease-in-out duration-200 shadow-lg z-40'>
            <div className='flex flex-col   space-y-1 p-4'>
              <Avatar name={user.name} lg />
              <div>
                <p className='text-xs font-medium'>{user.name}</p>
                <p className='text-xs text-neutral-500'>{user.email}</p>
              </div>
              <button
                onClick={signout}
                className='block text-sm font-medium hover:text-black bg-neutral-200 hover:bg-neutral-100 transition-all ease-in-out duration-200  p-2 rounded-lg '
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {user && (
          <div className='flex items-center gap-2'>
            {role === "admin" && (
              <Link
                to={`/admin`}
                className={`block   hover:text-black hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${
                  pathname === "admin" ? "bg-neutral-200" : "bg-neutral-100"
                }`}
              >
                Admin Panel
              </Link>
            )}
            <Link
              to={`/dashboard`}
              className={`block   hover:text-black hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${
                pathname === "dashboard" ? "bg-neutral-200" : "bg-neutral-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to={`/products`}
              className={`block   hover:text-black hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${
                pathname === "products" ? "bg-neutral-200" : "bg-neutral-100"
              }`}
            >
              My Products
            </Link>
            <Link
              to={`/favorites`}
              className={`block   hover:text-black hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${
                pathname === "favorites" ? "bg-neutral-200" : "bg-neutral-100"
              }`}
            >
              Favorites
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
