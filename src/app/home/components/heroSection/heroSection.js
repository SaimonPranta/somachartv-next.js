import Link from "next/link";
import React from "react";
import "./style.scss";
import Image from "next/image";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import getImageUrl from "@/shared/functions/getImageUrl";
import NewsList from "../NewsList/NewsList";
import textSlicer from "@/shared/functions/textSlicer";
import timeAgoInBengali from "@/shared/functions/timeAgoInBengali";

const getHeroNews = async () => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/public/news?limit={10}`, {
        cache: "no-store",
      })
    ).json();
    if (response.data?.length) {
      return response.data;
    }

    return [];
  } catch (error) {
    return [];
  }
};
const getJobsNews = async () => {
  try {
    const response = await (
      await fetch(
        `${BACKEND_URL}/public/news?limit=${1}&categoryGroup=চাকরি বাজার`,
        {
          cache: "no-store",
        }
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
const getSlidingNews = async () => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/public/news/sort?sort=সর্বশেষ&page=1`, {
        cache: "no-store",
      })
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
  const news = await getHeroNews();
  const jobsNews = await getJobsNews();
  const slidingNews = await getSlidingNews();

  return (
    <main className="container hero-section">
      <div className="top-section">
        <div className="left">
          <h2>
            সর্বশেষ <span>:</span>
          </h2>
        </div>
        <marquee>
          <ul>
            {slidingNews.map((newInfo, index) => {
              return (
                <li key={index}>
                  <Link href={`/news/${newInfo._id}`}>{newInfo.title}</Link>
                </li>
              );
            })}
          </ul>
        </marquee>
      </div>
      <div className="bottom-section home-section">
        <div className="hero-news">
          <div className="single-news">
            {news.length > 0 &&
              news.splice(0, 1).map((newsInfo, index) => {
                return (
                  <Link
                    href={`/news/${newsInfo._id}`}
                    key={index * Math.random() * Math.random()}
                    className="common-hero-news-cart"
                  >
                    <Image
                      src={getImageUrl(newsInfo.images)}
                      height={100}
                      width={100}
                      alt=""
                    />
                    <div className="cart-footer">
                      <span className="category">
                        {newsInfo?.category?.label}
                      </span>
                      <h3>{newsInfo.title}</h3>
                      {/* <h3>{textSlicer(newsInfo.title, 68)}</h3> */}
                      <span className="date">{timeAgoInBengali(newsInfo.createdAt)}</span>
                    </div>
                    {/* <p>{textSlicer(newsInfo?.description, 170)}</p> */}
                  </Link>
                );
              })}
          </div>
          <div className="news-grid">
            {news.length > 0 &&
              news.splice(0, 3).map((newsInfo, index) => {
                return (
                  <Link
                    href={`/news/${newsInfo._id}`}
                    key={index * Math.random() * Math.random()}
                    className="common-hero-news-cart cart"
                  >
                    <Image
                      src={getImageUrl(newsInfo.images)}
                      height={100}
                      width={100}
                      alt=""
                    />
                    <div className="cart-footer">
                      <span className="category">
                        {newsInfo?.category?.label}
                      </span>
                      <h3>{newsInfo.title}</h3>
                      {/* <h3>{textSlicer(newsInfo.title, 68)}</h3> */}
                    </div>
                    {/* <p>{textSlicer(newsInfo?.description, 170)}</p> */}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="jobs-news">
          <div className="job-news">
            <h3>চাকরি বাজার</h3>

            {jobsNews.splice(0, 1).map((newsInfo, index) => {
              return (
                <Link
                  href={`/news/${newsInfo._id}`}
                  key={index * Math.random() * Math.random()}
                  className="news-cart"
                >
                  <Image
                    height={100}
                    width={100}
                    src={getImageUrl(newsInfo.images)}
                    alt=""
                  />
                  <h2>{textSlicer(newsInfo.title, 35)}</h2>
                </Link>
              );
            })}
          </div>
          <div className="all-news">
            <NewsList />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Index;
