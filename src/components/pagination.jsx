import { Link } from "@inertiajs/react";
import React from "react";

export const Pagination = ({ pagination }) => {
  return (
    <div>
      {pagination?.links.map((link, index) => (
        <Link
          key={index}
          preserveScroll
          href={link.url || ""}
          className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg text-gray-600 ${
            link.active ? "bg-gray-200" : ""
          }
              ${!link.url ? "!text-gray-300" : ""}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
};
