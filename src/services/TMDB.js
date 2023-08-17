import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        //* Get Genres
        GetGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
                    }),
        
        //* Get Movie
        GetMovie: builder.query({
            query: ({ genreIDOrCategoryName, page}) => {

            // Get Movies by Category
            if (genreIDOrCategoryName && typeof genreIDOrCategoryName === 'string') {
                return `movie/${genreIDOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`
            }
            // Get Movies by Genre
            if (genreIDOrCategoryName && typeof genreIDOrCategoryName === 'number') {
                return `discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIDOrCategoryName}&page=${page}`
                
            }
            // Get Popular Movies
            return `movie/popular?api_key=${tmdbApiKey}&page=${page}`
            }

        }),
    }),
})
// https://api.themoviedb.org/3/movie/top-rated?api_key=87adf0b50a35e52bf93e3fe1d793e974&page=1
// 
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
export const { 
    useGetMovieQuery,
    useGetGenresQuery,
 } = tmdbApi;