import http from './web-api/http-common'
const YOUTUBE_APIKEY = process.env.REACT_APP_YAPI

const GetVideosByQuery = (params) => {
  params['key'] = YOUTUBE_APIKEY
  return http.get(`/search`, { params })
}

export default GetVideosByQuery
