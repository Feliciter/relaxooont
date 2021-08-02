import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import getVideosByQuery from '../services/VideoService'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}))

const VideosList = () => {
  const classes = useStyles()
  const [videos, setVideos] = useState([])

  const [searchPhrase, setSearchPhrase] = useState('')

  const onChangeSearchPhrase = (e) => {
    const searchPhrase = e.target.value
    setSearchPhrase(searchPhrase)
  }

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
    <div className=" row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchPhrase}
            onChange={onChangeSearchPhrase}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={retrieveVideos}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <h4> List</h4>
      </div>

      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {videos.map((elem) => (
            <Grid item xs={12} sm={6} md={3} key={videos.indexOf(elem)}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={elem.snippet.thumbnails.high.url}
                    title={elem.snippet.channelTitle}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {elem.snippet.channelTitle}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      {elem.snippet.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default VideosList
