export const revalidate = 60;
import { BACKEND_URL } from "@/shared/constants/ulrList";
// const BACKEND_URL = "https://server.somacharnews.com"
import sharp from "sharp";

export async function GET(req, { params }) {
  const format = req.nextUrl.searchParams.get("format") || "jpg";
  const url = req.nextUrl.searchParams.get("url") || "";

  if (!url || !format) {
    return new Response(
      JSON.stringify({ error: "Required query are messing" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Fetch the image from the backend
    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type");

    // Convert WebP to the requested format using sharp
    const convertedImageBuffer = await sharp(Buffer.from(imageBuffer))
      .toFormat(format)
      .toBuffer();

    // Return the converted image
    return new Response(convertedImageBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
