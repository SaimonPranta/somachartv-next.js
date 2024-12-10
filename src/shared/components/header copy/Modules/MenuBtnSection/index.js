"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { BsMenuButtonWide } from "react-icons/bs";

const Index = () => {
  const setSearchEnable = () => {
    const searchBtn = document.getElementById("search-btn");
    const nav = document.getElementById("navigation");

    const searchBoxContainer = document.getElementById("search-box-container");
    if(searchBtn){
      searchBtn.classList.toggle("disable");

    }
    if(searchBoxContainer){
      searchBoxContainer.classList.toggle("active");

    }
    if (nav) {
      nav.classList.remove("active");
    }
  };
  const toggleNavigation = () => {
    const nav = document.getElementById("navigation");
    const navBtn = document.getElementById("navigation-btn");
    const searchBoxContainer = document.getElementById("search-box-container");

    if (nav) {
      nav.classList.toggle("active");
    }
    if (navBtn) {
      navBtn.classList.toggle("active");
    } 
    if (searchBoxContainer) {
      searchBoxContainer.classList.remove("active");
    }
  };

  return (
    <>
      <div className="menu-container">
        <button onClick={setSearchEnable} id="search-btn">
          {" "}
          <IoSearch />
        </button>
        <button onClick={toggleNavigation} id="navigation-btn">
          {" "}
          <BsMenuButtonWide />
        </button>
      </div>
    </>
  );
};

export default Index;
