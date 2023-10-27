import React, { useState } from "react";
import {
  Typography,
  Button,  
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

import useStyles from './styles'

import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MovieList } from '..'

import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from "../../services/TMDB"

const Actors = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const page = 1;

    const { data, error, isFetching } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesByActorIdQuery(id, page);
    if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems={'center'}>
        <Button startIcon={ <ArrowBackIcon/> } onClick={() => history.goBack()} color="primary">Go Back</Button>
      </Box>
    );
  }
    
    return (
        <>
        <Grid container spacing={3}>
            <Grid item lg={5} xl={4}>
            <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
            />
            </Grid>
            <Grid item lg={7} xl={8} style={ { display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant="h3" gutterBottom>
                   {data?.name} 
                </Typography>
                <Typography variant="h5" gutterBottom>
                   Born: {new Date(data?.birthday).toDateString()} 
                </Typography>
                <Typography variant="body1" align="justify" paragraph>
                   {data?.biography || 'Sorry no Biography found...'}
                </Typography>
                <Box marginTop='2rem' display='flex' justifyContent='space-around'>
                    <Button variant='contained' color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
                    <Button startIcon={<ArrowBackIcon/>} onClick={() => history.goBack()} color="primary">Go Back</Button>
                </Box>                
            </Grid>
            <Box margin='2rem 0'>
            <Typography variant="h3" gutterBottom align="center">
            More Movies From {data?.name}
            </Typography>
            {movies && <MovieList movies={movies} numberOfMovies={12} />}
            </Box>
        </Grid>

        </>
    );
};
export default Actors;
