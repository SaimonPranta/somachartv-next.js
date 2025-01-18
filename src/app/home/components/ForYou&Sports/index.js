import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import textSlicer from "@/shared/functions/textSlicer";
import getImageUrl from "@/shared/functions/getImageUrl";
import MoreNews from '@/app/home/components/MoreNews'
import getBanglaDateMonthYear from  '@/shared/functions/getBanglaDateMonthYear'
import getCategoryNewsList from "@/shared/functions/getCategoryNewsList";

const getTodayHotNew = async () => {
  try {
    const response = await (
      await fetch(
       `${BACKEND_URL}/public/news/today-hot-news?sort=hot&page=1`,
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
    const response =  await getCategoryNewsList({
      categoryGroup: "খেলা", 
      limit: 5
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
  const todayHotNew = await getTodayHotNew();
  const internationalNews = await getInternalNews();

  return (
    <div className="container section-gap for-you-and-sports-container">
      <div className="inner-wrapper home-section">
        <div className="for-you-news-section">
          <div className="common-title">
            <h2>আপনার জন্য</h2>
            <MoreNews route="/" />
          </div>
          <div className="news-grid">
            {todayHotNew.slice(0, 5).map((newsInfo, index) => {
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
                    <time>{getBanglaDateMonthYear(newsInfo.createdAt)}</time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sports-news-section">
          <div className="common-title">
            <h2>খেলা</h2>
            <MoreNews route="/topic/latest?categoryGroup=খেলা" />
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

export default Index;
