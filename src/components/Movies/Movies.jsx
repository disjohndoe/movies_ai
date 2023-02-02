import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { MovieList, Pagination, FeaturedMovie } from '../index';
import { useGetGenreQuery } from '../../services/TMDB';

const Movies = () => {
    const { data } = useGetGenreQuery();
    console.log(data);
    return (
        <div>
            Movies
        </div>
    );
};

export default Movies;