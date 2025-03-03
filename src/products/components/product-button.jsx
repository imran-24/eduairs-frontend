import React from "react";
import { Link } from "react-router-dom";

export const ProductButton = ({url, title}) => {
  return (
    <Link
      className='border text-black rounded-lg p-2 bg-neutral-200 hover:bg-neutral-300   transition-colors ease-in-out text-sm font-semibold'
      to={url}
    >
      {title}
    </Link>
  );
};
