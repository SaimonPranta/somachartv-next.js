import React from 'react';
import "./style.scss";
import Image from 'next/image';
import Link from 'next/link';
import getImageUrl from '@/shared/functions/getImageUrl';
import { BACKEND_URL } from '@/shared/constants/ulrList';
import textSlicer from '@/shared/functions/textSlicer';
import getNewsList from "@/shared/functions/getNewsList";


// Fetch today's news articles
const getNews = async () => {
    try {
        const response = await getNewsList({
            limit:12
          })

        return response.data.length ? response.data : [];
    } catch (error) {
        return [];
    }
};

const TodaysNews = async () => {
    const newsList = await getNews();

    return (
        <div className='today-news'>
            <div className='title-container'>
                <h3>আজকের সর্বশেষ</h3>
            </div>
            <div className='news-list'>
                {newsList.map((news, index) => (
                    <Link href={`/news/${news._id}`} key={index} className='news-cart' title={news.title}>
                        <Image
                            src={getImageUrl(news.images)}
                            alt={`${textSlicer(news.title, 30)} image`}
                            height={100}
                            width={100}
                            loading="lazy"
                        />
                        <h2>{textSlicer(news.title, 60)}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TodaysNews;
