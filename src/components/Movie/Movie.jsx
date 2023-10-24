import React from 'react'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from "./styles"


const Movie = ({movie, i}) => {
    const classes = useStyles();    
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie} container spacing={-2} justify="center">
    <Grow in key={i} timeout={(i + 1) * 300}>
    <Link className="{classes.links}" to={`/movie/${movie.id}`}
    style= {{textDecoration: "none"}}> 
    <img alt={movie.title} 
    className={classes.image} 
    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://placekitten.com/200/300"}
    />
    <Typography className={classes.title} variant="h6">{movie.title}</Typography>
    <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div 
        style={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center"            ,
            }}
            >
        <Rating readOnly value={movie.vote_average / 2} precision={0.1} name="size-small" defaultValue={2} size="small" position="top"/>
        </div>
    </Tooltip>
    </Link>
    </Grow>
    </Grid>
  );
}

export default Movie;