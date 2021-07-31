import http from './web-api/http-common'
const YOUTUBE_APIKEY = process.env.REACT_APP_YAPI

const GetVideosByQuery = (params) => {
  params['key'] = YOUTUBE_APIKEY
  params['part'] = 'snippet'
  params['eventType'] = 'none'
  params['type'] = 'video'
  params['videoDefinition'] = 'high'
  params['videoEmbeddable'] = true
  params['videoLicense'] = 'creativeCommon'
  params['videoSyndicated'] = true

  return http.get(`/search`, { params })
}

export default GetVideosByQuery
