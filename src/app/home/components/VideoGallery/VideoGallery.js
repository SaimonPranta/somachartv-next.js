import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
// import palyIcons from "../../../../assets/images/home/red-play-icon.png";
import palyIcons from "../../../../assets/images/home/video-play-icon-11397.png";
import { YOUTUBE_CHANNEL_URL } from "@/shared/constants/ulrList";

const getVideos = async () => {
  try {
    let response = await (
      await fetch(
        YOUTUBE_CHANNEL_URL,
        { cache: "no-store" }
      )
    ).json();

    if (response.items) {
      return response.items;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const VideoGallery = async () => {
  const vidList = await getVideos();

  return (
    <div className="  video-gallery-section section-gap">
      <div className="inner-gallery container">
        <div className="title-section">
          <h2>ভিডিও গ্যালারী</h2>
        </div>
        <div className="video-section">
          {vidList.map((news, index) => {
            return (
              <Link
                className="news-cart"
                href={`/video/${news?.snippet?.resourceId?.videoId}`}
                key={index}
              >
                <Image
                  src={
                    news?.snippet?.thumbnails?.maxres?.url ||
                    news?.snippet?.thumbnails?.standard?.url ||
                    news?.snippet?.thumbnails?.medium?.url
                  }
                  alt=""
                  height={100}
                  width={100}
                />
                <h3>{news?.snippet?.title}</h3>
                <Image
                  className="paly-icon"
                  src={palyIcons}
                  alt=""
                  height={100}
                  width={100}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
