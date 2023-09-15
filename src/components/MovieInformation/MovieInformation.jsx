import React from "react";
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMoviePageQuery } from "../../services/TMDB";
import genreIcons from '../../assets/genres'

import useStyles from "./styles"
import Movie from "../Movie/Movie";

const MovieInformation = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useGetMoviePageQuery(id)
    const classes = useStyles();

    if(isFetching) {
        return (
        <Box display="flex" justifyContent="center">
            <CircularProgress size="8rem" />
        </Box>
        );
    }

    if(error) {
        return (
        <Box display="flex" justifyContent="center">
            <Link to="/">Something went wrong, go back.</Link>
        </Box>
        );
    }    
    return (        
        <Grid container className={classes.containerSpaceAround}>
            <Grid item sm={12} lg={4} align="center">
                <img
                className= {classes.poster}
                src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                alt={data && data.title ? data.title + " poster" : ""}
                >
                </img>
            </Grid>
            <Grid item container direction="column" lg={7}>
                <Typography variant="h4" align="center" gutterBottom>
                {data?.title} ({(data.release_date.split('-')[0])})
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                {data?.tagline}
                </Typography>
            <Grid item className={classes.containerSpaceAround}>
                <Box display='flex' align='center'>
                    <Rating readOnly value={data.vote_average / 2}  precision={0.1} name="size-small" defaultValue={2} size="small" position="top"/>
                    <Typography variant="subtitle1" gutterBottom style={{marginLeft: '10px'}}>
                    {data?.vote_average.toFixed(1)} / 10
                    </Typography>
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                    {data?.runtime}min / {data?.spoken_languages.length > 0 ? `${data?.spoken_languages[0].name}` : '' }
                </Typography>
            </Grid>
            <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link className={classes.links} key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}         
            </Grid>
            </Grid>
        </Grid>        
    );
};

export default MovieInformation;