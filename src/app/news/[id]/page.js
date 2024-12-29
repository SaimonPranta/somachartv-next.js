import "./style.scss";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from "@/shared/components/header/header";
import Image from "next/image";
import getImageUrl from "@/shared/functions/getImageUrl";
import convertedToBanglaDate from "@/shared/functions/convertedToBanglaDate";
import { WiTime8 } from "react-icons/wi";
import textSlicer from "@/shared/functions/textSlicer";
import TodaysNews from "@/shared/components/TodaysNews/TodaysNews";
import Footer from "@/shared/components/Footer/Footer";
import Share from "@/app/news/[id]/Modal/Share/Share";
import getKeywords from "@/shared/functions/getKeywords";
import {
  newsDetailsDescription,
  newsDetailsTitle,
} from "@/shared/constants/defaultSeoVariables";
import { getSeoTimeFormat } from "@/shared/functions/convertTime";
import { IoCameraReverseOutline } from "react-icons/io5";
import processDangerouslySetInnerHTML from "@/shared/functions/processDangerouslySetInnerHTML";
import Head from "next/head";

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

const getNews = async (id) => {
  try {
    let response = await (
      await fetch(`${BACKEND_URL}/public/news/${id}`, {
        cache: "no-store",
      })
    ).json();
    if (response.data._id) {
      return response.data;
    }
    return {};
  } catch (error) {
    return {};
  }
};

const getNewsList = async () => {
  try {
    let response = await (
      await fetch(`${BACKEND_URL}/public/news`, { cache: "no-store" })
    ).json();

    if (response.data.length) {
      return response.data;
    }
    return {};
  } catch (error) {
    return {};
  }
};

