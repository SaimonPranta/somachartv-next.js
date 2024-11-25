import React from 'react';
import Header from "@/shared/components/header/header"
import HeroSection from "./components/heroSection/heroSection"
import AdsList from './components/AdsList/AdsList';
import ForYouAndSports from './components/ForYou&Sports';
import VideoGallery from './components/VideoGallery/VideoGallery';
import SportsAndInternational from './components/National&International';
import LifestyleCultureAndTechnology from './components/LifestyleCulture&Technology';
import Footer from '@/shared/components/Footer/Footer';

const Index = () => {
    
    return (
        <>
            <Header/>
            <HeroSection/>
            {/* <AdsList/> */}
            <ForYouAndSports />
            <SportsAndInternational />
            <LifestyleCultureAndTechnology />
            <VideoGallery />
            <Footer />
        </>
    );
};

export default Index;