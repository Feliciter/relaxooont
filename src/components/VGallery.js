import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import getVideosByQuery from '../services/VideoService'

const searchPhrase = 'relax'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function VGallery() {
  const classes = useStyles()
  const [videos, setVideos] = useState([])

  const [searchPhrase, setSearchPhrase] = useState('')

  // const onChangeSearchPhrase = (e) => {
  //   const searchPhrase = e.target.value
  //   setSearchPhrase(searchPhrase)
  // }

  const getRequestParams = (searchPhrase) => {
    const params = {}

    if (searchPhrase) {
      params['title'] = searchPhrase
    }
    return params
  }

  const retrieveVideos = () => {
    console.log(searchPhrase)

    const params = {
      q: searchPhrase,
    }

    console.log(params)

    getVideosByQuery(params)
      .then((response) => {
        const { items } = response.data
        console.log(response.data)
        setVideos(items)
      })
      .catch((e) => {
        console.log(e)
      })

    // console.log(videos)
  }

  useEffect(retrieveVideos, [])

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {videos.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.snippet.thumbnails.high.url} alt={item.snippet.channelTitle} />

            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${item.snippet.channelTitle}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
