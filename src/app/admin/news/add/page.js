"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import AdminLayouts from "@/shared/layouts/AdminLayouts/AdminLayouts";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "@/store/categories/reducer";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import Image from "next/image";
import { MdArrowBackIosNew, MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import TextEditor from "@/shared/components/TextEditor/index";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { RiImageAddLine } from "react-icons/ri";

const Page = () => {
  const [input, setInput] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [isDragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { categories } = useSelector((state) => state);
  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (categories.value.lenght) {
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
  const handleBackNavigation = () => {
    router.push("/admin/news");
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      const findCategoriess = categories.value.find(
        (cateInfo) => cateInfo.label === value
      );
      setSubcategories(findCategoriess?.subCategories || []);
    }
    if (name === "img") {
      value = e.target.files[0];
    }

    setInput((state) => {
      if (name === "category") {
        delete state["subcategory"];
      }
      return {
        ...state,
        [name]: value
      };
    });
  };
  const addImage = () => {
    const file = input.img;
    console.log("File ===>>", file);
    if (!file) {
      return;
    }
    const imgObj = {
      src: file,
      imgKey: `src-${Number(Date.now() * Math.random()) * Math.random()}`
    };
    const imgField = document.getElementById("img-input-field");
    if (imgField) {
      imgField.value = "";
    }
    if (input.alt) {
      imgObj["alt"] = input.alt;
    }
    if (input.figcaption) {
      imgObj["figcaption"] = input.figcaption;
    }
    console.log("File 2===>>", file);

    setInput((state) => {
      if (!state.images) {
        state["images"] = [];
      }
      const images = [...state.images, imgObj];
      console.log("state.images ==>?>", state.images);
      return {
        ...state,
        images: images,
        src: "",
        alt: "",
        figcaption: ""
      };
    });
  };
  const removeImage = (index) => {
    if (!input?.images) {
      return;
    }
    const images = input.images.filter((file, i) => i !== index);
    setInput((state) => {
      return { ...state, images: images };
    });
  };
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX);
    setScrollLeft(containerRef.current.scrollLeft);

    containerRef.current.style.userSelect = "none";
  };
  const handleMouseUp = (e) => {
    setDragging(false);
    containerRef.current.style.userSelect = "auto";
  };
  const handleMouseLeave = (e) => {
    setDragging(false);

    containerRef.current.style.userSelect = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (x - startX) * 3; // Adjust the multiplier for faster/slower scrolling
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log("input ==>>", input)
    if (
      !input.title ||
      !input.htmlDescription ||
      !input.category ||
      !input.images
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(input));
    if (input.images) {
      input?.images?.forEach((file, index) => {
        formData.append(file.imgKey, file.src);
      });
    }
    fetch(`${BACKEND_URL}/admin/news`, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          handleBackNavigation();
        }
      })
      .catch((error) => {});
  };
  console.log("input ==>>", input)

  return (
    <AdminLayouts>
      <div className="add-news-page">
        <div className="title-container">
          <button onClick={handleBackNavigation}>
            <MdArrowBackIosNew /> <span>Back</span>
          </button>
          <h6>Add News</h6>
        </div>
        <div className="add-news">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={input.title || ""}
                placeholder="type here..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>HTML Description</label>
              {/* <textarea
                name="description"
                value={input.description || ""}
                placeholder="type here..."
                onChange={handleInputChange}
              /> */}
              <TextEditor value={input.htmlDescription || ""} handleChange={handleInputChange} name="htmlDescription" />
            </div>
            <div className="inline">
              <label>Category</label>
              <select
                value={input.category || ""}
                name="category"
                onChange={handleInputChange}
              >
                <option hidden>---Select---</option>

                {categories.value.map((routeInfo) => {
                  return <option key={routeInfo._id}>{routeInfo.label}</option>;
                })}
              </select>
            </div>
            {subcategories.length > 0 && (
              <div>
                <label>Subcategory</label>
                <select
                  value={input.subcategory || ""}
                  name="subcategory"
                  onChange={handleInputChange}
                >
                  <option hidden>---Select---</option>
                  {subcategories.map((routeInfo) => {
                    return (
                      <option key={routeInfo._id}>{routeInfo.label}</option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="inline">
              <label>Chose Image</label>
              <input
                type="file"
                accept="image/*"
                placeholder="chose"
                name="img"
                id="img-input-field"
                // value={input?.img?.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Image Caption</label>
              <input
                type="text"
                name="figcaption"
                value={input.figcaption || ""}
                placeholder="type here..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Image Alt</label>
              <input
                type="text"
                name="alt"
                value={input.alt || ""}
                placeholder="type here..."
                onChange={handleInputChange}
              />
            </div>
            <div className="add-img-btn-container ">
              <button type="button" onClick={addImage}>
                <RiImageAddLine />
              </button>
            </div>
            {input?.images?.length > 0 && (
              <div
                className="image-preview"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                {input?.images?.map((fileInfo, index) => {
                  return (
                    <div
                      className="cart"
                      key={index}
                      title={
                        `Caption:- ${fileInfo?.figcaption}` || "No Caption"
                      }
                    >
                      <Image
                        src={URL.createObjectURL(fileInfo.src || "")}
                        alt=""
                        height="100"
                        width="100"
                      />
                      <button onClick={() => removeImage(index)}>
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {/* <div>
                            <Image src={URL.createObjectURL(input.images || "")} alt="" height="100"  />
                        </div> */}

            <div className="action-btn-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayouts>
  );
};

export default Page;
