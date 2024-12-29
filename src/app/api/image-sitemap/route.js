import { BACKEND_URL } from "@/shared/constants/ulrList";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const siteUrl = "https://somacharnews.com";

    // Fetch the list of news articles
    const newsJson = await fetch(`${BACKEND_URL}/public/news/sitemap`, {
      cache: "no-store",
    });
    const newsResponse = await newsJson.json();
    const newsData = await newsResponse.data;
    console.log("newsData ==>", newsData);
    // Start building the image sitemap XML
    let imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    imageSitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Add images for each news article
    newsData.forEach((news) => {
      news.images.forEach((image) => {
        imageSitemap += `  <url>\n`;
        imageSitemap += `    <loc>${siteUrl}/news/${news._id}</loc>\n`;
        imageSitemap += `    <image:image>\n`;
        imageSitemap += `      <image:loc>${siteUrl}/api/media/${image.src}</image:loc>\n`;
        imageSitemap += `      <image:title>${news.title}</image:title>\n`;
        imageSitemap += `      <image:caption>${
          image.figcaption || news.title
        }</image:caption>\n`;
        imageSitemap += `    </image:image>\n`;
        imageSitemap += `  </url>\n`;
      });
    });

    imageSitemap += `</urlset>`;

    return new NextResponse(imageSitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating image sitemap:", error.message);
    return new NextResponse("Failed to generate image sitemap", {
      status: 500,
    });
  }
}
