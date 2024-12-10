import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import textSlicer from "@/shared/functions/textSlicer";
import getImageUrl from "@/shared/functions/getImageUrl";
import MoreNews from '@/app/home/components/MoreNews'


const getInternalNews = async () => {
  try {
    const response = await (
      await fetch(
        `${BACKEND_URL}/public/news?limit=${5}&category=আন্তর্জাতিক`,
        { cache: "no-store" }
      )
    ).json();

    if (response.data?.length) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};
const getAds = async () => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/admin/ads?page=1`, { cache: "no-store" })
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
  const internationalNews = await getInternalNews();
  const adsList = await getAds();

  return (
    <div className="container section-gap lifestyle-culture-and-technology-container">
      <div className="inner-wrapper home-section">
        <div className="lifestyle-culture-section">
          <div className="common-title">
            <h2>জীবনধারা ও সংস্কৃতি</h2>
            <MoreNews route="/" />
          </div>
          <div className="news-grid">
            {internationalNews.map((newsInfo, index) => {
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

            <MoreNews route="/" />

          </div>
          <div className="news-grid">
            {internationalNews.slice(0, 2).map((newsInfo, index) => {
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
