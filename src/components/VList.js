import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import  findVByQuery from "../services/VideoService";

import Pagination from "@material-ui/lab/Pagination";
import VideoService from "../services/VideoService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },

    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));


const VList = () => {
    const classes = useStyles();
    const [videos, setVideos] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);

    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [maxResults, setmaxResults] = useState(3);

    const maxResultss = [3, 6, 9];

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (searchTitle) => {
        let params = {};

        if (searchTitle) {
        params["title"] = searchTitle;
        }

        return params;
    };

    const retrieveVideos = () => {
        const params = getRequestParams(maxResults);

        console.log(params)
        VideoService.findVByQuery(params)
            .then((response) => {
                const { items, pageInfo } = response.data;
                console.log(response.data);
                setVideos(items);
            })
            .catch((e) => {
                console.log(e);
            });


    };

    useEffect(retrieveVideos, [page, maxResults]);



    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setmaxResults(event.target.value);
        setPage(1);

        console.log('hNDL',maxResults)
    };



    return  (


        <div className=" row">

            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={retrieveVideos}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h4> List</h4>

                {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={maxResults}>
                    {maxResultss.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>

                <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </div>

            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
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
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {elem.snippet.channelTitle}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
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

            <div className="col-md-6">
                {currentPost ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>
                            {currentPost.id}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentPost.title}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentPost.published ? "Published" : "Pending"}
                        </div>

                        {/*<Link*/}
                        {/* to={"/tutorials/" + currentTutorial.id}*/}
                        {/* className="badge badge-warning"*/}
                        {/*>*/}
                        {/* Edit*/}
                        {/*</Link>*/}
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Posts...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VList;