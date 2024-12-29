export const revalidate = 60
import { BACKEND_URL } from "@/shared/constants/ulrList";
//  const BACKEND_URL = "https://server.somacharnews.com"
export async function GET(req, { params }) {
  try { 
    const response = await fetch(`${BACKEND_URL}/media/${params.path}`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}