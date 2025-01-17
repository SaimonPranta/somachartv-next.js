"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import getImageUrl from "@/shared/functions/getImageUrl";
import textSlicer from "@/shared/functions/textSlicer";
import "./styles.scss";
import sliceTextByDelimiter from "@/shared/functions/sliceTextByDelimiter";

const Index = ({ categoryLabel, subCategoryLabel }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews();
  }, []);

  const getNews = async (categoryLabel, subCategoryLabel) => {
    try {
      const response = await (
        await fetch(
          `${BACKEND_URL}/public/news?limit=${6}&category=${categoryLabel}&subcategory=${subCategoryLabel}`,
          { cache: "no-store" }
        )
      ).json();
      if (response.data?.length) {
        setNews(response.data);
      }
    } catch (error) {}
  };
  return (
    <div className="bottom-news-section">
      <div className="news-grid">
        {news.map((newsInfo, index) => {
          return (
            <Link
              href={`/news/${newsInfo._id}`}
              key={index}
              className="news-cart"
            >
              <div className="img-container">
                <Image
                  src={getImageUrl(newsInfo.images)}
                  alt=""
                  height={100}
                  width={100}
                />
              </div>
              <div className="des-container">
                <h1>{textSlicer(newsInfo.title, 70)}</h1>
                <p>{sliceTextByDelimiter(newsInfo.description, 180, true)}</p>
                <time >২৫ মিনিট আগে</time>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
