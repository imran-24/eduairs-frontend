import React from "react";

const Avatar = ({ name, lg }) => {
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <div className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
      <div className={`${lg ? "w-10 h-10 text-lg" : "w-8 h-8" } flex font-mono  items-center justify-center rounded-full bg-indigo-500 text-white font-medium `}>
        {getInitial(name)}
      </div>
      {/* <p className="text-gray-800 font-medium">{name}</p> */}
    </div>
  );
};

export default Avatar;
