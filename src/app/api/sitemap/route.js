import { BACKEND_URL } from "@/shared/constants/ulrList";
import { NextResponse } from "next/server";

export const revalidate = 10

export async function GET(req, { params }) {
  try {
    const siteUrl = "https://somacharnews.com";
    // const response = await fetch(`${BACKEND_URL}/media/${params.path}`);
    const newsJson = await fetch(`${BACKEND_URL}/public/news/sitemap`, {
      cache: "no-store",
    });
    const newsResponse = await newsJson.json();
    const newsData = await newsResponse.data;
    // Base URL for your website

    // Start building the sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    // Add static pages
    const staticPages = ["/", "/about", "/contact"]; // Add your static pages here
    staticPages.forEach((page) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${siteUrl}${page}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Add dynamic news pages
    newsData.forEach((news) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${siteUrl}/news/${news._id}</loc>\n`;
      sitemap += `    <lastmod>${new Date(
        news.updatedAt
      ).toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>0.9</priority>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>`;

    // Set response headers and send the sitemap
    // return new NextResponse(sitemap, {
    //   headers: { "Content-Type": "application/xml" },
    // });

    // Send the sitemap as an XML response
    // return new NextResponse(sitemap, {
    //   headers: {
    //     "Content-Type": "application/xml",
    //     "Cache-Control": "public, max-age=60", // Cache for 1 minute
    //   },
    // });

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=10, stale-while-revalidate=30", // Cache for 1 minute, allow revalidation for 5 minutes
      },
    });

   
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    res.status(500).end("Failed to generate sitemap");
  }
}
