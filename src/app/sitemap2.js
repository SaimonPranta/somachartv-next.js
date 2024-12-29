import { BACKEND_URL } from "@/shared/constants/ulrList";


export const revalidate = 10

export default async function sitemap() {
  const siteUrl = "https://somacharnews.com";
  const newsJson = await fetch(`${BACKEND_URL}/public/news/sitemap`, {
    cache: "no-store"
  });
  const newsResponse = await newsJson.json();
  const newsData = await newsResponse.data;

  const sitemapUrl = newsData.map((urlInfo, index) => {
    return {
      url: `${siteUrl}/news/${urlInfo._id}`,
      lastModified: new Date(urlInfo.updatedAt).toISOString(),
      changeFrequency: "daily",
      priority: 0.9
    };
  });

  return sitemapUrl;
}
