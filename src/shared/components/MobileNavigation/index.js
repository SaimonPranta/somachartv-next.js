import React from "react";
import "./styles.scss";
import Link from "next/link";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import { IoMdArrowDropdown } from "react-icons/io";

const getCategories = async () => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/public/categories`, { cache: "no-store" })
    ).json();

    if (response.data?.length) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};
const Index = async () => {
  const categories = await getCategories();

  return (
    <div className="mobile-navigation" id="navigation">
      <div className="navigation-inner-container container ">
        <nav className="nav-container rm-scroll-bar">
          <ul>
            {[...categories].map((navItem, index) => {
              return (
                <li key={index}>
                  <Link href={`/topic/${navItem.route}`}>{navItem.label}</Link>
                  {navItem?.subCategories?.length > 0 && (
                    <>
                      <button>
                        {" "}
                        <IoMdArrowDropdown />{" "}
                      </button>

                      <ul>
                        {navItem?.subCategories.map(
                          (childNavItem, childIndex) => {
                            return (
                              <li key={childIndex}>
                                <Link
                                  href={`/topic/${navItem.route}/${childNavItem.route}`}
                                >
                                  {childNavItem.label}{" "}
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Index;
