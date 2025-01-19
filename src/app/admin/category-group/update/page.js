'use client'

import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import AdminLayouts from "@/shared/layouts/AdminLayout/AdminLayouts";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "@/store/categories/reducer";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";

const Index = ({searchParams: {id}}) => { 
  const [input, setInput] = useState({});
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (input.category) {
      const findCategory = categories.value.find(
        (cateInfo) => cateInfo.label === input.category
      );
      if (input?.categories?.length) {
        const alreadyExit = input.categories.find(
          (cateInfo) => cateInfo.label === input.category
        );
        if (alreadyExit) {
          return;
        }
      }
      setInput((state) => {
        let categories = [];
        if (state.categories) {
          categories = [...state.categories];
        }
        categories = [
          ...categories,
          {
            label: findCategory.label,
            route: findCategory.route,
          },
        ];
        return {
          ...state,
          categories: categories,
        };
      });
      // setSubcategories(findCategory?.subCategories || []);
    }
  }, [input.category]);
  useEffect(() => {
    if (categories?.value?.length) {
      return;
    }
    fetch(`${BACKEND_URL}/public/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          dispatch(addCategories(data.data));
        }
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    fetch(`${BACKEND_URL}/admin/categories/group/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setInput(data.data); 
        }
      })
      .catch((error) => {});
  }, []);

  const handleBackNavigation = () => {
    router.push("/admin/category-group");
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.groupName || !input.categories || !input.categories?.length) {
      return;
    }

    fetch(`${BACKEND_URL}/admin/categories/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          handleBackNavigation();
        }
      })
      .catch((error) => {});
  };
  
  const handleCategoryRemove = (index) => {
    setInput((state) => {
      state.categories = state.categories.filter(
        (item, curIndex) => index !== curIndex
      );
      return {
        ...state,
      };
    });
  };
  return (
    <AdminLayouts>
      <div className="add-news-page">
        <div className="title-container">
          <button onClick={handleBackNavigation}>
            <MdArrowBackIosNew /> <span>Back</span>
          </button>
          <h6>{id ? "Update Category Group" : "Add Category Group"}</h6>
        </div>
        <div className="add-news">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label>GROUP NAME</label>
              <input
                type="text"
                name="groupName"
                value={input.groupName || ""}
                placeholder="type here..."
                onChange={handleInputChange}
              />
            </div>

            <div className="inline">
              <label>Categories</label>
              <select name="category" onChange={handleInputChange}>
                <option hidden>---Select---</option>

                {categories.value.map((routeInfo) => {
                  return <option key={routeInfo._id}>{routeInfo.label}</option>;
                })}
              </select>
            </div>
            {input.categories?.length > 0 && (
              <div className="category-list">
                {input.categories.map((item, index) => {
                  return (
                    <div key={index}>
                      <span>{item.label}</span>{" "}
                      <button onClick={() => handleCategoryRemove(index)}>
                        {" "}
                        x{" "}
                      </button>{" "}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="action-btn-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayouts>
  );
};

export default Index;
