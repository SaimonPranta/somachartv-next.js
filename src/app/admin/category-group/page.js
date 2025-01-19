"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import AdminLayouts from "@/shared/layouts/AdminLayout/AdminLayouts";
import Image from "next/image";
import { IoDuplicate } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [select, setSelect] = useState({
    categoriesID: "",
    activeCategories: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetch(`${BACKEND_URL}/admin/categories/group`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCategories(data.data);
        }
      })
      .catch((error) => {});
  }, []);

  const handleAddCategoriesToggle = () => {
    const element = document.getElementById("add-categories-modal");

    if (element) {
      element.classList.toggle("active-modal");
    }
  };

  const handleDeleteCategories = (id) => {
    fetch(`${BACKEND_URL}/admin/categories/group`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // authorization: `Bearer ${getCookie()}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCategories(data.data);
        }
      })
      .catch((error) => {});
  };

  return (
    <AdminLayouts>
      <div className="categories-container">
        <div className="categories-warper">
          <ul>
            {categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <li key={item._id}>
                    <button>
                      <div
                        className="element-container"
                        onClick={() => {
                          router.push(
                            `/admin/category-group/update?id=${item._id}`
                          );

                          setSelect({ activeCategories: item._id });
                        }}
                      >
                        {/* <Image src={`${process.env.REACT_APP_SERVER_HOST_URL}/${item.images}`} height={100} width={100} alt='' /> */}
                        {item.groupName}
                      </div>
                      <div className="action-container">
                        <span className="add" onClick={() => {}}>
                          <CiEdit />
                        </span>
                        <span
                          className="delete"
                          onClick={() => handleDeleteCategories(item._id)}
                        >
                          <RiDeleteBin5Line />
                        </span>
                      </div>
                    </button>
                    {select.activeCategories === item._id &&
                      item.categories.length > 0 && (
                        <ul>
                          {item.categories.map((subCate, subIndex) => {
                            return <li key={subCate._id}>{subCate.label}</li>;
                          })}
                        </ul>
                      )}
                  </li>
                );
              })}
            <li>
              <button
                className="add-btn"
                onClick={() => {
                  router.push("/admin/category-group/update");
                }}
              >
                <IoDuplicate /> New Group
              </button>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayouts>
  );
};

export default Index;
