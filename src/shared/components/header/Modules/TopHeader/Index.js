"use client";
import { useState } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import getBengaliDate from "@/shared/functions/getBanglaDate";

const Index = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const toggleNavigation = () => {
    const nav = document.getElementById("navigation");
    const navBtn = document.getElementById("navigation-btn");
    if (nav) {
      nav.classList.toggle("active");
      navBtn.classList.toggle("active");
    }
  };
  const handleVideoNavigation = () => {
    router.push("/video");
  };

  // const handleEmployNavigation = () => {
  //   router.push(`/employ`);
  // };
  const setSearchEnable = () => {
    const searchBtn = document.getElementById("search-btn");
    const searchBoxContainer = document.getElementById("search-box-container");
    searchBtn.classList.toggle("disable");
    searchBoxContainer.classList.toggle("active");
  };

  return (
    <>
      <div className="top-section">
        <div className="top-inner-container container">
          <div className="left">
            <p>{`${getBengaliDate()}`}</p>
          </div>
          <div className="middle">
            <Link href="/">
              <h1>𝚂𝚘𝚖𝚊𝚌𝚑𝚊𝚛 𝙽𝚎𝚠𝚜</h1>
            </Link>
          </div>
          <div className="right">
            {/* <div>
              <a href="/" />
              <a href="/" />
              <a href="/" />
              <a href="/" />
            </div> */}
            <div className="language-btn">
              <button>ইংরেজি</button>
              <button onClick={handleVideoNavigation}>ভিডিও</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
