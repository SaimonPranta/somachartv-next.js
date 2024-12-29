import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import textSlicer from "@/shared/functions/textSlicer";
import getImageUrl from "@/shared/functions/getImageUrl";
import MoreNews from '@/app/home/components/MoreNews'

const getNationalNews = async () => {
  try {
    const response = await (
      await fetch(
        `${BACKEND_URL}/public/news?limit=${6}&categoryGroup=জাতীয়`,
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
const getInternalNews = async () => {
  try {
    const response = await (
      await fetch(
        `${BACKEND_URL}/public/news?limit=${2}&categoryGroup=আন্তর্জাতিক`,
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
  const nationalNews = await getNationalNews();
  const internationalNews = await getInternalNews();
  const adsList = await getAds();

  return (
    <div className="container section-gap national-and-international-container">
      <div className="inner-wrapper home-section">
        <div className="national-news-section">
          <div className="common-title">
            <h2>জাতীয়</h2>
            <MoreNews route="/" />

          </div>
          <div className="news-grid-container">
            <div className="news-grid-one">
              {nationalNews.slice(0, 2).map((newsInfo, index) => {
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
            <div className="news-grid-two">
              {[
                ...nationalNews
              ]
                .slice(2, 6)
                .map((newsInfo, index) => {
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
        </div>
        <div className="international-news-section">
          <div className="common-title">
            <h2>আন্তর্জাতিক</h2>
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
