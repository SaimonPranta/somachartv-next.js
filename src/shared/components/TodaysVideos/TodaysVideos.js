import React from 'react';
import "./style.scss"
import Image from 'next/image';
import {  YOUTUBE_CHANNEL_URL } from '@/shared/constants/ulrList';

import textSlicer from '@/shared/functions/textSlicer';



const getVideos = async () => {
    try {
        let response = await (await fetch(YOUTUBE_CHANNEL_URL, { 'cache': 'no-store'})).json()

        if (response.items) {
            return response.items
        }
        return []

    } catch (error) {
        return []
    }

}
const TodaysVideos = async () => {
    const newsList = await getVideos() 
    return (
        <div className='today-news'>
            <div className='title-container'>
                <h3>সর্বশেষ ভিডিও</h3>
            </div>
            <div className='news-list'>
                {
                    newsList.map((news, index) => {
                        return <div key={index} className='news-cart'>
                            <Image src={news?.snippet?.thumbnails?.default?.url} alt='' height={100} width={100} />
                            <h2>{textSlicer(news?.snippet?.title, 60)}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default TodaysVideos;