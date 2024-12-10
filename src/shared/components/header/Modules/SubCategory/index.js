"use client";
import Link from "next/link";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Index = ({ subCategories, routeInfo, pageRoute }) => {
  return (
    <>
      <button>
        {" "}
        <IoMdArrowDropdown />{" "}
      </button>
      <ul className="sub-category-nav rm-scroll-bar">
        {subCategories.map((subRouteInfo, subIndex) => {
          const itemRoute = `/topic/${routeInfo.route}/${subRouteInfo.route}`;
          return (
            <li
              key={subRouteInfo._id}
              className={itemRoute === pageRoute ? "active" : ""}
            >
              <Link href={itemRoute}>{subRouteInfo.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Index;
