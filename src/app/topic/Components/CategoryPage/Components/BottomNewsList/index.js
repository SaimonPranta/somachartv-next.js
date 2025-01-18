"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import getImageUrl from "@/shared/functions/getImageUrl";
import textSlicer from "@/shared/functions/textSlicer";
import "./styles.scss";
import sliceTextByDelimiter from "@/shared/functions/sliceTextByDelimiter";
import { MdReadMore } from "react-icons/md";
import LoadingGip from "../../../../../../assets/images/global/Loading.gif";
import timeAgoInBengali from "@/shared/functions/timeAgoInBengali";
import getCategoryNewsList from "@/shared/functions/getCategoryNewsList";

const Index = ({ categoryLabel, subCategoryLabel, categoryGroup }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      let query = {
        categoryLabel,
        subCategoryLabel
      };
      if (categoryGroup) {
        query = {
          categoryGroup
        };
      }
      const newsList = await getCategoryNewsList({
        ...query,
        page,
        limit: 9
      });
      if (newsList.data) {
        setNews(newsList.data);
      }
      setLoading(false);
    };
    loadNews();
  }, []);

  const loadMoreNews = async (currentPage) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage((state) => {
      return state + 1;
    });
    let query = {
      categoryLabel,
      subCategoryLabel
    };
    if (categoryGroup) {
      query = {
        categoryGroup
      };
    }
    const { data } = await getCategoryNewsList({
      ...query,
      page: currentPage,
      limit: 9
    });
    setNews((state) => {
      return [...state, ...data];
    });
    setLoading(false);
  };
  return (
    <div className="bottom-news-section">
      <div className="news-grid">
        {news.map((newsInfo, index) => {
          if (newsInfo.title.length < 5) {
            return <></>;
          }
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
                <time>{timeAgoInBengali(newsInfo.createdAt)}</time>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="more-section">
        <button
          onClick={() => {
            loadMoreNews(page + 1);
          }}
          disabled={loading}
        >
          <span>আরও</span>
          {!loading && <MdReadMore />}
          {loading && (
            <Image height="100" width="100" alt="" src={LoadingGip} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Index;