export const generateMetadata = async ({ params }) => {
  const newsDetails = await getNews(params.id);
  if (!newsDetails._id) {
    return;
  }
  const fakeImg =
    "https://somacharnews.com/api/media/%E0%A6%93%E0%A6%9F%E0%A6%9F%E0%A6%B0%20%E0%A6%86%E0%A6%B2%E0%A7%8B%E0%A6%9A%E0%A6%A4%20%E0%A6%B8%E0%A6%B0%E0%A6%9C.jpeg";
  const pageUrl = `${process.env.SITE_URL}/news/${params.id}`;
  const keywords = getKeywords(newsDetails);
  const openGraphImages = await newsDetails?.images?.map((imgInfo) => {
    const currentImage = getImageUrl(imgInfo.src);
    return { url: fakeImg };
  });
  // const openGraphImages = await newsDetails?.images?.map((imgInfo) => {
  //   const currentImage = getImageUrl(imgInfo.src);
  //   return { url: currentImage };
  // });
  const jsonImages = await newsDetails?.images?.map((imgInfo) => {
    // const currentImage = getImageUrl(imgInfo.src);
    return fakeImg;
  });
  // const jsonImages = await newsDetails?.images?.map((imgInfo) => {
  //   const currentImage = getImageUrl(imgInfo.src);
  //   return currentImage;
  // });
  const currentImage = fakeImg;
  // const currentImage = getImageUrl(newsDetails?.images);
  console.log("jsonImages ============>>>", jsonImages);
  return {
    title: newsDetails?.title || newsDetailsTitle,
    description: newsDetails?.description || newsDetailsDescription,
    keywords: keywords,
    openGraph: {
      type: "article",
      title: newsDetails?.title || newsDetailsTitle,
      description: newsDetails?.description || newsDetailsDescription,
      images: fakeImg,
      // images: openGraphImages || [],
      url: `${process.env.SITE_URL}/news/${params.id}`,
      "article:section": newsDetails.category || "News",
      "article:tag": newsDetails.tags?.join(", ") || keywords,
    },
    twitter: {
      card: "summary_large_image",
      site: "@SomacharNews",
      title: newsDetails?.title,
      description: newsDetails?.description,
      images: currentImage ? currentImage : undefined, // Use the first image for Twitter
    },
    schema: {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      headline: newsDetails?.title || newsDetailsTitle,
      description: newsDetails?.description || newsDetailsDescription,
      image: fakeImg,
      // image: jsonImages,
      datePublished: newsDetails?.createdAt,
      dateModified: newsDetails?.updatedAt || newsDetails?.createdAt,
      mainEntityOfPage: pageUrl,
      author: {
        "@type": "Organization",
        name: "Somachar News",
      },
      publisher: {
        "@type": "Organization",
        name: "Somachar News",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.SITE_URL}/logo.png`,
        },
      },
      articleSection: newsDetails.category || "News",
      keywords,
    },
  };
};
const Index = async ({ params: { id } }) => {
  const newsDetails = await getNews(id);
  if (!newsDetails._id) {
    return <></>;
  }
  const newsList = await getNewsList();
  const adsList = await getAds();
  const thumbnailInfo = newsDetails.images[0];
  const fakeImg =
  "https://somacharnews.com/api/media/%E0%A6%93%E0%A6%9F%E0%A6%9F%E0%A6%B0%20%E0%A6%86%E0%A6%B2%E0%A7%8B%E0%A6%9A%E0%A6%A4%20%E0%A6%B8%E0%A6%B0%E0%A6%9C.jpeg";
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={fakeImg}
        />
      </Head>

      <Header />
      <main className="container news-details-page">
        <div className="news-details-top-section">
          <article className="news-details ">
            <nav className="breadcrumbs categories-container ">
              <Link href="/" aria-label="Home">
                <FaHome />
              </Link>
              <MdKeyboardArrowRight />
              {newsDetails?.category?.label && (
                <>
                  <Link href={`/topic/${newsDetails?.category?.route}`}>
                    <span>{newsDetails?.category?.label}</span>
                  </Link>
                  {newsDetails?.subcategory?.label && (
                    <>
                      <MdKeyboardArrowRight />
                      <Link
                        href={`/topic/${newsDetails.categoriesRoute}?subCategory=${newsDetails?.subcategory?.route}`}
                      >
                        <span>{newsDetails?.subcategory?.label}</span>
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>

            <header className="title-container ">
              <div className="title-section">
                <h1>{newsDetails.title}</h1>
                <Share />
              </div>
              <figure
                className={`img-section ${
                  !thumbnailInfo.figcaption ? "hidden-figcaption" : ""
                }`}
              >
                <Image
                  src={getImageUrl(thumbnailInfo.src)}
                  height="600"
                  width="800"
                  alt={
                    thumbnailInfo.alt ||
                    `${newsDetails.title} - ${newsDetails?.category?.label}`
                  }
                  className="thumbnail"
                  priority
                />
                <figcaption>
                  <span aria-hidden="true">
                    <IoCameraReverseOutline />
                  </span>
                  {thumbnailInfo.figcaption || newsDetails.title}
                </figcaption>
              </figure>
            </header>

            <section className="news-content ">
              <div
                className="html-view-page"
                dangerouslySetInnerHTML={{
                  __html: processDangerouslySetInnerHTML(
                    newsDetails.updateHtmlDescription
                  ),
                }}
              />
              {newsDetails.createdAt && (
                <div className="publication-info">
                  <WiTime8 />
                  <p>
                    <strong> প্রকাশিত:</strong>{" "}
                    <time dateTime={getSeoTimeFormat(newsDetails.createdAt)}>
                      {" "}
                      {convertedToBanglaDate(newsDetails.createdAt)}
                    </time>{" "}
                    | By Symul Kabir Pranta
                  </p>
                </div>
              )}
            </section>
          </article>

          {/* <aside className="related-news-container ">
            <div className="ads-section">
              {adsList.slice(0, 2).map((ad, index) => (
                <Link href={ad.targetLink} key={index}>
                  <Image
                    src={getImageUrl(ad.img)}
                    height="250"
                    width="300"
                    alt={`Advertisement ${index + 1}`}
                    className="ad-image"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>

            <div className="news-section ">
              <h2 className="common-section-title">এ সম্পর্কিত খবর</h2>
              <div className="related-news-list">
                {newsList.slice(0, 5).map((news, index) => (
                  <Link
                    href={`/news/${news._id}`}
                    key={index}
                    className="related-news-item"
                  >
                    <Image
                      src={getImageUrl(news.images)}
                      height="100"
                      width="100"
                      alt={`${news.title} - Related News`}
                      priority={index === 0}
                    />
                    <h3>{news.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </aside> */}
        </div>

        <TodaysNews />
      </main>
      <Footer />
    </>
  );
};

export default Index;
