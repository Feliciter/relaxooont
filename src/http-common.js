import axios from "axios";

const YOUTUBE_APIKEY=process.env.REACT_APP_YAPI
const YOUTUBE_URL="https://youtube.googleapis.com/youtube/v3"


export default axios.create({
    baseURL: `${YOUTUBE_URL}/search?&part=snippet&key=${YOUTUBE_APIKEY}`,
    headers: {
    "Content-type": "application/json"
  }
});