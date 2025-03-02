import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='space-y-4'>
        <h2 className='text-xl tracking-wider '>Welcome to the app </h2>
        <div className='flex items-center space-x-2'>
          <Link
            to='/login'
            className='text-black  text-center p-[5px] w-24 h-9 border rounded-lg text-sm hover:bg-neutral-200 hover:text-black transition-colors'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='text-neutral-100 text-center p-[5px] w-24 h-9 border rounded-lg text-sm hover:bg-black/80 hover:text-white bg-black  transition-colors'
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
