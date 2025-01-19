import { BACKEND_URL } from "@/shared/constants/ulrList";
import { NextResponse } from "next/server";
const linkObj ={}

// Utility function to build XML for a URL
const buildXml = (sitemap, { loc, lastmod, changefreq, priority }) => {
  if (linkObj[loc]) {
    return 
  }
  linkObj[loc] = true

  sitemap += `  <url>\n`;
  sitemap += `    <loc>${loc}</loc>\n`;
  sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
  sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
  sitemap += `    <priority>${priority}</priority>\n`;
  sitemap += `  </url>\n`;
  return sitemap;
};

export const dynamic = "force-dynamic"; // Make the page dynamic in production

export async function GET(req) {
  try {
    
    const siteUrl = "https://somacharnews.com";

    // Fetch news and categories data
    const newsResponse = await fetch(`${BACKEND_URL}/public/news/sitemap`, {
      cache: "no-store",
    });
    const categoriesResponse = await fetch(`${BACKEND_URL}/public/categories`, {
      cache: "no-store",
    });

    const newsData = (await (await newsResponse.json())?.data) || [];
    const categories = (await (await categoriesResponse.json())?.data) || [];
    // Start building the sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static pages
    const staticPages = ["/"]; // Add your static pages here
    staticPages.forEach((page) => {
     const currentSitemap = buildXml(sitemap, {
        loc: `${siteUrl}${page}`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      });
      if (currentSitemap) {
        sitemap = currentSitemap
      }
    });

    // Add category pages
    categories.forEach((category) => {
      const currentSitemap  = buildXml(sitemap, {
        loc: `${siteUrl}/topic/${category.route}`, // Ensure `category.path` is correctly set
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      });
      if (currentSitemap) {
        sitemap = currentSitemap
      }
      if (category?.subCategories?.length > 0) {
        category?.subCategories.forEach((subCategory) => {
          const currentSitemap  =  buildXml(sitemap, {
            loc: `${siteUrl}/topic/${category.route}/${subCategory.route}`, // Ensure `category.path` is correctly set
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority: "0.8",
          });
          if (currentSitemap) {
            sitemap = currentSitemap
          }
        })
      }
    });

    // Add dynamic news pages
    newsData.forEach((news) => {
      const currentSitemap = buildXml(sitemap, {
        loc: `${siteUrl}/news/${news._id}`,
        lastmod: new Date(news.updatedAt).toISOString(),
        changefreq: "daily",
        priority: "0.9",
      });
      if (currentSitemap) {
        sitemap = currentSitemap
      }
    });

    sitemap += `</urlset>`;
    
    // const publicDir = path.join(__dirname, "../../../../../public")
    
    // const isExist  = fs.existsSync(publicDir) 
    // if (isExist) {
    //   const sitemapPath = path.join(publicDir, 'sitemap-test.xml');
    //   fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
    // }
  
    // Return the generated sitemap
    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
