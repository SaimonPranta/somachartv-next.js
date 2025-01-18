import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import textSlicer from "@/shared/functions/textSlicer";
import getImageUrl from "@/shared/functions/getImageUrl";
import MoreNews from "@/app/home/components/MoreNews";
import getCategoryNewsList from "@/shared/functions/getCategoryNewsList";

const getLifeStyleAndCultureNews = async () => {
  try {
    const response = await getCategoryNewsList({
      categoryGroup: "জীবনধারা ও সংস্কৃতি",
      limit: 8
    });

    if (response.data?.length) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};
const getTechnologyNews = async () => {
  try {
    const response = await getCategoryNewsList({
      categoryGroup: "প্রযুক্তি",
      limit: 2
    });
    if (response.data?.length) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const Index = async () => {
  const lifeStyleAndCultureNews = await getLifeStyleAndCultureNews();
  const technologyNews = await getTechnologyNews();

  return (
    <div className="container section-gap lifestyle-culture-and-technology-container">
      <div className="inner-wrapper home-section">
        <div className="lifestyle-culture-section">
          <div className="common-title">
            <h2>জীবনধারা ও সংস্কৃতি</h2>
            <MoreNews route="/topic/latest?categoryGroup=জীবনধারা ও সংস্কৃতি" />

          </div>
          <div className="news-grid">
            {lifeStyleAndCultureNews.map((newsInfo, index) => {
              return (
                <Link
                  key={index}
                  href={`/news/${newsInfo._id}`}
                  className="news-cart"
                >
                  <div className="img-container">
                    <Image
                      src={getImageUrl(newsInfo.images)}
                      height={100}
                      width={100}
                      alt=""
                    />
                  </div>
                  <div className="des-container">
                    {" "}
                    <h3>{newsInfo.title}</h3>
                    <p>{newsInfo.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="technology-section">
          <div className="common-title">
            <h2>প্রযুক্তি</h2>
            <MoreNews route="/topic/latest?categoryGroup=প্রযুক্তি" />

          </div>
          <div className="news-grid">
            {technologyNews.slice(0, 2).map((newsInfo, index) => {
              return (
                <Link
                  key={index}
                  href={`/news/${newsInfo._id}`}
                  className="news-cart"
                >
                  <div className="img-container">
                    <Image
                      src={getImageUrl(newsInfo.images)}
                      height={100}
                      width={100}
                      alt=""
                    />
                  </div>
                  <div className="des-container">
                    {" "}
                    <h3>{newsInfo.title}</h3>
                    <p>{newsInfo.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
