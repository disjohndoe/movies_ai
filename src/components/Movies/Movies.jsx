import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Pagination, FeaturedMovie, MovieList } from '../index';
import { useGetMovieQuery } from '../../services/TMDB';

const Movies = () => {
    const { data, error, isFetching } = useGetMovieQuery();
    
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        ); 
    }

    if (!data.results.length) {
        return(
        <Box display="flex" allignItems="center" mt="20px">
            <Typography variant="h4">
            No movies that match that name.
            <br />
            Please make another search.
            </Typography>
        </Box>
        );
    }
        if (error) return "Error has happened!"

            return (
                <div>
                    <MovieList movies = {data} />
                </div>
            );
};

export default Movies;