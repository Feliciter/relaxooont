import axios from 'axios'

const YOUTUBE_URL = 'https://youtube.googleapis.com/youtube/v3'

export default axios.create({
  baseURL: `${YOUTUBE_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
})
