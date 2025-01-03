import { BACKEND_URL } from "@/shared/constants/ulrList";
import { NextResponse } from "next/server";

// Utility function to build XML for a news article's image
const buildXml = (sitemap, { loc, imageLoc, imageTitle, imageCaption }) => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${loc}</loc>\n`;
  sitemap += `    <image:image>\n`;
  sitemap += `      <image:loc>${imageLoc}</image:loc>\n`;
  sitemap += `      <image:title>${imageTitle}</image:title>\n`;
  sitemap += `      <image:caption>${imageCaption}</image:caption>\n`;
  sitemap += `    </image:image>\n`;
  sitemap += `  </url>\n`;
  return sitemap;
};

export const dynamic = "force-dynamic"; // Make the page dynamic in production

export async function GET(req) {
  try {
    const siteUrl = "https://somacharnews.com";

    const newsJson = await fetch(`${BACKEND_URL}/public/news/sitemap`, {
      cache: "no-store",
    });
    const newsResponse = await newsJson.json();
    const newsData = newsResponse?.data || [];

    // Start building the image sitemap XML
    let imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    imageSitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Add images for each news article
    newsData.forEach((news) => {
      news.images.forEach((image) => {
        imageSitemap = buildXml(imageSitemap, {
          loc: `${siteUrl}/news/${news._id}`,
          imageLoc: `${siteUrl}/api/media/${image.src}`,
          imageTitle: news.title,
          imageCaption: image.figcaption || news.title,
        });
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
