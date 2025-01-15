import { SITE_CONFIG } from "./siteConfig"

export const BACKEND_URL = process.env.NODE_ENV === "production" ? "https://server.somacharnews.com" : "http://localhost:8001"
// export const BACKEND_URL = "http://localhost:8001"
// export const BACKEND_URL = "https://server.somacharnews.com"

export const YOUTUBE_CHANNEL_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${SITE_CONFIG?.ytChannel?.youtubeChannelID}&key=AIzaSyCnjHwqOkXQo1gNW-VR9uTdR4soiC9IAnc`



 