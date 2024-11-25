import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import textSlicer from "@/shared/functions/textSlicer";
import getImageUrl from "@/shared/functions/getImageUrl";

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
const International = async () => {
  const internationalNews = await getInternalNews();
  const adsList = await getAds();

  return (
    <div className="container section-gap for-you-and-sports-container">
      <div className="inner-wrapper">
        <div className="for-you-news-section">
          <div className="common-title">
            <h2>আপনার জন্য</h2>
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
                    <time>২৪ নভেম্বর ২০২৪</time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sports-news-section">
          <div className="common-title">
            <h2>খেলা</h2>
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
      </div>
    </div>
  );
};

export default International;
